<template>
  <div>{{id}}. {{name}}</div>
</template>
<script>
export default {
  name: 'user-id',
  asyncData ({app, route}) {
    return app.$payload(route.fullPath)
  }
}
</script>
