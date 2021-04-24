<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="loginModel" tabindex="-1" aria-labelledby="loginModel" aria-hidden="true" ref="loginModel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <!--
          <Form class="modal-body" v-slot="{ errors }" @submit="login">
            <h5 class="modal-title" id="exampleModalLabel">登入帳戶</h5>

          </Form>
          -->
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">登入帳戶</h5>
            <button type="button" class="btn-close"  aria-label="Close" @click.prevent="closeModel()"></button>
          </div>
          <Form v-slot="{ errors }" @submit="login">
            <div class="modal-body">
              <div class="form-floating mb-3">
                <Field type="email" name="會員帳號" class="form-control" :class="{ 'is-invalid': errors['會員帳號'] }" rules="email|required" id="username" v-model="user.username" placeholder="帳號" @keyup.enter="login"></Field>
                <label for="username" class="form-label">輸入信箱</label>
                <error-message name="會員帳號" class="invalid-feedback"></error-message>
              </div>
              <div class="form-floating mb-3">
                <Field type="password" name="登入密碼" class="form-control" :class="{ 'is-invalid': errors['登入密碼'] }" rules="required" id="password" v-model="user.password" placeholder="密碼" @keyup.enter="login"></Field>
                <label for="password" class="form-label">輸入密碼</label>
                <error-message name="登入密碼" class="invalid-feedback"></error-message>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">登入</button>
            </div>
          </Form>

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
      loginModal: '',
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
      this.loginModal.hide()
      $('.modal-backdrop').remove()
    },
    login () {
      this.closeModel()
      this.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.$http.post(api, this.user).then((response) => {
        console.log(response.data.message)
        const token = response.data.token
        const expired = response.data.expired
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`
        this.$store.dispatch('updateLoading', false)
        // this.$router.push('/admin')
      })
    }
  },
  mounted () {
    // Bootstrap 5 有 Bug，loginModal 必須使用 document.getElementById，不能使用 jQuery 的 $
    const loginModalEl = document.getElementById('loginModel')
    this.loginModal = new bootstrap.Modal(loginModalEl)
    // hidden.bs.modal 必須用 jQuery 才可以觸發，用 addEventListener 不會觸發
    $('#loginModel').on('hidden.bs.modal', function (event) {
      $('.modal-backdrop').remove()
      console.log('測試觸發 hidden.bs.modal')
    })
    this.$bus.$on('openLoginModel', () => {
      this.loginModal.show()
    })
  }
}
</script>
