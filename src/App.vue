<template>
  <router-view />
</template>
<style lang="scss">
@import "./assets/scss/all.scss";
</style>
<script>
export default {
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  }
}
</script>
