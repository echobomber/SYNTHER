<template>
  <h3>熱門歌單</h3>
  <div class="row">
    <div class="col-3" v-for="item in newHit.data" :key="item.id">
          <img :src="item.images[0].url" alt="" @click.prevent="playView(item)">
    </div>
  </div>
  <h3 class="my-4">歌單 list</h3>
  <ul class="list-unstyled row">
    <li class="col-2" v-for="item in musicList.data" :key="item.id">
      <img :src="item.album.artist.images[0].url" alt="" @click.prevent="getYtVideo(item.name)">
      <p>{{ item.name }}</p>
    </li>
  </ul>
  <h3>影片</h3>
  <iframe :src="`https://www.youtube.com/embed/${musicID}?autoplay=1`" frameborder="0" allow="autoplay"></iframe>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'newHits',
  data () {
    return {
      newHit: '',
      musicList: '',
      YTData: [],
      musicID: ''
    }
  },
  methods: {
    getNewHitPlaylist () {
      const newHitUrl = `${process.env.VUE_APP_KKBOXURL}/new-hits-playlists?territory=TW`

      this.$http.get(newHitUrl, this.AJAXConfig)
        .then((res) => {
          this.newHit = res.data
          // console.log(this.newHit)
        })
    },
    playView (item) {
      this.$store.commit('kkboxModule/READYMUSIC', item)
      console.log(this.readyMusic)
      this.getMusiclist()
    },
    getMusiclist () {
      let url = `${process.env.VUE_APP_KKBOXURL}/new-hits-playlists/${this.readyMusic.id}/tracks?territory=TW&limit=20`
      if (!this.readyMusic.type === 'hex') {
        url = `${process.env.VUE_APP_KKBOXURL}/shared-playlists/${this.readyMusic.id}/tracks?territory=TW&limit=20`
      }

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
    ...mapGetters('kkboxModule', ['AJAXConfig']),
    ...mapGetters('kkboxModule', ['readyMusic'])
  },
  created () {
    this.getNewHitPlaylist()
  }
}
</script>
