<template>
  <b-link :to="`/chara/${chara.id}`" class="chara-card d-block w-100">
    <b-card no-body>
      <loading-indicator v-if="!ready" class="text-center py-5" />
      <template v-else>
        <b-img fluid-grow :src="displayImage" :alt="displayName" class="chara-card-image" />
        <div class="chara-card-name">
          {{ displayName }}
        </div>
      </template>
    </b-card>
  </b-link>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'
import LoadingIndicator from '../LoadingIndicator'
import placeholderPortrait from '../../assets/images/placeholder-portrait.jpg'

export default {
  components: {
    LoadingIndicator
  },
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ready: false,
      profile: null,
      images: null
    }
  },
  computed: {
    displayName () {
      const {
        nick_name: nickName,
        full_name: fullName
      } = this.profile

      return nickName || fullName || this.chara.name
    },
    displayImage () {
      const { portrait } = this.images

      return portrait ? portrait.url : placeholderPortrait
    }
  },
  mounted () {
    acall(async () => {
      const { id: charaId } = this.chara

      await acall([
        async () => {
          this.profile = await request(`chara/${charaId}/info`)
        },
        async () => {
          this.images = await request(`chara/${charaId}/image`)
        }
      ])

      this.ready = true
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/include';

.chara-card {
  &:hover {
    text-decoration: none;
    color: currentColor;
  }
}

.chara-card-name {
  color: $body-color;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: map-get($spacers, 2);
  font-weight: lighter;
  text-align: center;
}
</style>
