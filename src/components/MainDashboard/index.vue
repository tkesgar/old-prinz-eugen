<template>
  <b-container>
    <div class="py-4">
      <loading-indicator v-if="!meChara" />
      <template v-else>
        <div v-if="meChara.length === 0" class="text-center text-muted">
          Anda belum memiliki karakter.
        </div>
        <chara-card-list v-else :charas="meChara" />
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
      meChara: null
    }
  },
  mounted () {
    acall(async () => {
      this.meChara = await request('me/chara?bio=false')
    })
  }
}
</script>
