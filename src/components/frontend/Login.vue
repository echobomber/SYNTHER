<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="loginModel" tabindex="-1" aria-labelledby="loginModel" aria-hidden="true" ref="loginModel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">登入</h5>
            <button type="button" class="btn-close"  aria-label="Close" @click.prevent="closeModel()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.username">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
            <button type="submit" class="btn btn-primary" @click.prevent="login()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 關閉 Modal 方法
https://github.com/twbs/bootstrap/discussions/32347
*/
// 不加這行註解就不能用 new bootstrap，因為 eslint 會判定成沒有宣告過的變數。
/* global bootstrap */
/* global $ */

export default {
  name: 'login',
  components: {},
  data () {
    return {
      myModal: '',
      user: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
  },
  methods: {
    closeModel () {
      this.myModal.hide()
      $('.modal-backdrop').remove()
    },
    login () {
      const api = `${process.env.VUE_APP_BEAPIPATH}/admin/signin`
      this.$http.post(api, this.user).then((response) => {
        console.log(response.data)
        const token = response.data.token
        const expired = response.data.expired
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`
        this.closeModel()
        this.$router.push('/about')
      })
    }
  },
  mounted () {
    const myModalEl = document.querySelector('#loginModel')
    this.myModal = new bootstrap.Modal(myModalEl, {
      backdrop: true
    })
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
      $('.modal-backdrop').remove()
    })
    this.$bus.$on('openLoginModel', () => {
      this.myModal.show()
    })
  }
}
</script>
