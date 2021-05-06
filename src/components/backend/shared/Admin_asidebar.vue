<template>
  <div class="admin-asidebar" :class="{ 'close': isclose }">
    <div>
      <h1><a href="#" class="admin-asidebar__logo my-3">SYNTHER</a></h1>
      <ul class="list-unstyled admin-asidebar__list">
        <li>
          <router-link class="admin-asidebar__link" :class="{'active' : activePath === 'overview'}" @click.prevent="activePath = 'overview'" to="/admin/products">
            <span class="material-icons me-3">auto_graph</span>
            <span class="admin-asidebar__linkTxt">概觀</span>
          </router-link>
        </li>
        <li>
          <router-link class="admin-asidebar__link" :class="{'active' : activePath === 'product'}" @click.prevent="activePath = 'product'" to="/admin/products">
            <span class="material-icons me-3">edit</span>
            <span class="admin-asidebar__linkTxt">編輯商品</span>
          </router-link>
        </li>
        <li>
            <router-link class="admin-asidebar__link" :class="{'active' : activePath === 'order'}" @click.prevent="activePath = 'order'" to="/admin/products">
              <span class="material-icons me-3">fact_check</span>
              <span class="admin-asidebar__linkTxt">查看訂單</span>
            </router-link>
        </li>
        <li>
            <router-link class="admin-asidebar__link" :class="{'active' : activePath === 'coupon'}" @click.prevent="activePath = 'coupon'" to="/admin/products">
              <span class="material-icons me-3">local_offer</span>
              <span class="admin-asidebar__linkTxt">編輯優惠券</span>
            </router-link>
        </li>
      </ul>
    </div>
    <!---->
    <div>
      <a href="#" class="admin-asidebar__link mb-4" @click.prevent="logout">
        <span class="material-icons me-3">logout</span>
        <span>登出</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin_asidebar',
  data () {
    return {
      isclose: false,
      activePath: 'overview'
    }
  },
  methods: {
    toggleAsidebar () {
      this.isclose = !this.isclose
    },
    logout () {
      this.$store.dispatch('updateLoading', true)
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(url).then((response) => {
        console.log(response.data)
        this.$store.dispatch('updateLoading', false)
        this.$router.push('/')
      })
    }
  },
  created () {
  }
}
</script>
