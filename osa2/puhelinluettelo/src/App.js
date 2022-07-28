import { useEffect, useState } from 'react'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import personService from './services/persons'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      Filter names by <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  const { newName, 
    newNumber, 
    addPerson, 
    handleNameChange, 
    handleNumberChange 
  } = props

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, newFilter, removePerson }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <Person key={person.name} person={person} removePerson={removePerson} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const updatePerson = (id, changedPerson) => {
    personService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Changed number of ${returnedPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
    .catch(error => {
      setPersons(persons.filter(person => person.id !== changedPerson.id))
      setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const addPerson = (event) => {
    event.preventDefault()

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {

        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = { ...persons[i], number: newNumber}
          
          updatePerson(persons[i].id, changedPerson)
          return
        } else {
          return
        }
      }
    }
    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(element => element.id !== person.id))
          setSuccessMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App
