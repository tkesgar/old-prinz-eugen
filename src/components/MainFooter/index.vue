<template>
  <div class="py-4 text-center text-muted">
    <ul class="p-0 mb-3">
      <li>
        <b-link href="https://github.com/tkesgar/prinz-eugen" target="_blank">CharaDB</b-link>#<b-link :href="`https://github.com/tkesgar/prinz-eugen/commit/${commit}`" target="_blank">{{ commit }}</b-link>
      </li>
      <li>
        <b-link to="/terms">Syarat dan Ketentuan</b-link>
      </li>
      <li>
        <b-link to="/privacy">Kebijakan Privasi</b-link>
      </li>
    </ul>
    <div class="notice text-muted px-3">
      Aplikasi ini masih dalam tahap pengembangan. Mohon digunakan dengan bijak.
    </div>
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

.root {
  border-top: $hr-border-width solid $hr-border-color;
  font-size: 0.875rem;
}

ul {
  list-style-type: none;
}

@include media-breakpoint-up(sm) {
  li {
    display: inline-block;

    & + li::before {
      content: "|";
      margin: 0 map-get($spacers, 2);
    }
  }
}
</style>
