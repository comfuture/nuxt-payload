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

The only thing to do is to create a route function for connect that points to the same endpoint as the nuxt route.
In SSR, the payload is simply passed via res object without any http overhead.
In CSR, $payload method will automatically try to get payload by sending an http request to the same url as the route. The payload module automatically creates an endpoint that responds to the json version of the payload for the Accept request for `application/json`.

This allows you to easily and quickly merge isomorphic backend code without the need for unnecessary server / client script branching by simply writing a single backend code.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```
