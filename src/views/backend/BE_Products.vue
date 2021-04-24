<template>
  <div class="container">
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary text-center mb-3" data-bs-target="#editModel" @click.prevent="openProductModel(isNew = true)">
        建立新的產品
      </button>
    </div>
    <!-- Fujii Kaze 歌 -->
    <!-- 編輯 Modal -->
    <div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="productModal" aria-hidden="true" v-if="tempProduct.options">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalTitle"></h5>
            <button type="button" class="btn-close btn-close-white" aria-label="Close" @click.prevent="closeProductModal()"></button>
          </div>
          <div class="modal-body">
            <form class="row">
              <div class="col-6">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="imgUrl" placeholder="請輸入圖片網址" v-model="tempProduct.imageUrl">
                  <label for="imgUrl">請輸入圖片網址</label>
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-md-6">
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
                      <input type="number" min="0" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                      <label for="origin_price">請輸入原價</label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-floating">
                      <input type="number" min="0" class="form-control" id="productPrice" placeholder="請輸入售價" v-model="tempProduct.price">
                      <label for="productPrice">請輸入售價</label>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <div class="form-floating">
                      <input type="number" min="0" max="10" class="form-control" id="rating" placeholder="請輸入評級" v-model="tempProduct.options.rating">
                      <label for="rating">請輸入評級</label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-floating">
                      <input type="date" min="0" class="form-control" id="onSaleDate" placeholder="請輸入上架日期" v-model="tempProduct.options.onSaleDate">
                      <label for="onSaleDate">請輸入上架日期</label>
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
                  <input class="form-check-input" type="checkbox" value="" id="is_enabled" checked v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="closeProductModal()">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="editProduct()">確定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除 Modal -->
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>
                是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click.prevent="closeDelModel()">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="delProduct()">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- table -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="120">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="120">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="120">評價</th>
          <th scope="col" width="120">上架日期</th>
          <th scope="col" width="120">是否啟用</th>
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.category }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.options.rating }}</td>
          <td>{{ product.options.onSaleDate }}</td>
          <td>
            <p class="text-success fw-bold" v-if="product.is_enabled">啟用</p>
            <p class="fw-bold" v-else>未啟用</p>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-target="#editModel" @click.prevent="openProductModel(isNew = false, product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="openDelModel(product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
/* global bootstrap */
export default {
  name: 'BE_Products',
  components: {
  },
  data () {
    return {
      productModal: '',
      delProductModal: '',
      isNew: true,
      tempProduct: {
        options: {
          rating: '',
          onSaleDate: ''
        }
      },
      products: [
        {
          id: new Date().getTime(),
          title: 'Switch',
          category: '掌上主機',
          origin_price: 20000,
          price: 9980,
          unit: '台',
          description: 'Sit down please 名設計師設計',
          content: '這是內容',
          is_enabled: 1,
          imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          options: {
            rating: 9.8,
            onSaleDate: new Date().toISOString().split('T')[0]
          }
        }
      ]
    }
  },
  mounted () {
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false
    })
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false
    })
  },
  methods: {
    openProductModel (isNew, product) {
      this.productModal.show()
      this.isNew = isNew
      if (!isNew) {
        document.querySelector('#productModalTitle').textContent = '產品編輯'
        this.tempProduct = { ...product }
      } else {
        document.querySelector('#productModalTitle').textContent = '產品新增'
        // 回歸預設狀態
        this.$data.tempProduct = this.$options.data().tempProduct
      }
    },
    closeProductModal () {
      this.productModal.hide()
    },
    openDelModel (product) {
      this.delProductModal.show()
      this.tempProduct = { ...product }
    },
    closeDelModel () {
      this.delProductModal.hide()
    },
    delProduct () {
      this.products.forEach((product, i) => {
        if (product.id === this.tempProduct.id) {
          this.products.splice(i, 1)
          this.$data.tempProduct = this.$options.data().tempProduct
        }
        this.delProductModal.hide()
      })
    },
    editProduct () {
      if (this.isNew) {
        this.products.push({ ...this.tempProduct })
        this.$data.tempProduct = this.$options.data().tempProduct
      } else {
        this.products.forEach((product, i) => {
          if (product.id === this.tempProduct.id) {
            this.products[i] = { ...this.tempProduct }
            this.$data.tempProduct = this.$options.data().tempProduct
          }
        })
      }
      this.productModal.hide()
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
</style>
