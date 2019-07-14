<template>
  <b-link :to="`/chara/${chara.id}`" class="chara-card d-block w-100">
    <b-card no-body class="p-relative">
      <loading-indicator v-if="!ready" class="text-center py-5" />
      <template v-else>
        <b-img fluid-grow :src="displayImage" :alt="displayName" class="chara-card-image" />
        <div class="chara-card-name">
          {{ displayName }}
        </div>
        <div v-if="showLikes && likeCount" class="like">
          ❤︎ {{ likeCount }}
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
    },
    showLikes: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ready: false,
      profile: null,
      images: null,
      likeCount: null
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
  methods: {
    fetchLikes () {
      acall(async () => {
        const { id: charaId } = this.chara

        const { count } = await request(`chara/${charaId}/like`)
        this.likeCount = count
      })
    }
  },
  watch: {
    showLikes (newValue) {
      if (newValue && this.likeCount === null) {
        this.fetchLikes()
      }
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

    if (this.showLikes) {
      this.fetchLikes()
    }
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

.like {
  position: absolute;
  top: map-get($spacers, 1);
  right: map-get($spacers, 1);
  padding: (map-get($spacers, 1) / 2) map-get($spacers, 1);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
