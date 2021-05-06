import axios from 'axios'

export default {
  namespaced: true,
  state: {
    produtInfo_All: {},
    productInfo_Page: {}
  },
  mutations: {
    PRODUCTINFO_ALL (state, payload) {
      state.produtInfo_All = payload
    },
    PRODUCTINFO_PAGE (state, payload) {
      state.productInfo_Page = payload
    }
  },
  actions: {
    getProductAll (context) {
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(url)
        .then(res => {
          context.commit('PRODUCTINFO_ALL', res.data.products)
          context.commit('LOADING', false, { root: true })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProductPage (context, payload) {
      const page = payload.page
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      axios.get(url)
        .then(res => {
          context.commit('PRODUCTINFO_PAGE', res.data)
          context.commit('LOADING', false, { root: true })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    produtInfo_All: state => state.produtInfo_All,
    produtInfo_Page: state => state.productInfo_Page
  }
}
