<template>
  <div class="footer py-4">
    <a href="https://github.com/tkesgar/prinz-eugen" target="_blank">prinz-eugen</a>#<a :href="`https://github.com/tkesgar/prinz-eugen/commit/${commit}`" target="_blank">{{ commit }}</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commit: process.env.VUE_APP_COMMIT
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.footer {
  border-top: $hr-border-width solid $hr-border-color;
  text-align: center;
  font-size: 0.875rem;
  color: $text-muted;
}
</style>
