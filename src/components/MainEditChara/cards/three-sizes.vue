<template>
  <base-card
    v-on="$listeners"
    title="Three sizes"
    :delete-key="['threesizes.b', 'threesizes.w', 'threesizes.h']"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-row>
        <b-col>
          <b-form-group
            label="B"
            label-for="MainEditChara_threesizesB"
          >
            <b-form-input
              required
              v-model.number="threesizesB"
              type="number"
              id="MainEditChara_threesizesB"
              min="1"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="W"
            label-for="MainEditChara_threesizesW"
          >
            <b-form-input
              required
              v-model.number="threesizesW"
              type="number"
              id="MainEditChara_threesizesW"
              min="1"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="H"
            label-for="MainEditChara_threesizesH"
          >
            <b-form-input
              required
              v-model.number="threesizesH"
              type="number"
              id="MainEditChara_threesizesH"
              min="1"
            />
          </b-form-group>
        </b-col>
      </b-form-row>
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
      threesizesB: this.charaInfo['threesizes.b'],
      threesizesW: this.charaInfo['threesizes.w'],
      threesizesH: this.charaInfo['threesizes.h']
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', {
        'threesizes.b': this.threesizesB,
        'threesizes.w': this.threesizesW,
        'threesizes.h': this.threesizesH
      })
    }
  }
}
</script>
