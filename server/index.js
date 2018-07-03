const express = require('express')()

const negotiator = (req, res, nuxt) => {
  let resolver = new Promise((resolve, reject) => {
    res.payload = function payload(obj) {
      res.locals.payload = obj
      resolve(obj)
    }
  })
  let timeout = new Promise(resolve => setTimeout(() => resolve({}), 1000))
  Promise.race([
    timeout,
    resolver
  ]).then(payload => {
    if (req.accepts(['html', 'json']) === 'json') {
      res.json(payload).end()
    } else {
      nuxt()
    }
  })
  nuxt()
}

express.use(negotiator)

// simple url handler middleware
express.use('/hello', (req, res, next) => {
  res.payload({name: 'comfuture'})
})

express.use('/users', require('./users'))

module.exports = express

