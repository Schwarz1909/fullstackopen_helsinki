import { useState, useEffect } from 'react'
import { Filter, Inputfield, Button, PersonForm, Person } from './components/Phonebook'
import Notification from './components/Notifications'
import ErrorNotification from './components/ErrorNotifications'
import phonebookService from './services/phonebook'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    // console.log(event)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    // console.log(event)
    // console.log(newName)
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id: String(persons.length + 1)
    }
    if (persons.some((e) => e.name === newName)) {
      //console.log(persons)
      //alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const p = persons.find((e) => e.name === newName)
        console.log(p.id)
        phonebookService
          .update(p.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id != p.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`The number of ${personObject.name} has been changed`)
            setTimeout(() => {setMessage('')}, 5000)
          })
          .catch(error => {
            setErrorMessage(`${personObject.name} was already removed from server`)
            setTimeout(() => {setErrorMessage('')}, 5000)
          })
      } 
    } else {
      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${personObject.name} is added`)
          setTimeout(() => {setMessage('')}, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(error.response.data.error)
        })
      //console.log(persons)
    }
    
    //console.log(persons)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
  }
 
  const personsFilter = persons.filter((person) => {
    // console.log(search.toLowerCase())
    return search === ''
      ? person
      : person.name.toLowerCase().includes(search.toLowerCase());
  }) 

  const handleDelete = (id, name) => {
    // console.log(name)
    // console.log(id)
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
          setMessage(`${name} has been deleted`)
          setTimeout(() => {setMessage('')}, 5000)
        })
        .catch(error => {
          setErrorMessage(`${name} was already removed from server`)
          setTimeout(() => {setErrorMessage('')}, 5000)
        })
    }   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter text='filter shown with:' onChangeFilter={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsFilter.map((person, index) => <Person key={person.id} 
                                                    person={person} 
                                                    text='delete' 
                                                    onClick={() => handleDelete(person.id, person.name)}/>)}
   </div>
  )
}

export default App