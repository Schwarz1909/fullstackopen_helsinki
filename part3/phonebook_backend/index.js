const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (request) => JSON.stringify(request.body))

app.use((request, response, next) => {
    if (request.method !== 'POST') {
      morgan('tiny')(request, response, next);
    } else {
      next();
    }
  });

app.use((request, response, next) => {
    if (request.method === 'POST') {
      morgan(':method :url :status :res[content-length] - :response-time ms :body')(request, response, next);
    } else {
      next();
    }
  });



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    person = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    let person = request.body
    
    if (!person.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (!person.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.findIndex(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    console.log(person)


    const id = Math.floor(Math.random() * (1000 - 1) + 1)
    person = {"id": id, ...person}

    console.log(person)
    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    const phonebook_length = persons.length
    const current_date = new Date()
    response.send(`
        <p>Phonebook has info for ${phonebook_length} people</p>
        <p>${current_date}</p>
        `)
})

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})