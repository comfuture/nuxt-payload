# nuxt-payload

> Yet another approach to simplyfying backend data delivery

## Simple example
- in server middleware
```javascript
const Router = require('router')

const USERS = [
  {id: 1, name: 'foo'},
  {id: 2, name: 'bar'},
  {id: 3, name: 'baz'}
]

const api = new Router()

api.get('/', (req, res, next) => {
  req.payload({users: USERS})
})

api.get('/:id', (req, res, nuxt) => {
  let match = USERS.filter(user => user.id === req.params.id)
  if (match.length === 1) {
    req.payload(match[0])
  } else {
    nuxt(new Error("No such user"))
  }
})
```

- in page component
```vue
<template>
  <div><nuxt-link :to="{name: 'user-profile', params: {id: user.id}}">Hello, {{user.name}}</nuxt-link></div>
</template>
<script>
export default {
  asyncData({app}) {
    return app.$payload()
  }
}
</script>
```

Realize an isomorphic backend with a single line of code! A route function for npm’s connect module which points to the same endpoint as the nuxt route is all that is needed. In SSR, the payload is simply passed via a response object without any http overhead. In CSR, $payload method will automatically send an http request to the same url as the route in order to get the payload. The payload module then creates an endpoint which responds to the json version of the payload with an Accept header of `application/json`.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```
