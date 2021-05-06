<template>
  <div>
    <asidebar ref="asidebar"></asidebar>
    <div class="admin-content pb-lg-3" :class="{ 'close' : isClose}" ref="admin-content">
      <navbar @toggle-asidebar="toggleAsidebar"></navbar>
      <router-view />
    </div>
  </div>
</template>

<script>
import asidebar from '@/components/backend/shared/Admin_asidebar.vue'
import navbar from '@/components/backend/shared/Admin_navbar.vue'

export default {
  name: 'Admin',
  components: {
    navbar,
    asidebar
  },
  data () {
    return {
      isClose: false
    }
  },
  methods: {
    toggleAsidebar () {
      this.isClose = !this.isClose
      this.$refs.asidebar.toggleAsidebar()
    }
  },
  created () {
  }
}
</script>
<style scoped lang="scss">
</style>
