<template>
  <base-card
    v-on="$listeners"
    title="Berat badan"
    delete-key="weight"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-checkbox v-model="number" switch>
          Berat dalam kg
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-input-group>
          <template v-slot:append>
            <b-input-group-text v-if="number">kg</b-input-group-text>
            <b-button type="submit">Ubah</b-button>
          </template>
          <b-form-input
            required
            v-model="weight"
            id="MainEditChara_weight"
            :type="number ? 'number' : 'text'"
            :min="number ? 1 : null"
          />
        </b-input-group>
      </b-form-group>
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
      weight: this.charaInfo['weight'],
      number: typeof this.charaInfo['weight'] !== 'string'
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', {
        'weight': this.number ? parseInt(this.weight, 10) : this.weight
      })
    }
  }
}
</script>
