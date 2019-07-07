<template>
  <b-container>
    <h1>{{ chara.name }}</h1>
    <b-link :to="`/chara/${chara.id}/edit`">Edit</b-link>
  </b-container>
</template>

<script>
export default {
  props: {
    chara: {
      type: Object,
      required: true
    }
  }
}
</script>
