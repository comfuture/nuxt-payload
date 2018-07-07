<template>
  <div>{{id}}. {{name}}</div>
</template>
<script>
export default {
  name: 'user-id',
  asyncData ({app}) {
    return app.$payload()
  }
}
</script>
