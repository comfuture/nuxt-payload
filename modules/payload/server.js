const accepts = require('accepts')

const negotiator = (req, res, nuxt) => {
  res.status = code => {
    res.statusCode = code
    return res
  }

  res.json = val => {
    if (!res.getHeader('content-type')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
    }
    res.end(JSON.stringify(val), 'utf8')
  }

  let resolver = new Promise(resolve => {
    res.payload = function payload(data) {
      res.payload = data
      resolve(data)
    }
  })
  let timeout = new Promise((_, reject) => setTimeout(reject, 2000))
  Promise.race([
    timeout,
    resolver
  ]).then(data => {
    if (accepts(req).type(['html', 'json']) === 'json') {
      res.setHeader('Surrogate-Control', 'no-store')
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.json(data)
    } else {
      // continue to nuxt
      nuxt()
    }
  }).catch(error => {
    res.json({})
  })
  // continue to next middleware stack
  nuxt()
}

module.exports = negotiator