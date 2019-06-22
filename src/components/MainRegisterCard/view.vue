<template>
  <b-card
    title="Daftar pengguna baru"
    class="register-card mx-auto"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label-for="RegisterCard_name"
        label="Nama pengguna"
      >
        <b-form-input
          id="RegisterCard_name"
          type="text"
          required
          placeholder="Nama pengguna"
          pattern="^\w{1,16}$"
        />
        <small class="form-text text-muted">
          Nama pengguna hanya terdiri dari huruf, angka, dan garis bawah (_), dengan panjang
          maksimal 16 karakter.
        </small>
      </b-form-group>
      <b-form-group
        label-for="RegisterCard_email"
        label="Alamat email"
      >
        <b-form-input
          id="RegisterCard_email"
          type="email"
          required
          placeholder="Email"
        />
        <small class="form-text text-muted">
          {{/* TODO Kasih modal untuk penjelasan lebih detail tentang email hash */}}
          Kami tidak menyimpan alamat email Anda dalam bentuk utuh.
        </small>
      </b-form-group>
      <b-form-group
        label-for="RegisterCard_password"
        label="Kata sandi"
      >
        <b-form-input
          id="RegisterCard_password"
          type="password"
          required
          placeholder="Kata sandi"
          minlength="8"
        />
        <small class="form-text text-muted">
          Panjang kata sandi minimal adalah 8 karakter.
        </small>
      </b-form-group>
      <b-form-group>
        <vue-recaptcha
          :sitekey="recaptchaSiteKey"
          @verify="handleRecaptchaVerify"
          @expired="handleRecaptchaExpired"
        />
      </b-form-group>
      <b-button type="submit" block>Daftar</b-button>
    </b-form>
  </b-card>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import loadRecaptchaScript from '../../lib/load-recaptcha-script'

export default {
  components: {
    VueRecaptcha
  },
  data () {
    return {
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      recaptchaToken: null
    }
  },
  methods: {
    handleSubmit () {
      if (!this.recaptchaToken) {
        alert('reCAPTCHA harus diselesaikan terlebih dahulu.')
        return
      }

      const name = document.querySelector('#RegisterCard_name').value
      const email = document.querySelector('#RegisterCard_email').value
      const password = document.querySelector('#RegisterCard_password').value
      const recaptchaToken = this.recaptchaToken

      this.$emit('register', { name, email, password, recaptchaToken })
    },
    handleRecaptchaVerify (token) {
      this.recaptchaToken = token
    },
    handleRecaptchaExpired () {
      this.recaptchaToken = null
    }
  },
  beforeMount () {
    loadRecaptchaScript()
  }
}
</script>

<style lang="scss" scoped>
.register-card {
  max-width: 480px;
}
</style>
