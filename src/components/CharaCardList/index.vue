<template>
  <div class="chara-card-list">
    <chara-card
      v-for="chara in charas"
      :key="chara.id"
      :chara="chara"
    />
  </div>
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

<style lang="scss" scoped>
.chara-card-list {
  display: flex;
  align-items: flex-start;
}
</style>
