<template>
  <div class="chara-card-list mx-auto">
    <div
      v-for="chara in charas"
      :key="chara.id"
      class="chara-card-container"
    >
      <chara-card :chara="chara" />
    </div>
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
@import "../../styles/include";

.chara-card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.chara-card-container {
  flex: 0 0 auto;
  width: 200px;
  padding: map-get($spacers, 1);
}
</style>
