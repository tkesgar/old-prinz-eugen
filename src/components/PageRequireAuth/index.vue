<template>
  <b-container>
    <div class="py-5 text-center">
      <h1>401</h1>
      <p>Ups, Anda belum terautentikasi.</p>
      <p>Anda bisa masuk dengan menggunakan akun Google Anda.</p>
      <b-link :href="loginURL">Masuk menggunakan akun Google</b-link>
    </div>
  </b-container>
</template>

<script>
import { apiUrl } from '../../utils/api'

export default {
  props: {
    next: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      path: window.location.pathname
    }
  },
  computed: {
    loginURL () {
      return `${apiUrl}/auth/google`
    }
  },
  mounted () {
    if (this.next) {
      this.$store.commit('setNext', this.next)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 4rem;
  font-weight: lighter;
}
</style>
