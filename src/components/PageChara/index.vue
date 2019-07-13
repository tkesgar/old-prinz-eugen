<template>
  <base-page-default>
    <div class="py-5">
      <loading-indicator v-if="loading" />
      <template v-else>
        <div class="text-center text-muted" v-if="charaNotFound">
          Karakter tidak ada.
        </div>
        <router-view
          v-else
          :chara="chara"
          @refresh="handleRefresh"
        />
      </template>
    </div>
  </base-page-default>
</template>

<script>
import BasePageDefault from '../BasePageDefault'
import LoadingIndicator from '../LoadingIndicator'
import { request } from '../../utils/api'
import { acall } from '../../utils'

export default {
  components: {
    BasePageDefault,
    LoadingIndicator
  },
  props: {
    charaId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      chara: null
    }
  },
  computed: {
    loading () {
      return this.chara === null
    },
    charaNotFound () {
      return this.chara === false
    }
  },
  methods: {
    async fetchChara () {
      this.chara = await request(`chara/${this.charaId}`)
    },
    handleRefresh () {
      acall(this.fetchChara())
    }
  },
  mounted () {
    acall(this.fetchChara())
  }
}
</script>
