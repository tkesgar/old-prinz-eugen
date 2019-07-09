<template>
  <component :is="listType">
    <li v-for="(item, i) in items" :key="i">{{ item }}</li>
  </component>
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
    listType () {
      const { style } = this.data
      switch (style) {
        case 'ordered': return 'ol'
        case 'unordered': return 'ul'
        default:
          console.warn(`Unknown list style: ${style}; defaults to 'ul'`)
          return 'ul'
      }
    },
    items () {
      return this.data.items
    }
  }
}
</script>
