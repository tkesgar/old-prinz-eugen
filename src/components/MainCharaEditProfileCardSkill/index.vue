<template>
  <base-card
    v-on="$listeners"
    title="Keahlian"
    delete-key="skill"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-input-group>
        <b-form-input
          required
          v-model="skill"
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
import BaseCard from '../BaseMainCharaEditProfileCard'

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
      skill: this.charaInfo['skill']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'skill': this.skill })
    }
  }
}
</script>
