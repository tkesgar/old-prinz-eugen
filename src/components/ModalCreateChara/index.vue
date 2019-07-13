<template>
  <b-modal
    id="ModalCreateChara"
    title="Buat karakter baru"
    hide-footer
    @hide="reset"
  >
    <form-create-chara
      ref="form"
      @submit="handleSubmit"
    />
  </b-modal>
</template>

<script>
import FormCreateChara from '../FormCreateChara'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  components: {
    FormCreateChara
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

        this.$bvModal.hide('ModalCreateChara')
        this.$router.push(`/chara/${id}`)
      })
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
