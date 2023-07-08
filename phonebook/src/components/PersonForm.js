import { useState } from 'react'

const PersonForm = ({ addPerson }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: name,
      number: number
    }
    addPerson(personObject)
  }

  return (
    <form onSubmit={handleAddPerson} className="form">
      <div>
        <label htmlFor="name">name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="number">number:</label>
        <input
          id="number"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
