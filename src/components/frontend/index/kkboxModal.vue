<template>
  <!-- Modal -->
  <div class="modal fade" ref="modal" id="kkboxModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <iframe class="iframe iframe-hideborder" :src="`https://widget.kkbox.com/v1/?id=${musicSrc.id}&type=${musicSrc.type}&terr=TW}&autoplay=${musicSrc.autoplay}`" frameBorder="0" allow="autoplay"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global bootstrap */
/* global $ */
import { mapGetters } from 'vuex'
export default {
  name: 'newHit_MusicPanal',
  data () {
    return {
      kkboxModal: '',
      musicSrc: {}
    }
  },
  methods: {
    openModal (musicObject) {
      this.musicSrc = musicObject
      this.kkboxModal.show()
    }
  },
  computed: {
    ...mapGetters('kkboxModule', ['AJAXConfig'])
  },
  mounted () {
    this.kkboxModal = new bootstrap.Modal(document.getElementById('kkboxModal'))
    // Hide Stop Music
    $('#kkboxModal').on('hidden.bs.modal', function (event) {
      this.musicSrc = {
        id: 'DZrC8m29ciOFY2JAm3',
        type: 'album',
        autoplay: false
      }
    })
  }
}
</script>
<style scoped lang="scss">
.iframe {
  width: 100%;
  height: 500px;
}
.modal-body {
  padding: 0px;
}
.iframe-hideborder {
  margin-bottom: -6px;
}
</style>
