const Router = require('router')
const test = new Router()

test.get('/', (req, res, next) => {
  res.payload({text: 'this is test!'})
})

module.exports = test