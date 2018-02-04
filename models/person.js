const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds223578.mlab.com:23578/fullstack-db'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
