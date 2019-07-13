<template>
  <b-container>
    <div class="py-5 text-center">
      <h1>404</h1>
      <p>Ups, halaman <code>{{ path }}</code> tidak tersedia.</p>
      <b-button variant="link" @click="goBack">Kembali ke halaman sebelumnya</b-button>
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
    goBack () {
      window.history.back()
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
