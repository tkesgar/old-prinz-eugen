<template>
  <b-modal
    id="CreateCharaModal_modal"
    title="Buat karakter baru"
    hide-footer
    @hide="reset"
  >
    <create-chara-modal-form
      ref="form"
      @submit="handleSubmit"
    />
  </b-modal>
</template>

<script>
import CreateCharaModalForm from './form'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  components: {
    CreateCharaModalForm
  },
  methods: {
    handleSubmit ({ name, fullName, nickName }) {
      acall(async () => {
        const info = {}
        if (fullName) {
          info.full_name = fullName
        }

        if (nickName) {
          info.nick_name = nickName
        }

        const { id } = await request('chara', {
          method: 'post',
          json: { name, info }
        })

        this.$bvModal.hide(`CreateCharaModal_modal`)
        this.$router.push(`/chara/${id}`)
      })
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
