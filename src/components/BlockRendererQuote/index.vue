<template>
  <blockquote class="blockquote">
    <p :class="`text-${alignment}`">
      {{ text }}
    </p>
    <footer class="blockquote-footer" v-if="caption">
      {{ caption }}
    </footer>
  </blockquote>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    text () {
      return this.data.text
    },
    caption () {
      return this.data.caption
    },
    alignment () {
      return this.data.alignment
    }
  }
}
</script>
