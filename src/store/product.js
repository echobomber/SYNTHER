import axios from 'axios'

export default {
  namespaced: true,
  state: {
    produtInfo: {}
  },
  mutations: {
    PRODUCTINFO (state, payload) {
      state.produtInfo = payload
    }
  },
  actions: {
    getProductAll (context) {
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(url)
        .then(res => {
          console.log('取得商品列表', res)
          context.commit('PRODUCTINFO', res.data.products)
          context.commit('LOADING', false, { root: true })
        })
    }
  },
  getters: {
    produtInfo: state => state.produtInfo
  }
}
