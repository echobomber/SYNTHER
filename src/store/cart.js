export default {
  namespaced: true,
  state: {
    cartPanelOpen: false
  },
  mutations: {
    openCart (state) {
      state.cartPanelOpen = !state.cartPanelOpen
    }
  },
  actions: {
    openCartPanel (context) {
      context.commit('openCart')
    }
  },
  getters: {
    cartPanelOpen: state => state.cartPanelOpen
  }
}
