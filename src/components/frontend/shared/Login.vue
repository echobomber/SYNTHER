<template>
  <div>
    <!-- Modal -->
    <div class="loginPanel modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true" ref="loginModal">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
        <div class="container">
          <h5 class="" id="exampleModalLabel">登入帳戶</h5>
          <button type="button" class="btn-close"  aria-label="Close" @click.prevent="closeModal()"></button>
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
          <!--
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">登入帳戶</h5>
            <button type="button" class="btn-close"  aria-label="Close" @click.prevent="closeModal()"></button>
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
          -->
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
    openModal () {
      this.loginModal.show()
    },
    closeModal () {
      this.loginModal.hide()
      $('.modal-backdrop').remove()
    },
    login () {
      this.closeModal()
      this.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.$http.post(api, this.user).then((response) => {
        console.log(response.data.message)
        const token = response.data.token
        const expired = response.data.expired
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        this.$store.dispatch('updateLoading', false)
        this.$router.push('/admin/products')
      })
    }
  },
  mounted () {
    // 只能用 document.getElementById，不能使用 jQuery 的 $ 或 $refs
    this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'))
    // hidden.bs.modal 必須用 jQuery 才可以觸發，用 addEventListener 不會觸發
    $('#loginModel').on('hidden.bs.modal', function (event) {
      $('.modal-backdrop').remove()
    })
  }
}
</script>
