<template>
  <create-chara-modal
    @modal-hide="handleModalHide"
    @submit="handleSubmit"
  />
</template>

<script>
import CreateCharaModal from './view'

export default {
  components: {
    CreateCharaModal
  },
  methods: {
    handleModalHide (name) {
      return this.$bvModal.hide(`${name}_modal`)
    },
    handleSubmit (data) {
      console.log(data)
      console.log('uwu')
    }
  }
}
</script>
