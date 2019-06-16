<template>
  <default-layout>
    <b-container>
      <template v-if="chara">
        <h1>{{ chara.name }}</h1>
        <markdown-renderer v-if="chara.bio" :markdown="chara.bio" />
      </template>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import { request } from '../utils/api'
import { acall } from '../utils'
import MarkdownRenderer from '../components/MarkdownRenderer'

export default {
  components: {
    DefaultLayout,
    MarkdownRenderer
  },
  data () {
    return {
      chara: null
    }
  },
  mounted () {
    acall(async () => {
      const { key } = this.$route.params
      this.chara = await request(`chara/${key}`)
    })
  }
}
</script>
