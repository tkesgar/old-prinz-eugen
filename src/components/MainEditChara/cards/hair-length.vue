<template>
  <base-card
    v-on="$listeners"
    title="Panjang rambut"
    delete-key="hair_length"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-select required v-model="hairLength">
          <option disabled :value="null">Pilih panjang rambut</option>
          <option value="ear">Setelinga</option>
          <option value="neck">Seleher</option>
          <option value="shoulder">Sebahu</option>
          <option value="chest">Sedada</option>
          <option value="waist">Sepinggang</option>
          <option value="hip">Sepinggul</option>
          <option value="leg">Sekaki</option>
          <option value="floor">Selantai</option>
        </b-form-select>
      </b-form-group>
      <b-button type="submit">Ubah</b-button>
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
      hairLength: null
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'hair_length': this.hairLength })
    }
  }
}
</script>
