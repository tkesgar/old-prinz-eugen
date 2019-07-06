<template>
  <base-card
    v-on="$listeners"
    title="Tinggi badan"
    delete-key="height"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-checkbox v-model="number" switch>
          Tinggi dalam cm
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-input-group>
          <template v-slot:append>
            <b-input-group-text v-if="number">cm</b-input-group-text>
            <b-button type="submit">Ubah</b-button>
          </template>
          <b-form-input
            required
            v-model="height"
            id="MainEditChara_height"
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
      height: this.charaInfo['height'],
      number: typeof this.charaInfo['height'] !== 'string'
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', {
        'height': this.number ? parseInt(this.height, 10) : this.height
      })
    }
  }
}
</script>
