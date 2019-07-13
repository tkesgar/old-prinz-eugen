<template>
  <div>
    <loading-indicator v-if="!charaImages" />
    <div v-else>
      <base-main-chara-edit-images-card
        v-for="[imageType, data] in Object.entries(IMAGE_TYPES)"
        :key="imageType"
        :chara-id="chara.id"
        :chara-images="charaImages"
        :image-type="imageType"
        :current-image-key="imageType"
        :title="data.title"
        class="image-card"
        @chara-image-update="handleCharaImageUpdate"
      />
    </div>
  </div>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'
import LoadingIndicator from '../LoadingIndicator'
import BaseMainCharaEditImagesCard from '../BaseMainCharaEditImagesCard'

const IMAGE_TYPES = {
  'avatar': {
    title: 'Gambar avatar'
  },
  'portrait': {
    title: 'Gambar profil'
  },
  'fullbody': {
    title: 'Gambar seluruh badan'
  }
}

export default {
  components: {
    LoadingIndicator,
    BaseMainCharaEditImagesCard
  },
  data () {
    return {
      charaImages: null
    }
  },
  computed: {
    IMAGE_TYPES: () => IMAGE_TYPES,
    imageAvatar () {
      const avatar = this.charaImages['avatar']
      return avatar ? avatar.url : null
    }
  },
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  methods: {
    async fetchCharaImages () {
      this.charaImages = await request(`chara/${this.chara.id}/image`)
    },
    handleCharaImageUpdate () {
      acall(this.fetchCharaImages())
    }
  },
  created () {
    acall(this.fetchCharaImages())
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.image-card + .image-card {
  margin-top: $spacer;
}
</style>
