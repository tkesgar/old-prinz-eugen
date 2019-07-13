<template>
  <base-card
    v-on="$listeners"
    title="Warna kesukaan"
    :delete-key="['fav_color.r', 'fav_color.g', 'fav_color.b']"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-input-group>
          <b-form-input
            required
            v-model="favColor"
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
      favColor: Color.rgbToHex([
        this.charaInfo['fav_color.r'] || 0,
        this.charaInfo['fav_color.g'] || 0,
        this.charaInfo['fav_color.b'] || 0
      ])
    }
  },
  methods: {
    handleSubmit () {
      const [r, g, b] = Color.hexToRGB(this.favColor)
      this.$emit('change-chara-info', {
        'fav_color.r': r,
        'fav_color.g': g,
        'fav_color.b': b
      })
    }
  }
}
</script>
