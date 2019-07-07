<template>
  <div class="text-center text-muted">
    <div v-if="text" class="mb-3">{{ label }}</div>
    <b-spinner :label="label" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Tunggu sebentar...'
    },
    text: {
      type: Boolean,
      default: false
    }
  }
}
</script>
