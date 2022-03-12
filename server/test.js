import Router from 'router'
const test = new Router()

test.get('/', (req, res, next) => {
  res.payload({text: 'this is test!'})
})

export default test
