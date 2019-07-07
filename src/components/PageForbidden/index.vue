<template>
  <b-container>
    <div class="py-5 text-center">
      <h1>403</h1>
      <p>Ups, Anda tidak boleh mengakses halaman tersebut.</p>
      <b-button variant="link" @click="goHome">Kembali ke halaman utama</b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      path: window.location.pathname
    }
  },
  methods: {
    goHome () {
      this.$router.replace('/')
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
