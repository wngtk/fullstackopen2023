import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phonebookService from './services/persons'
import { useEffect, useState } from 'react'

const Notification = ({ message }) => {
  return <div className="prompt">{message}</div>
}

const CriticalMessageBox = ({ message}) => {
  return <div className='error'>{ message }</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [text, setText] = useState('')
  const [addMsg, setAddMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    phonebookService.getAll().then((data) => setPersons(data))
  }, [])

  const addPerson = (newPerson) => {
    const exists = persons.find(
      (cur_person) => cur_person.name === newPerson.name
    )
    let result = null
    if (!exists) {
      setPersons([...persons, newPerson])
      result = phonebookService.create(newPerson)
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        let newPersonId
        const newPersons = persons.slice().map((val) => {
          if (val.name === newPerson.name) {
            newPersonId = val.id
            return newPerson
          } else {
            return val
          }
        })
        phonebookService.update(newPersonId, newPerson).then(() => {
          setPersons(newPersons)
        }).catch(() => {
          setErrorMsg('Information of ' + newPerson.name + ' has already been removed from server')
          setTimeout(() => {
            setErrorMsg('')
          }, 2000);
        })
      }
    }

    if (result) {
      result.then(() => {
        setAddMsg('Added ' + newPerson.name)
        setTimeout(() => {
          setAddMsg('')
        }, 2000)
      })
    }
  }

  const updateFilterText = (text) => {
    setText(text)
  }

  const containText = (val) => {
    return val.name && val.name.toLowerCase().includes(text.toLowerCase())
  }

  const removePerson = (target) => {
    if (window.confirm('Delete ' + target.name)) {
      setPersons(persons.filter((p) => p.id != target.id))
      phonebookService.remove(target.id)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {addMsg && <Notification message={addMsg} />}
      <Filter updateFilterText={updateFilterText} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h1>Numbers</h1>
      <Persons data={persons} predictFn={containText} onDelete={removePerson} />
    </div>
  )
}

export default App
