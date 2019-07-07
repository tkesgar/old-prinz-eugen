<template>
  <base-card
    v-on="$listeners"
    title="Nama panggilan"
    delete-key="nick_name"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-input-group>
        <template v-slot:append>
          <b-button type="submit">Ubah</b-button>
        </template>
        <b-form-input
          required
          v-model="nickName"
          id="MainEditChara_nickName"
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
      nickName: this.charaInfo['nick_name']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'nick_name': this.nickName })
    }
  }
}
</script>
