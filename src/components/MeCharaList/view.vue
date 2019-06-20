<template>
  <div class="chara-list-empty text-center">
    <p>Anda tidak memiliki karakter.</p>
    <p>Silakan buat karakter baru <b-link to="/chara/new">di sini</b-link>.</p>
  </div>
</template>

<script>
export default {
  props: {
    charas: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
