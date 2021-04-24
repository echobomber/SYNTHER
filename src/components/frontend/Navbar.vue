<template>
  <nav class="commonNavbar" ref="commonNavbar">
    <div class="commonNavbar-top container" ref="commonNavbar-top">
      <h1 class="lh-1"><router-link to="/" class="commonNavbar-top__logo">SYNTHER</router-link></h1>
      <a href="#" class="commonNavbar-top__menuToggle material-icons p-2" @click.prevent="openMenu = true">menu</a>
    </div>
    <div class="commonNavbar-bottom container py-sm-2">
      <ul class="commonNavbar-bottom__routerList ps-0 mb-0">
        <li><router-link to="/product">線上聆聽</router-link></li>
        <li><router-link to="/product">購買專輯</router-link></li>
        <li><router-link to="/product">聯絡我們</router-link></li>
      </ul>
      <ul class="commonNavbar-bottom__iconNav mb-0">
        <li class="me-2">
          <a href="#" class="material-icons" @click.prevent="openLoginModel()">person</a>
        </li>
        <li class="position-relative me-2">
          <a href="#" class="material-icons" @click.prevent="toggleCartPanel()">shopping_cart</a>
          <div class="commonNavbar-bottom__cartNum" v-if="cartInfo.carts">{{ cartInfo.carts.length }}</div>
        </li>
        <li class="me-2">
          <a href="#" class="material-icons">search</a>
        </li>
      </ul>
    </div>
    <!-- -->
    <div class="commonNavbar-phoneMenu" :class="{ 'isOpen' : openMenu }">
      <a href="#" class="commonNavbar-phoneMenu__closeBtn material-icons p-2" @click.prevent="openMenu = false">close</a>
      <ul class="commonNavbar-phoneMenu__routerList ps-0 mb-1">
        <li><router-link to="/product">線上聆聽</router-link></li>
        <li><router-link to="/product">購買專輯</router-link></li>
        <li><router-link to="/product">聯絡我們</router-link></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {},
  data () {
    return {
      openMenu: false
    }
  },
  methods: {
    openLoginModel () {
      this.$bus.$emit('openLoginModel')
    },
    ...mapActions('cartModules', ['toggleCartPanel'])
  },
  computed: {
    ...mapGetters('cartModules', ['cartInfo'])
  },
  mounted () {
    let prevScrollpos = window.pageYOffset
    const commonNavbar = this.$refs.commonNavbar
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        commonNavbar.style.top = '0'
      } else {
        commonNavbar.style.top = '-60px'
      }
      prevScrollpos = currentScrollPos
    }
  }
}
</script>
