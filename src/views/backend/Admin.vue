<template>
  <div>
    後台
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  }
}
</script>

<style scoped lang="scss">
</style>
