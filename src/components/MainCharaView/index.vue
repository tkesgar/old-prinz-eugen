<template>
  <b-container>
    <div v-if="!ready" class="py-5">
      <loading-indicator />
    </div>
    <template v-else>
      <b-row class="py-4">
        <b-col md="8" lg="9" order="2" order-md="1">
          <block-renderer :data="chara.bio" />
        </b-col>
        <b-col md="4" lg="3" order="1" order-md="2">
          <chara-sidebar
            :chara="chara"
            :profile="profile"
            :images="images"
          />
          <b-card v-if="charaOwner" header="Menu karakter" class="mt-3" no-body>
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

export default {
  components: {
    LoadingIndicator,
    CharaSidebar,
    BlockRenderer
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
      return this.user.id === this.chara.userId
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
