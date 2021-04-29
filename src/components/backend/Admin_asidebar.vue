<template>
  <div class="admin-asidebar p-4" :class="{ 'open': isOpen }">
    <h1><a href="#" class="admin-asidebar__logo">SYNTHER</a></h1>
    <ul class="list-unstyled mt-5">
      <li><router-link to="/admin/products">編輯商品</router-link></li>
    </ul>
  </div>
</template>

<script>
import bus from '@/bus.js'
export default {
  name: 'Admin_asidebar',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {

  },
  created () {
    bus.on('toggleAsidebar', () => {
      this.isOpen = !this.isOpen
    })
  }
}
</script>
