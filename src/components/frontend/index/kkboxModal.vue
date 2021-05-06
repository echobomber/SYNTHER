<template>
  <!-- Modal -->
  <div class="modal fade" ref="modal" id="kkboxModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

import { mapGetters } from 'vuex'
export default {
  name: 'newHit_MusicPanal',
  data () {
    return {
      kkboxModal: ''
    }
  },
  methods: {
    openPanel () {
      this.kkboxModal.show()
    }
  },
  computed: {
    ...mapGetters('kkboxModule', ['AJAXConfig'])
  },
  mounted () {
    this.kkboxModal = new bootstrap.Modal(document.getElementById('kkboxModal'))
  }
}
</script>
