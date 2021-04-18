<template>
  <nav class="index-navbar" ref="indexNavbar">
    <div class="topBar container" ref="topBar">
      <h1 class="mb-0"><a href="#" class="index-logo">SYNTHER</a></h1>
      <!--
        <a href="#"><span class="material-icons">menu</span></a>
      -->
    </div>
    <div class="bottomBar container">
      <ul class="bottomBar-routerLink list-unstyled mb-1">
        <li><a href="#">線上聆聽</a></li>
        <li><a href="#">購買專輯</a></li>
        <li><a href="#">聯絡我們</a></li>
      </ul>
      <ul class="bottomBar-iconNav list-unstyled mb-0">
        <li><a href="#" class="bottomBar-iconNav-link" @click.prevent="openLoginModel()"><span class="material-icons">person</span></a></li>
        <li><a href="#" class="bottomBar-iconNav-link" @click.prevent="openCartPanel()"><span class="material-icons">shopping_cart</span></a></li>
        <li><a href="#" class="bottomBar-iconNav-link"><span class="material-icons">search</span></a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'vuex'

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
    ...mapActions('cartModules', ['openCartPanel'])
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
