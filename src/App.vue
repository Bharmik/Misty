<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    const indexList = []
    this.$router.options.routes.forEach(item => {
      if (item.path !== '/' && item.path !== '/*') {
        indexList.push(item)
      }
    })
    this.$store.dispatch('GET_INDEXLIST', indexList)
  }
}
</script>

<style>

</style>
