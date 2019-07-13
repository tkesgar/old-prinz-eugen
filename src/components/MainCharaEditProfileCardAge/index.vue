<template>
  <base-card
    v-on="$listeners"
    title="Usia"
    delete-key="age"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-checkbox v-model="number" switch>
          Usia dalam tahun
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-input-group>
          <template v-slot:append>
            <b-input-group-text v-if="number">tahun</b-input-group-text>
            <b-button type="submit">Ubah</b-button>
          </template>
          <b-form-input
            required
            v-model="age"
            id="MainEditChara_age"
            :type="number ? 'number' : 'text'"
            :min="number ? 1 : null"
          />
        </b-input-group>
      </b-form-group>
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
      age: this.charaInfo['age'],
      number: typeof this.charaInfo['age'] !== 'string'
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', {
        'age': this.number ? parseInt(this.age, 10) : this.age
      })
    }
  }
}
</script>
