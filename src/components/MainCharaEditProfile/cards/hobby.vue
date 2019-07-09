<template>
  <base-card
    v-on="$listeners"
    title="Hobi"
    delete-key="hobby"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-input-group>
        <b-form-input
          required
          v-model="hobby"
          type="text"
        />
        <template v-slot:append>
          <b-button type="submit">Ubah</b-button>
        </template>
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
      hobby: this.charaInfo['hobby']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'hobby': this.hobby })
    }
  }
}
</script>
