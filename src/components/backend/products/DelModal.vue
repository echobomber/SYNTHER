<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" @click.prevent="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" @click.prevent="closeModal()">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct()">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
/* global bootstrap */
export default {
  name: 'DelModal',
  data () {
    return {
      delModal: '',
      tempProduct: {}
    }
  },
  methods: {
    openDelModal (product) {
      this.delModal.show()
      this.tempProduct = product
    },
    delProduct () {
      const id = this.tempProduct.id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
      axios.delete(url)
        .then((res) => {
          this.getProductPage({ page: this.produtInfo_Page.pagination.current_page })
        })
        .catch((err) => {
          console.log(err)
        })
      this.$data.tempProduct = this.$options.data().tempProduct
      this.closeModal()
    },
    closeModal () {
      this.delModal.hide()
    },
    ...mapActions('productsModule', ['getProductPage'])
  },
  computed: {
    ...mapGetters('productsModule', ['produtInfo_Page'])
  },
  mounted () {
    this.delModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    })
  }
}
</script>
