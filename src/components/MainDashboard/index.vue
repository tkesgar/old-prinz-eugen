<template>
  <b-container class="py-4">
    <h2>Chara Anda</h2>
    <div class="py-3">
      <loading-indicator v-if="!meChara" />
      <template v-else>
        <div v-if="meChara.length === 0" class="text-center text-muted">
          Anda belum memiliki karakter.
        </div>
        <chara-card-list v-else :charas="meChara" />
      </template>
    </div>
    <h2>Chara yang Anda sukai</h2>
    <div class="py-3">
      <loading-indicator v-if="!meCharaLike" />
      <template v-else>
        <div v-if="meCharaLike.length === 0" class="text-center text-muted">
          Anda belum memiliki chara yang disukai.
        </div>
        <chara-card-list v-else :charas="meCharaLike" />
      </template>
    </div>
  </b-container>
</template>

<script>
import CharaCardList from '../CharaCardList'
import LoadingIndicator from '../LoadingIndicator'
import { request } from '../../utils/api'
import { acall } from '../../utils'

export default {
  components: {
    CharaCardList,
    LoadingIndicator
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meChara: null,
      meCharaLike: null
    }
  },
  mounted () {
    acall([
      async () => {
        this.meChara = await request('me/chara?bio=false')
      },
      async () => {
        this.meCharaLike = await request('me/chara/like')
      }
    ])
  }
}
</script>
