<template>
  <nav class="commonNavbar" ref="commonNavbar">
    <div class="commonNavbar-top container" ref="commonNavbar-top">
      <h1 class="mb-0"><router-link to="/" class="commonNavbar-top__logo">SYNTHER</router-link></h1>
      <a href="#" class="commonNavbar-top__menuToggle material-icons p-2" @click.prevent="openMenu = true">menu</a>
    </div>
    <div class="commonNavbar-bottom container">
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
      <!-- 避免設定成 position: fixed 後被覆蓋掉，所以放後面 -->
      <div class="l-commonNavbar-bottom__routerList" :class="{ 'isOpen' : openMenu }">
        <a href="#" class="commonNavbar__closeBtn material-icons p-2" v-if="openMenu" @click.prevent="openMenu = false">close</a>
        <ul class="commonNavbar-bottom__routerList ps-0 mb-0">
          <li><router-link to="/product" @click.prevent="openMenu = false">線上聆聽</router-link></li>
          <li><router-link to="/product" @click.prevent="openMenu = false">購買專輯</router-link></li>
          <li><router-link to="/product" @click.prevent="openMenu = false">聯絡我們</router-link></li>
        </ul>
      </div>
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
      this.$emit('open-login')
    },
    ...mapActions('cartsModule', ['toggleCartPanel'])
  },
  computed: {
    ...mapGetters('cartsModule', ['cartInfo'])
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
