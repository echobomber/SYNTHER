<template>
  <div class="l-admin-navbar">
    <div class="admin-navbar">
      <a href="#" class="material-icons admin-asidebarToggle p-2" @click.prevent="toggleAsidebar()" :class="{'isCLose' : isCLose}">menu_open</a>
      <h1 class="mb-0"><a href="#" class="admin-navbar__logo">SYNTHER</a></h1>
      <a href="#" class="admin-navbar__menuToggle material-icons" @click.prevent="">menu</a>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Admin_navbar',
  data () {
    return {
      isCLose: false
    }
  },
  methods: {
    toggleAsidebar () {
      this.isCLose = !this.isCLose
      this.$emit('toggle-asidebar')
    }
  },
  created () {
  }
}
</script>
