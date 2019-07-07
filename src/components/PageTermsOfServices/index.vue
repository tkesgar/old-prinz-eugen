<template>
  <div class="root py-5 mx-auto">
    <div class="markdown-content" v-html="content" />
    <b-button variant="link" class="d-block text-right" to="/">&larr; Kembali ke halaman utama</b-button>
  </div>
</template>

<script>
import content from '../../assets/markdown/terms-and-conditions.md'

export default {
  data () {
    return {
      content
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

$width: map-get($container-max-widths, sm);

.root {
  max-width: $width;
}
</style>
