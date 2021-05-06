<template>
  <nav aria-label="pagination">
    <ul class="shared-pagination py-4 mb-0">
      <li>
        <a href="#" class="material-icons" v-if="pagination.has_pre" @click.prevent="changePage(pagination.current_page - 1)">arrow_back_ios_new</a>

      </li>
      <li v-for="page in pagination.total_pages" :key="page">
        <a href="#" :class="{ 'active': page === pagination.current_page }" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li>
        <a href="#" class="material-icons" v-if="pagination.has_next" @click.prevent="changePage(pagination.current_page + 1)">arrow_forward_ios</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'admin_product_pagination',
  data () {
    return {
      pagination: {}
    }
  },
  watch: {
    produtInfo_Page () {
      this.pagination = this.produtInfo_Page.pagination
    }
  },
  methods: {
    changePage (page) {
      this.getProductPage({ page: page })
    },
    ...mapActions('productsModule', ['getProductPage'])
  },
  computed: {
    ...mapGetters('productsModule', ['produtInfo_Page'])
  }
}
</script>
