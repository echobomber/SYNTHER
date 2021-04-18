<template>
  <div class="position-relative">

    <Navbar />
    <AsideNavbar />
    <div id="carouselExampleControls" class="carousel slide index-carousel container" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/banner.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/banner.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/banner.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <CartPanel />
    <Login class="text-center"/>
  </div>
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue'
import Login from '@/components/frontend/Login.vue'
import AsideNavbar from '@/components/frontend/Aside_Navbar.vue'
import CartPanel from '@/components/frontend/CartPanel.vue'

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
  },
  created () {
  }
}
</script>
