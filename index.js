const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

morgan.token('JSON', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :JSON :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  Person
    .find({})

    .then(persons => {
      response.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
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

  /*
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name already in use'})
  }
  */

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => {
      response.json(Person.format(savedPerson))
    })
    .catch(error => {
      console.log(error)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
    Person
    .findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
