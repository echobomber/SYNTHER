<template>
  <loading :active="isLoading"></loading>
  <div class="position-relative">
    <Navbar />
    <router-view class="frontPage-content" />
    <AsideNavbar />
    <CartPanel />
    <Login class="text-center"/>
  </div>
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue'
import Login from '@/components/frontend/Login.vue'
import AsideNavbar from '@/components/frontend/Aside_Navbar.vue'
import CartPanel from '@/components/frontend/CartPanel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    Navbar,
    AsideNavbar,
    CartPanel,
    Login
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('cartModules', ['cartPanelOpen']),
    ...mapGetters(['isLoading'])
  },
  created () {
  }
}
</script>
