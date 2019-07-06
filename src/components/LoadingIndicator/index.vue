<template>
  <div class="text-center">
    <b-spinner :label="label" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Tunggu sebentar...'
    }
  }
}
</script>
