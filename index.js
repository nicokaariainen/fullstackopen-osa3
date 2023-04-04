const express = require('express')
const app = express()
const cors = require('cors')

var morgan = require('morgan')
morgan.token('body', function (req, res) { return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

var persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

const generateId = () => {
    const id = Math.floor(Math.random() * 10000000)
    return id
}

app.get('/', (req, res) => {
    res.send('Toimii!')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body
    const id = generateId()

    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({ 
          error: 'Person missing name or number' 
        })
      }
    
    if (persons.find(person => person.name.toLowerCase() === newPerson.name.trim().toLowerCase())) {
        return res.status(400).json({
            error: 'Person already exists'
        })
    }

    persons = persons.concat({
        name: newPerson.name.trim(),
        number: newPerson.number.trim(),
        id: id
    })

    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`Phonebook has info for ${persons.length} people <br> ${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})