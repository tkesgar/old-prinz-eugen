<template>
  <b-card :title="title">
    <slot />
    <template v-if="deleteKey" v-slot:footer>
      <div class="text-right">
        <b-button
          size="sm"
          variant="danger"
          class="d-inline-block"
          @click="$emit('delete-chara-info', deleteKey)"
        >
          Hapus
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    deleteKey: {
      type: String,
      default: null
    }
  }
}
</script>
