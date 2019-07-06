<template>
  <base-card
    v-on="$listeners"
    title="Warna mata"
    :delete-key="['eye_color.r', 'eye_color.g', 'eye_color.b']"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-input-group>
          <b-form-input
            required
            v-model="eyeColor"
            type="color"
          />
          <template v-slot:append>
            <b-button type="submit">Ubah</b-button>
          </template>
        </b-input-group>
      </b-form-group>
    </b-form>
  </base-card>
</template>

<script>
import BaseCard from '../card-utils/base-card'
import * as Color from '../../../utils/color'

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
      eyeColor: Color.rgbToHex([
        this.charaInfo['eye_color.r'] || 0,
        this.charaInfo['eye_color.g'] || 0,
        this.charaInfo['eye_color.b'] || 0
      ])
    }
  },
  methods: {
    handleSubmit () {
      const [r, g, b] = Color.hexToRGB(this.eyeColor)
      this.$emit('change-chara-info', {
        'eye_color.r': r,
        'eye_color.g': g,
        'eye_color.b': b
      })
    }
  }
}
</script>
