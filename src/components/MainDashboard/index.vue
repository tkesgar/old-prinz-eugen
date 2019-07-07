<template>
  <b-container class="py-4">
    <loading-indicator v-if="!meChara" />
    <template v-else>
      <div v-if="meChara.length === 0" class="text-center text-muted py-4 px-3">
        Anda belum memiliki karakter.
      </div>
      <chara-card-list v-else :charas="meChara" />
    </template>
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
      this.meChara = await request('me/chara', {
        searchParams: new URLSearchParams({ bio: false })
      })
    })
  }
}
</script>
