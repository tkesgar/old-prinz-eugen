<template>
  <create-chara-modal
    @modal-hide="handleModalHide"
    @submit="handleSubmit"
  />
</template>

<script>
import CreateCharaModal from './view'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  components: {
    CreateCharaModal
  },
  methods: {
    handleModalHide (name) {
      return this.$bvModal.hide(`${name}_modal`)
    },
    handleSubmit ({ name, fullName, nickName }) {
      acall(async () => {
        const entries = []
        if (fullName) {
          entries.push({ key: 'full_name', value: fullName })
        }
        if (nickName) {
          entries.push({ key: 'nick_name', value: nickName })
        }

        const location = await request('chara', { name, entries })
        this.$bvModal.hide(`CreateCharaModal_modal`)
        this.$router.push(location)
      })
    }
  }
}
</script>
