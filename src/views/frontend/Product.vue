<template>
  <div class="container-lg px-0">
    <loading :active="isLoading"></loading>
    <div class="product-banner mb-5">
      <h2 class="product-banner__title ms-md-5 ms-2"><span class="material-icons me-3">play_circle_filled</span>Product sale</h2>
      <div class="product-banner__cover"></div>
    </div>
    <div class="product-search p-4 row mb-5">
      <h5 class="ms-3 mb-3">請輸入專輯名稱關鍵字</h5>
      <div class="col-sm-6 position-relative mb-3">
        <a href="#" class="product-search__btn material-icons p-2" @click.prevent="filterTitle">search</a>
        <input type="text" class="product-search__bar" placeholder="搜尋專輯" v-model="keywords" @keyup.enter="filterTitle">
      </div>
      <ul class="product-category list-unstyled">
        <li class="me-2">
          <a href="#" class="product-category__pill" @click.prevent="filterCategory">House</a>
        </li>
        <li class="me-2">
          <a href="#" class="product-category__pill" @click.prevent="filterCategory">K-POP</a>
        </li>
        <li class="me-2">
          <a href="#" class="product-category__pill" @click.prevent="filterCategory">J-POP</a>
        </li>
      </ul>
    </div>
    <!---->
    <div class="d-flex justify-content-between">
      <ul class="list-unstyled d-flex">
        <li class="me-2">
          <p>{{ categoryName }}</p>
        </li>
        <li>
          <p>共 {{ productShowList.length }} 筆</p>
        </li>
      </ul>
      <ul class="d-flex justify-content-center list-unstyled  mb-3">
        <li>
          <a href="#" class="material-icons p-2" title="塊狀排序">view_module</a>
        </li>
        <li>
          <a href="#" class="material-icons p-2" title="清單排序">view_list</a>
        </li>
      </ul>
    </div>
    <!---->
    <ul class="row list-unstyled" v-if="produtInfo_All" data-aos="fade-up">
      <li class="col-md-3 col-sm-6" v-for="product in productShowList" :key="product">
        <div class="product-card">
          <div class="position-relative">
            <img class="img-fluid" :src="product.image" alt="">
            <div class="product-card__cover" v-if="product.is_enabled">
              <ul class="product-card__iconList m-2">
                <li class="me-2">
                  <a href="#" class="material-icons p-2">favorite_border</a>
                </li>
                <li>
                  <a href="#" class="material-icons p-2" @click.prevent="addtoCart(product.id)">shopping_cart</a>
                </li>
              </ul>
            </div>
            <div class="product-card__soldOut" v-else>
              <h4 class="h1">SOLD OUT</h4>
            </div>
          </div>
          <div class="p-3">
            <h3><a href="#">{{ product.title }}</a></h3>
            <p class="text-truncate mb-2">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <del>{{ currencyTrans(product.origin_price) }}</del>
              <p class="h4">{{ currencyTrans(product.price) }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import mixins from '@/mixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'product',
  components: {
  },
  mixins: [mixins],
  data () {
    return {
      keywords: '',
      categoryName: '',
      productShowList: []
    }
  },
  methods: {
    filterTitle () {
      const productShow = this.produtInfo_All.filter(item => {
        const keyword = this.keywords.trim().toLowerCase()
        const title = item.title.trim().toLowerCase()
        return title.match(keyword)
      })
      this.productShowList = productShow
    },
    filterCategory (e) {
      let target = e.target.textContent
      target = target.trim().toLowerCase()
      if (target === '全部') {
        this.categoryName = ''
        this.productShowList = this.produtInfo_All
        return 0
      } else {
        this.categoryName = target
        const productShow = this.produtInfo_All.filter(item => {
          if (item.category) {
            const category = item.category.trim().toLowerCase()
            return category.match(target)
          }
        })
        this.productShowList = productShow
      }
    },
    addtoCart (id, qty = 1) {
      this.$store.dispatch('cartsModule/addtoCart', { id, qty })
    },
    ...mapActions('productsModule', ['getProductAll'])
  },
  watch: {
    produtInfo_All (n, o) {
      // console.log('n', n)
      // console.log('o', o)
      this.productShowList = n
    }
  },
  computed: {
    ...mapGetters('productsModule', ['produtInfo_All']),
    ...mapGetters(['isLoading'])
  },
  created () {
    this.getProductAll()
    AOS.init()
  }
}
</script>
