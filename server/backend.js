const Router = require('router')
const backend = new Router()

backend.get('/user', (req, res, next) => {
  res.payload({
    users: [
      {id: 1, name: 'maroo'},
      {id: 2, name: 'paindo'},
      {id: 3, name: 'hayeon'},
      {id: 4, name: 'gyuhyun'},
      {id: 5, name: 'dohyun'}
    ]
  })
})

backend.get('/user/:id', (req, res, next) => {
  try {
    let id = Number(req.params.id)
    let name = ',maroo,paindo,hayeon,gyuhyun,dohyun'.split(',').splice(id, 1)[0]
    res.payload({id, name})
  } catch(e) { }
})

// mount sub route
backend.use('/test', require('./test'))

module.exports = backend