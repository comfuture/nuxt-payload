const { Router } = require('express')

const users = new Router()

users.get('/', (req, res, next) => {
  res.payload([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}])
})

users.get('/:name', (req, res, next) => {
  let name = req.params.name
  res.payload({name})
})

module.exports = users