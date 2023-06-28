import { useState } from 'react'

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

const Persons = ({persons, filterText}) => {
  return <>{ persons.filter(person => person.name.includes(filterText)).map(person => <p key={person.name}>{ person.name } { person.number }</p>) }</>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()

    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNum}])
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleChangeFilter={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNum={newNum} handleChangeNum={handleChangeNum} handleChange={handleChange} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText}/>
    </div>
  )
}

export default App
