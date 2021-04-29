<template>
  <div>
    <asidebar></asidebar>
    <div class="admin-content p-4" :class="{ 'open' : isExpanded}">
      <div class="container">
        <navbar></navbar>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus.js'
import asidebar from '@/components/backend/Admin_asidebar.vue'
import navbar from '@/components/backend/Admin_navbar.vue'

export default {
  name: 'Admin',
  components: {
    navbar,
    asidebar
  },
  data () {
    return {
      isExpanded: false
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    //
    bus.on('expandContent', () => {
      this.isExpanded = !this.isExpanded
    })
  }
}
</script>
<style scoped lang="scss">
</style>
