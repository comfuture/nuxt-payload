<template>
  <div>{{text}}</div>
</template>
<script>
export default {
  asyncData ({app}) {
    return app.$payload()
  }
}
</script>
