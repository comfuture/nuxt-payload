<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <nuxt-link :to="{name: 'user-id', params: {id: user.id}}">{{user.name}}</nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'user-index',
  asyncData ({app, route}) {
    return app.$payload(route.fullPath)
  }
}
</script>
