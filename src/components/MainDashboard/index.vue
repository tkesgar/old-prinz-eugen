<template>
  <b-container>
    <h1>Hello, {{ user.displayName }}!</h1>
  </b-container>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
