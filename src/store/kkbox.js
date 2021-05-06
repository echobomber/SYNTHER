import qs from 'querystring'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    isLoading: null,
    kkboxToken: '',
    AJAXConfig: null
  },
  mutations: {
    KKBOXTOKN (state, payload) {
      state.kkboxToken = payload
    },
    AJAXCONFIG (state, payload) {
      state.AJAXConfig = payload
    }
  },
  actions: {
    getKKBOXToken (context) {
      let oauthUrl = `https://cors-anywhere.herokuapp.com/${process.env.VUE_APP_KKBOXAUTH}`
      // 在本機上不做這個設定會被 forbidden (因為跨域設置)
      if (process.env.NODE_ENV === 'development') {
        oauthUrl = '/token'
      }
      // 設定 Host 會顯示不安全設定? 不懂為何要設定 Accpet
      const config = {
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
          // Host: 'account.kkbox.com'
        }
      }
      const oauth = {
        grant_type: process.env.VUE_APP_GRANTTYPE,
        client_id: process.env.VUE_APP_KKBOXID,
        client_secret: process.env.VUE_APP_KKBOXSECRET
      }
      axios.post(oauthUrl, qs.stringify(oauth), config)
        .then(res => {
          context.commit('KKBOXTOKN', res.data)
          const AJAXConfig = {
            headers: {
              Authorization: `${res.data.token_type} ${res.data.access_token}`
            }
          }
          context.commit('AJAXCONFIG', AJAXConfig)
        })
    }
  },
  getters: {
    kkboxToken: state => state.kkboxToken,
    AJAXConfig: state => state.AJAXConfig
  }
}
