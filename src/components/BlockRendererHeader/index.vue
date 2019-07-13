<template>
  <component :is="`h${level}`">{{ text }}</component>
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
    level () {
      return this.data.level
    },
    text () {
      return this.data.text
    }
  }
}
</script>
