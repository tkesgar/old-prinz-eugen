<template>
  <b-container>
    <loading-indicator v-if="!ready" />
    <template v-else>
      <div class="mb-5 header">
        <h1 class="heading">{{ displayName }}</h1>
      </div>

      <b-row>
        <b-col lg="3" order="1" order-lg="1" class="mb-4 mb-lg-0">
          <chara-sidebar
            :chara="chara"
            :profile="profile"
            :images="images"
          />
        </b-col>

        <b-col lg="6" order="3" order-lg="2" class="mt-4 mt-lg-0">
          <block-renderer v-if="chara.bio" :data="chara.bio" />
        </b-col>

        <b-col lg="3" order="2" order-lg="3">
          <chara-like-card :chara-id="chara.id" :toggleable="user && !charaOwner" class="mb-3" />
          <b-card v-if="charaOwner" header="Menu karakter" class="mb-3" no-body>
            <b-list-group flush>
              <b-list-group-item :to="`/chara/${chara.id}/edit`">
                Ubah data karakter
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </template>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import { acall } from '../../utils'
import { request } from '../../utils/api'
import LoadingIndicator from '../LoadingIndicator'
import CharaSidebar from '../CharaSidebar'
import BlockRenderer from '../BlockRenderer'
import CharaLikeCard from '../CharaLikeCard'

export default {
  components: {
    LoadingIndicator,
    CharaSidebar,
    BlockRenderer,
    CharaLikeCard
  },
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      profile: null,
      images: null,
      ready: false
    }
  },
  computed: {
    ...mapState(['user']),
    charaOwner () {
      return this.user && this.user.id === this.chara.userId
    },
    displayName () {
      return this.profile['full_name'] || this.profile['nick_name'] || this.profile['jp_name'] || this.chara.name
    },
    fullbodyImage () {
      const { fullbody } = this.images
      return fullbody ? fullbody.url : null
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
@import "../../styles/include";

.header {
  border-bottom: $hr-border-width solid $hr-border-color;
}

.heading {
  font-size: 4rem;
  font-weight: lighter;
}
</style>
