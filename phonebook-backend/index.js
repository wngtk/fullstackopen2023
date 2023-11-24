require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const process = require("process")
const Person = require("./models/person")
const app = express()

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body)
    ].join(" ")
  })
)


app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

const nextId = () => {
  return Math.floor(Math.random() * 1e20)
}

app.post("/api/persons", (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "mssing name or number",
    })
  }

  const person = new Person({
    id: nextId(),
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get("/info", (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
