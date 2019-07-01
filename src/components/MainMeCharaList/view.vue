<template>
  <div>
    <div v-if="charas.length === 0" class="text-center" data-test-key="empty-message">
      <p>Belum ada karakter.</p>
      <b-button variant="primary" @click="$emit('modal-show', 'CreateCharaModal')">Buat karakter baru</b-button>
    </div>
    <template v-else>
      <div v-for="chara in charas" :key="chara.id" data-test-key="chara">
        <b-link :to="`/chara/${chara.id}`">{{ chara.name }}</b-link>
      </div>
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
