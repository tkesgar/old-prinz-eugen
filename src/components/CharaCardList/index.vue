<template>
  <b-row>
    <b-col
      v-for="chara in charas"
      :key="chara.id"
      cols="4"
      md="3"
    >
      <chara-card :chara="chara" class="my-3" />
    </b-col>
  </b-row>
</template>

<script>
import CharaCard from '../CharaCard'

export default {
  components: {
    CharaCard
  },
  props: {
    charas: {
      type: Array,
      required: true
    }
  }
}
</script>
