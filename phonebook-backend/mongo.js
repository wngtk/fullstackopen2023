const mongoose = require("mongoose")
const process = require("process")

if (process.argv.length != 3 && process.argv.length != 5) {
  process.exit(1)
}

const password = process.argv[2]

const URL = `mongodb+srv://fnmainrs:${password}@phonebook.3n6hl4o.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length == 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(res => {
    console.log(`added ${res.name} ${res.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log("phonebook:")
  Person.find({}).then(res => {
    res.forEach((person => {
      console.log(`${person.name} ${person.number}`)
    }))
    mongoose.connection.close()
  })
}
