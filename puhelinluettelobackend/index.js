const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

morgan.token('JSON', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :JSON :status :res[content-length] - :response-time ms'))


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Matti Luukkainen",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

const generateId = () => {
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
  }
  return getRandomInt(Math.pow(2,16))
}

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.sendStatus(404);
  }
})

app.get('/info', (req, res) => {
  res.send(`<div>puhelinluettelossa ${persons.length} henkilön tiedot</div> <br>
            ${Date()}</br>`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name already in use'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
