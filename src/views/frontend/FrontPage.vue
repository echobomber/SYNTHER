<template>
  <loading :active="isLoading"></loading>
  <div class="position-relative">
    <Navbar @open-login="openLoginModal"></Navbar>
    <router-view />
    <Footer />
    <AsideNavbar />
    <CartPanel />
    <Login class="text-center" ref="loginModal"/>
  </div>
</template>
<script>
import Navbar from '@/components/frontend/shared/Navbar.vue'
import Login from '@/components/frontend/shared/Login.vue'
import AsideNavbar from '@/components/frontend/shared/Aside_Navbar.vue'
import CartPanel from '@/components/frontend/shared/CartPanel.vue'
import Footer from '@/components/frontend/shared/Footer.vue'
//
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    Navbar,
    AsideNavbar,
    CartPanel,
    Login,
    Footer
  },
  data () {
    return {
    }
  },
  methods: {
    openLoginModal () {
      this.$refs.loginModal.openModal()
    }
  },
  computed: {
    ...mapGetters('cartModules', ['cartPanelOpen']),
    ...mapGetters(['isLoading'])
  },
  created () {
  }
}
</script>
