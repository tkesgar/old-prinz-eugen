<template>
  <div>
    <div v-if="charas.length === 0" class="text-center">
      <p>Belum ada karakter.</p>
    </div>
    <template v-else>
      <ul>
        <li v-for="chara in charas" :key="chara.id">
          <b-link :to="`/chara/${chara.id}`">{{ chara.name }}</b-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    charas: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
