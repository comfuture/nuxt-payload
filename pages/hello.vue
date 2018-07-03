<template>
  <div>Hello, {{name}}!</div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  asyncData ({res, route}) {
    if (process.server) {
      console.log(res.locals)
      return {
        ...res.locals.payload
      }
    } else {
      return axios.get(route.fullPath).then(({data}) => data)
    }
  }
}
</script>
