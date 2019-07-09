<template>
  <div class="chara-edit-delete mx-auto py-4">
    <h1>Hapus karakter</h1>
    <b-alert show variant="danger">
      <b>Seluruh data karakter Anda akan dihapus.</b>
    </b-alert>
    <p>
      Untuk mengkonfirmasi penghapusan karakter, masukkan nama halaman karakter Anda
      (<b>{{ chara.name }}</b>).
    </p>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-input v-model="confirmDeleteText" required type="text" />
      </b-form-group>
      <b-button block type="submit" variant="danger" :disabled="!confirmDelete">Hapus karakter</b-button>
    </b-form>
  </div>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      confirmDeleteText: null
    }
  },
  computed: {
    confirmDelete () {
      return this.confirmDeleteText === this.chara.name
    }
  },
  methods: {
    handleSubmit () {
      if (!confirm('Apakah Anda yakin ingin menghapus karakter Anda dari dalam sistem?')) {
        return
      }

      acall(async () => {
        await request(`chara/${this.chara.id}`, { method: 'delete' })

        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chara-edit-delete {
  max-width: 600px;
}
</style>
