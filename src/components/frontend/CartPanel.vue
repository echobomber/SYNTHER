<template>
  <div>
    <div class="cartBackDrop" v-if="cartPanelOpen" @click.prevent="toggleCartPanel()"></div>
    <div class="cartPanel" :class="{ 'open' : cartPanelOpen }">
      <div class="d-flex justify-content-between align-items-center px-3 py-2">
        <h4 class="mb-0" v-if="cartInfo.carts">購物車 ({{cartInfo.carts.length}})</h4>
        <a href="#" @click.prevent="toggleCartPanel()" class="p-2 material-icons h1">close</a>
      </div>
      <p class="h5 text-center pt-4 fw-bold" v-if="!cartInfo.carts">購物車內沒有商品</p>
      <ul class="list-unstyled mb-0 p-4" v-if="cartInfo.carts">
        <li class="d-flex justify-content-between align-items-center pb-4" v-for="cart in cartInfo.carts" :key="cart.product_id">
          <div class="d-flex align-items-center">
            <img class="cartPanel__img" :src="cart.product.image" alt="">
            <div class="ms-3">
              <h5 class="fw-bold">{{ cart.product.title }}</h5>
              <p>x{{ cart.qty }} ${{ cart.product.price }}</p>
            </div>
          </div>
          <a href="#" class="material-icons p-2" @click.prevent="removeCart(cart.id)">delete</a>
        </li>
      </ul>
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
    ...mapGetters('cartModules', ['cartPanelOpen', 'cartInfo'])
  },
  methods: {
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    ...mapActions('cartModules', ['toggleCartPanel', 'getCart'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
