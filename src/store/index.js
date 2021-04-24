import { createStore } from 'vuex'
import cartModules from './cart'
import productModules from './product'

export default createStore({
  state: {
    isLoading: false
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    }
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    cartModules,
    productModules
  }
})
