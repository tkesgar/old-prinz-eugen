<template>
  <b-container>
    <div class="mx-auto py-5 content-container">
      <slot>
        <div class="content" v-html="unsafeHtmlContent" />
      </slot>
      <div v-if="showBackButton" class="text-right">
        <b-button variant="link" to="/">&larr; Kembali ke halaman utama</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  props: {
    unsafeHtmlContent: {
      type: String,
      default: null
    },
    showBackButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.content-container {
  max-width: 40rem;
}

.content {
  text-align: justify;
  font-size: 0.875rem;

  h1 {
    text-align: center;
  }
}
</style>
