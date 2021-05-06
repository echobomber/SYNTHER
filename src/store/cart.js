import axios from 'axios'

export default {
  namespaced: true,
  state: {
    panelOpen: false,
    cartInfo: {}
  },
  mutations: {
    TOGGLECART (state) {
      state.panelOpen = !state.panelOpen
    },
    CARTINFO (state, payload) {
      state.cartInfo = payload
    }
  },
  actions: {
    toggleCartPanel (context) {
      context.commit('TOGGLECART')
    },
    getCart (context) {
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(url)
        .then((res) => {
          if (res.data.data.carts) {
            context.commit('CARTINFO', res.data.data)
          }
          context.commit('LOADING', false, { root: true })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, { root: true })
      axios.delete(url)
        .then((response) => {
          context.commit('LOADING', false, { root: true })
          context.dispatch('getCart')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addtoCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      const item = {
        product_id: id,
        qty
      }
      axios.post(url, { data: item })
        .then((res) => {
          context.commit('LOADING', false, { root: true })
          context.dispatch('getCart')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    cartPanelOpen: state => state.panelOpen,
    cartInfo: state => state.cartInfo
  }
}
