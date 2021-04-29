<template>
  <div>
    <a href="#" class="material-icons admin-asidebarToggle p-2" @click.prevent="toggleAsidebar()" :class="{'isRotate' : isOpen}">menu_open</a>
  </div>
</template>

<script>
import bus from '@/bus.js'
export default {
  name: 'Admin_navbar',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleAsidebar () {
      this.isOpen = !this.isOpen
      bus.emit('toggleAsidebar')
      bus.emit('expandContent')
    }
  },
  created () {
  }
}
</script>
