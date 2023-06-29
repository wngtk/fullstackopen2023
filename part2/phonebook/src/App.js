import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({filterText, handleChangeFilter}) => {
  return <div>filter shown with <input type="text" value={filterText} onChange={handleChangeFilter}/></div>
}

const PersonForm = ({newName, newNum, handleChange, handleChangeNum, handleAdd}) => {
  return <form onSubmit={handleAdd}>
    <div>
      name: <input type="text" value={newName} onChange={handleChange} />
    </div>
    <div>
      number: <input type="text" value={newNum} onChange={handleChangeNum}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Person = ({person, handleDelete}) => {
  console.log(handleDelete)
  return (<p>{ person.name } { person.number } <button onClick={() => handleDelete(person.id)}>delete</button></p>)
}

const Persons = ({persons, filterText, handleDelete}) => {
  return <>{ persons.filter(person => person.name.includes(filterText)).map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />) }</>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personService.getAll()
      .then((res) => {
        setPersons(res.data)
      })
  }, [])

  const handleAdd = (event) => {
    event.preventDefault()

    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNum}])
    personService.create({ name: newName, number: newNum})
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNum = (event) => {
    setNewNum(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilterText(event.target.value)
  }

  const handleDelete = (id) => {
    personService.remove(id).then(() => {
      setPersons(persons.filter((val) => val.id !== id))
    }).catch(()=>{})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleChangeFilter={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNum={newNum} handleChangeNum={handleChangeNum} handleChange={handleChange} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={persons} filterText={filterText}/>
    </div>
  )
}

export default App
