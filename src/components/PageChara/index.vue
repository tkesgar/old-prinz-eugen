<template>
  <base-default-page>
    <loading-indicator v-if="loading" class="py-5 px-3" />
    <template v-else>
      <div class="text-center text-muted py-5 px-3" v-if="notFound">
        Karakter tidak ada.
      </div>
      <router-view
        v-else
        :chara="chara"
        @refresh-chara="refreshChara"
      />
    </template>
  </base-default-page>
</template>

<script>
import BaseDefaultPage from '../BaseDefaultPage'
import LoadingIndicator from '../LoadingIndicator'
import { request } from '../../utils/api'
import { acall } from '../../utils'

export default {
  components: {
    BaseDefaultPage,
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
    notFound () {
      return this.chara === false
    }
  },
  methods: {
    async fetchChara () {
      this.chara = await request(`chara/${this.charaId}`)
    },
    refreshChara () {
      acall(this.fetchChara())
    }
  },
  mounted () {
    acall(this.fetchChara())
  }
}
</script>
