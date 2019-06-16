<template>
  <div v-html="render(markdown)" />
</template>

<script>
import renderMarkdown from '../../utils/markdown'

export default {
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  methods: {
    render: renderMarkdown
  }
}
</script>
