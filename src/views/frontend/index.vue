<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide index-carousel container mb-5" data-bs-ride="carousel">
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
    <!---->
    <div class="container">
      <h3 class="standout-title h1">Music Genre</h3>
      <!-- Swiper -->
      <swiper
          :slides-per-view="3"
          :space-between="30"
          :slides-per-group="3"
          loop
          navigation
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :scrollbar="{ draggable: true }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="https://i.kfs.io/album/global/114108801,0v1/fit/500x500.jpg" alt=""></swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
    }
  },
  methods: {
    onSwiper (swiper) {
      console.log(swiper)
    },
    onSlideChange () {
      console.log('slide change')
    }
  },
  created () {
  }
}
</script>
