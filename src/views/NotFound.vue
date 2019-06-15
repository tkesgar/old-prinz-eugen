<template>
  <div class="not-found py-5">
    <h1>404</h1>
    <p>Ups, halaman <code>{{ path }}</code> tidak tersedia.</p>
    <b-button variant="link" @click="$router.back()">Kembali ke halaman sebelumnya.</b-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: window.location.pathname
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
}
</style>
