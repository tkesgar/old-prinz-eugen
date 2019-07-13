<template>
  <p v-html="html" />
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
    html () {
      const containerEl = document.createElement('p')
      containerEl.innerHTML = this.data.text

      containerEl.querySelectorAll('a').forEach(anchorEl => {
        const url = encodeURIComponent(anchorEl.href)
        anchorEl.href = `/go?url=${url}`
      })

      return containerEl.innerHTML
    }
  }
}
</script>
