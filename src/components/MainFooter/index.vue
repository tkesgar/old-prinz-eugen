<template>
  <div class="root py-4">
    <ul>
      <li>
        <a href="https://github.com/tkesgar/prinz-eugen" target="_blank">prinz-eugen</a>#<a :href="`https://github.com/tkesgar/prinz-eugen/commit/${commit}`" target="_blank">{{ commit }}</a>
      </li>
      <li>
        <b-link to="/tos">Syarat dan Ketentuan</b-link>
      </li>
      <li>
        <b-link to="/privacy">Kebijakan Privasi</b-link>
      </li>
    </ul>
    <div class="notice text-muted">
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
  text-align: center;
  font-size: 0.875rem;
  color: $text-muted;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 0.5rem;
}

@include media-breakpoint-up(sm) {
  li {
    display: inline-block;

    & + li::before {
      content: "|";
      margin: 0 0.5rem;
    }
  }
}

.notice {
  font-size: 0.75rem;
  padding: 0 1rem;
}
</style>
