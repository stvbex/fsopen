import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filterString.toLowerCase())
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()

    
    const personFound = persons.find(person => person.name === newName)

    // Construct new person object
    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    if (personFound && personFound.number === newNumber) {
      // If person already in phonebook display a warning
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (personFound) {
      // If person already in phonebook but with diffrent number
      // confirm modification
      const confirmedModify = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmedModify) {
        personService
          .updatePerson(personFound.id, newPersonObject)
          .then(newPerson => {
            // Update persons
            const oldPersons = persons.filter(person => person.id !== personFound.id)
            setPersons(oldPersons.concat(newPerson))

            // Reset name, number
            setNewName('')
            setNewNumber('')

            // Notify
            setNotificationColor('green')
            setNotificationMessage(`Updated ${newPerson.name}'s number`)

            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }

    }
    else {
      // Post person to database
      personService
        .createPerson(newPersonObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))

          // Reset name, number
          setNewName('')
          setNewNumber('')

          // Notify
          setNotificationColor('green')
          setNotificationMessage(`Added ${newPerson.name}`)

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const handleDeletePerson = (personId) => {
    const person = persons.find(person => person.id === personId)

    // Show confirmation window
    const confirmed = window.confirm(`Delete ${person.name}?`)

    // If confirmed delete person
    if (confirmed) {
      personService
        .deletePerson(personId)
        .catch(error => {

          // Notify
          const person = persons.find(person => person.id === personId)
          setNotificationColor('red')
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

      // Remove person from persons
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} color={notificationColor} />
      <Filter 
        handleFilterInputChange={handleFilterInputChange}
        filterString={filterString} />
      <h3>add a new</h3>
      <PersonForm 
        handleNewPerson={handleNewPerson} 
        handleNameInputChange={handleNameInputChange}
        newName={newName}
        handleNumberInputChange={handleNumberInputChange}
        newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow} 
        handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App;
