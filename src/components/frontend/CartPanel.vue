<template>
  <div>
    <div class="CartPanel" ref="CartPanel" :class="{ 'open' : cartPanelOpen }">
      <a href="#" @click="openCartPanel()"><span class="material-icons">close</span></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartPanel',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('cartModules', ['cartPanelOpen'])
  },
  methods: {
    ...mapActions('cartModules', ['openCartPanel'])
  },
  mounted () {

  }
}
</script>
