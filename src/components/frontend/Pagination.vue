<template>
  <div>
    <nav aria-label="pagination">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true" disabled>Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
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
