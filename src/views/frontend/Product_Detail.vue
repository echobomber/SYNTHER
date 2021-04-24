<template>
  <div class="container">
  <loading :active="isLoading"></loading>
  </div>
</template>
<script>
import mixins from '@/mixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'product',
  components: {
  },
  mixins: [mixins],
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('productModules', ['getProductAll'])
  },
  watch: {
  },
  computed: {
    ...mapGetters('productModules', ['produtInfo']),
    ...mapGetters(['isLoading'])
  },
  created () {
    this.getProductAll()
  }
}
</script>
