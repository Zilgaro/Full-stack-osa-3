const mongoose = require('mongoose')
const Schema = mongoose.Schema

const url = 'mongodb://fullstack:sekred@ds223578.mlab.com:23578/fullstack-db'

mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new Schema ({
  name: String,
  number: String,
})

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)


module.exports = Person
