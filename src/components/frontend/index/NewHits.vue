<template>
  <section class="container-lg">
    <h3 class="standout-title">New Hits</h3>
    <div class="row mb-5">
      <div class="col-md-6">
        <div class="newHits-Region">
          <ul class="list-unstyled m-0 p-0">
            <li class="newHits-Region__banner">
              <img v-if="newHit_region.images" :src="newHit_region.images[2].url">
              <div class="newHits-Region__bannerTitle">
                <p>{{ regionTitle }}</p>
              </div>
            </li>
          </ul>
          <div class="newHits-Region__btn">
            <a href="#"
              class="material-icons"
              @click.prevent="changeRegion(regionCount - 1)"
            >arrow_back_ios_new</a>
            <a href="#"
              class="material-icons"
              @click.prevent="changeRegion(regionCount + 1)"
            >arrow_forward_ios</a>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <ul class="l-newHits-playList list-unstyled m-0">
          <li
            class="newHits-playList"
            v-for="(item, index) in musicList.data" :key="item.id"
          >
            <div class="d-flex align-items-center">
              <img class="newHits-playList__img" :src="item.album.artist.images[0].url" :alt="item.name">
              <a href="#" class="newHits-playList__title" :title="item.album.artist.name" @click.prevent="playMusic(item)">{{ index + 1 }}. {{ item.name }}</a>
            </div>
            <div class="newHits-playList__btn me-sm-2">
              <a href="#" class="material-icons" @click.prevent="playMusic(item)">queue_music</a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <!-- KKBOX 面板 -->
  <kkboxModal ref="kkboxModal" :music-src="musicObject"></kkboxModal>
</template>

<script>
import kkboxModal from '@/components/frontend/index/kkboxModal.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'newHit',
  components: {
    kkboxModal
  },
  data () {
    return {
      newHit: {},
      newHit_region: {},
      regionCount: 0,
      musicList: {},
      YTData: [],
      musicID: '',
      musicObject: {
        id: 'DZrC8m29ciOFY2JAm3',
        type: 'album',
        autoplay: true
      }
    }
  },
  methods: {
    playMusic (item) {
      this.musicObject = item.album
      this.musicObject.type = 'album'
      this.musicObject.autoplay = false
      this.$refs.kkboxModal.openModal(this.musicObject)
    },
    getNewHitData () {
      const newHitUrl = `${process.env.VUE_APP_KKBOXURL}/new-hits-playlists?territory=TW`

      this.$http.get(newHitUrl, this.AJAXConfig)
        .then((res) => {
          this.newHit = res.data
          this.newHit_region = { ...this.newHit.data[this.regionCount] }
          this.getMusiclist()
        })
    },
    changeRegion (count) {
      const vm = this
      if (count > 3) {
        vm.regionCount = 0
      } else if (count < 0) {
        vm.regionCount = 3
      } else {
        vm.regionCount = count
      }
      vm.newHit_region = { ...vm.newHit.data[vm.regionCount] }
      vm.getMusiclist()
    },
    getMusiclist () {
      const url = `${process.env.VUE_APP_KKBOXURL}/new-hits-playlists/${this.newHit_region.id}/tracks?territory=TW&limit=10`
      this.$http.get(url, this.AJAXConfig)
        .then((res) => {
          this.musicList = res.data
        })
    },
    getYtVideo (name) {
      console.log(name)
      const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.VUE_APP_GOOGLEAPIKEY}&part=snippet&type=video&q=${name}`
      this.$http.get(url).then((res) => {
        console.log(res)
        const cacheYT = res.data.items[0].snippet
        this.YTData = cacheYT
        this.musicID = res.data.items[0].id.videoId
      })
    }
  },
  computed: {
    regionTitle () {
      let title = ''
      if (this.newHit_region.title) {
        title = this.newHit_region.title
        title = title.split('(')[0].trim()
      }
      return title
    },
    ...mapGetters('kkboxModule', ['AJAXConfig'])
  },
  created () {
    this.getNewHitData()
  }
}
</script>
