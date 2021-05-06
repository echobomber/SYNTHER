<template>
  <div class="frontPage-content">
    <!-- banner -->
    <section class="container-lg mb-5 p-0">
      <swiper :pagination="true" @swiper="onSwiper">
        <swiper-slide>
          <div class="index-carousel index-carousel__1st">
            <div class="l-index-carousel__content">
              <div class="index-carousel__content">
                <p>現在購買享 30% 優惠</p>
                <router-link to="/product" class="index-carousel__title">Buy new album</router-link>
                <a href="#" class="index-carousel__btn btn btn-dark" @click.prevent="">取得優惠碼</a>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="index-carousel index-carousel__2nd">
            <div class="index-carousel__content">
              <p>暢銷排行榜</p>
              <router-link to="/" class="index-carousel__title">華語最佳專輯</router-link>
              <div class="d-flex">
                <a href="#" class="d-none d-sm-block">
                  <img src="@/assets/img/google-play-img.png" class="me-4" alt="">
                </a>
                <a href="#" class="d-block">
                  <img src="@/assets/img/app-store-img.png" alt="">
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <!-- 最新排行 -->
    <NewHits v-if="kkboxToken"></NewHits>
  </div>
</template>

<script>
import $ from 'jquery'
// Swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
//
import NewHits from '@/components/frontend/index/NewHits.vue'
import { mapActions, mapGetters } from 'vuex'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide,
    NewHits
  },
  data () {
    return {
    }
  },
  methods: {
    onSwiper (swiper) {
      setTimeout(() => {
        $('.index-carousel__1st .index-carousel__content')
          .addClass('active')
      }, 500)
    },
    ...mapActions('kkboxModule', ['getKKBOXToken'])
  },
  computed: {
    ...mapGetters('kkboxModule', ['kkboxToken'])
  },
  created () {
    this.getKKBOXToken()
  }
}
</script>
