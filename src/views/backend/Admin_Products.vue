<template>
  <loading :active="isLoading"></loading>
  <div class="admin-panel--main">
    <div class="admin-banner my-4">
      <div class="admin-banner__content px-5">
        <h2 class="admin-banner__title">
          Product
        </h2>
      </div>
    </div>
    <div class="px-3 px-sm-4">
      <!-- Button trigger modal -->
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary mb-3 rounded-0" @click.prevent="openEditModal(true)">新增產品</button>
      </div>
      <div class="l-admin-product__table">
        <table class="table admin-product__table">
          <thead>
            <tr>
              <th scope="col" width="100">分類</th>
              <th scope="col">產品名稱</th>
              <th scope="col" width="100">原價</th>
              <th scope="col" width="100">售價</th>
              <th scope="col" width="120">是否啟用</th>
              <th scope="col" width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="product in produtInfo_Page.products" :key="product.id">
              <tr v-if="produtInfo_Page.products[0]">
                <th scope="row">{{ product.category }}</th>
                <td>{{ product.title }}</td>
                <td>{{ product.origin_price }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <p class="text-success fw-bold" v-if="product.is_enabled">啟用</p>
                  <p class="fw-bold" v-else>未啟用</p>
                </td>
                <td>
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-target="#editModal" @click.prevent="openEditModal(false, product)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="openDelModal(product)">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <!-- pagination -->
    <Pagination></Pagination>
    <!-- 編輯 Modal -->
    <EditModal ref="EditModal"></EditModal>
    <!-- 刪除 Modal -->
    <DelModal ref="DelModal"></DelModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditModal from '@/components/backend/products/EditModal.vue'
import DelModal from '@/components/backend/products/DelModal.vue'
import Pagination from '@/components/backend/products/Pagination.vue'

export default {
  name: 'BE_Products',
  components: {
    EditModal,
    DelModal,
    Pagination
  },
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
  },
  methods: {
    openEditModal (isNew, product = {}) {
      this.$refs.EditModal.openEditModal(isNew, product)
    },
    openDelModal (product) {
      this.$refs.DelModal.openDelModal(product)
    },
    ...mapActions('productsModule', ['getProductPage'])
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productsModule', ['produtInfo_Page'])
  },
  created () {
    this.getProductPage({ page: 1 })
  }
}
</script>

<style scoped lang="scss">
</style>
