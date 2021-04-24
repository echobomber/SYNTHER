<template>
  <nav class="commonNavbar" ref="indexNavbar">
    <div class="commonNavbar-top container" ref="commonNavbar-top">
      <h1 class="mb-0"><router-link to="/" class="commonNavbar-top__logo">SYNTHER</router-link></h1>
      <!--
        <a href="#" class="material-icons">menu</a>
      -->
    </div>
    <div class="commonNavbar-bottom container">
      <ul class="commonNavbar-bottom__routerList ps-0 mb-1">
        <li><router-link to="/product">線上聆聽</router-link></li>
        <li><router-link to="/product">購買專輯</router-link></li>
        <li><router-link to="/product">聯絡我們</router-link></li>
      </ul>
      <ul class="commonNavbar-bottom__iconNav mb-0">
        <li class="me-3">
          <a href="#" class="material-icons p-2" @click.prevent="openLoginModel()">person</a>
        </li>
        <li class="position-relative me-3">
          <a href="#" class="material-icons p-2" @click.prevent="toggleCartPanel()">shopping_cart</a>
          <div class="commonNavbar-bottom__cartNum" v-if="cartInfo.carts">{{ cartInfo.carts.length }}</div>
        </li>
        <li class="me-3">
          <a href="#" class="material-icons p-2">search</a>
        </li>
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
      text: 'mitt'
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
    const indexNavbar = this.$refs.indexNavbar
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        indexNavbar.style.top = '0'
      } else {
        indexNavbar.style.top = '-50px'
      }
      prevScrollpos = currentScrollPos
    }
  }
}
</script>
