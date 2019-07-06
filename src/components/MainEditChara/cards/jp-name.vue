<template>
  <base-card
    v-on="$listeners"
    title="Nama dalam tulisan Jepang"
    delete-key="jp_name"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-input-group>
        <template v-slot:append>
          <b-button type="submit">Ubah</b-button>
        </template>
        <b-form-input
          required
          v-model="jpName"
          id="MainEditChara_jpName"
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
      jpName: this.charaInfo['jp_name']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'jp_name': this.jpName })
    }
  }
}
</script>
