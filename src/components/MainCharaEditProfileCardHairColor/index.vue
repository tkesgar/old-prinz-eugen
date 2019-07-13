<template>
  <base-card
    v-on="$listeners"
    title="Warna rambut"
    :delete-key="['hair_color.r', 'hair_color.g', 'hair_color.b']"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-input-group>
          <b-form-input
            required
            v-model="hairColor"
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
import BaseCard from '../BaseMainCharaEditProfileCard'
import * as Color from '../../utils/color'

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
      hairColor: Color.rgbToHex([
        this.charaInfo['hair_color.r'] || 0,
        this.charaInfo['hair_color.g'] || 0,
        this.charaInfo['hair_color.b'] || 0
      ])
    }
  },
  methods: {
    handleSubmit () {
      const [r, g, b] = Color.hexToRGB(this.hairColor)
      this.$emit('change-chara-info', {
        'hair_color.r': r,
        'hair_color.g': g,
        'hair_color.b': b
      })
    }
  }
}
</script>
