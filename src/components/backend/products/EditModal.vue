<template>
  <div class="modal fade rounded-0" tabindex="-1" aria-labelledby="productModal" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-xl rounded-0">
      <div class="modal-content rounded-0">
        <div class="modal-header bg-dark text-white rounded-0">
          <h5 class="modal-title">{{  isNew ? '產品新增' : '產品編輯' }}</h5>
          <button type="button" class="btn-close btn-close-white" aria-label="Close" @click.prevent="closeModal()"></button>
        </div>
        <div class="modal-body">
          <form class="row">
            <div class="col-lg-6">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片網址" v-model="tempProduct.image">
                <label for="image">請輸入圖片網址</label>
              </div>
              <img class="editPanel-img img-fluid mb-3" :src="tempProduct.image" :alt="tempProduct.title">
            </div>
            <div class="col-lg-6">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="productTitle" placeholder="請輸入標題" v-model="tempProduct.title">
                <label for="productTitle">請輸入標題</label>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="productCategory" placeholder="請輸入分類" v-model="tempProduct.category">
                    <label for="productCategory">請輸入分類</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="productUnit" placeholder="請輸入單位" v-model="tempProduct.unit">
                    <label for="productUnit">請輸入單位</label>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <div class="form-floating">
                    <input type="number" min="0" class="form-control" id="origin_price" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                    <label for="origin_price">請輸入原價</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input type="number" min="0" class="form-control" id="productPrice" placeholder="請輸入售價" v-model.number="tempProduct.price">
                    <label for="productPrice">請輸入售價</label>
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description">
                <label for="description">請輸入產品描述</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="content" placeholder="請輸入說明內容" v-model="tempProduct.content">
                <label for="content">請輸入說明內容</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" @click.prevent="closeModal()">取消</button>
          <button type="button" class="btn btn-primary" @click.prevent="editProduct()">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
/* global bootstrap */

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Admin-product-editModal',
  data () {
    return {
      editModal: '',
      isNew: false,
      tempProduct: {}
    }
  },
  methods: {
    openEditModal (isNew, product) {
      this.isNew = isNew
      if (isNew) {
        // 回歸預設狀態
        this.$data.tempProduct = this.$options.data().tempProduct
      } else {
        this.tempProduct = { ...product }
      }
      this.editModal.show()
    },
    closeModal () {
      this.editModal.hide()
    },
    editProduct () {
      const data = { data: { ...this.tempProduct } }
      let httpMethod = ''
      let url = ''
      if (this.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
        httpMethod = 'post'
      } else {
        const id = this.tempProduct.id
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
        httpMethod = 'put'
      }
      axios[httpMethod](url, data)
        .then((res) => {
          console.log(res)
          this.getProductPage({ page: this.produtInfo_Page.pagination.current_page })
        })
        .catch((err) => {
          console.log(err)
        })
      this.$data.tempProduct = this.$options.data().tempProduct
      this.closeModal()
    },
    ...mapActions('productsModule', ['getProductPage'])
  },
  computed: {
    ...mapGetters('productsModule', ['produtInfo_Page'])
  },
  mounted () {
    this.editModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    })
  }
}
</script>
