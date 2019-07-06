<template>
  <base-card
    v-on="$listeners"
    title="Nama lengkap"
    delete-key="full_name"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-input-group>
        <template v-slot:append>
          <b-button type="submit">Ubah</b-button>
        </template>
        <b-form-input
          required
          v-model="fullName"
          id="MainEditChara_fullName"
          type="text"
        />
      </b-input-group>
    </b-form>
  </base-card>
</template>

<script>
import BaseCard from '../card-utils/base-card'

export default {
  components: {
    BaseCard
  },
  props: {
    charaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      fullName: this.charaInfo['full_name']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'full_name': this.fullName })
    }
  }
}
</script>
