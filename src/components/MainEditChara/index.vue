<template>
  <b-container class="my-4">
    <loading-indicator class="py-5" v-if="!chara" />
    <b-tabs v-else pills content-class="mt-3">
      <b-tab title="Profil">
        <main-edit-chara-info :chara="chara" />
      </b-tab>
      <b-tab title="Gambar">
        <main-edit-chara-images :chara="chara" />
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import MainEditCharaInfo from '../MainEditCharaInfo'
import MainEditCharaImages from '../MainEditCharaImages'
import LoadingIndicator from '../LoadingIndicator'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  components: {
    MainEditCharaInfo,
    MainEditCharaImages,
    LoadingIndicator
  },
  data () {
    return {
      chara: null
    }
  },
  methods: {
    async fetchChara () {
      const { charaId } = this.$route.params
      this.chara = await request(`chara/${charaId}`)
    }
  },
  created () {
    acall(this.fetchChara())
  }
}
</script>
