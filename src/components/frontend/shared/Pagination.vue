<template>
  <div>
    <nav aria-label="pagination">
      <ul class="shared-pagination py-4 mb-0">
        <li>
          <a href="#" class="material-icons" >arrow_back_ios_new</a>
        </li>
        <li>
          <a href="#" @click.prevent="changePage(page)">1</a>
        </li>
        <li>
          <a href="#" class="material-icons">arrow_forward_ios</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  components: {},
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('cartModules', ['toggleCartPanel'])
  },
  computed: {
    ...mapGetters('cartModules', ['cartInfo'])
  },
  mounted () {
  }
}
</script>
