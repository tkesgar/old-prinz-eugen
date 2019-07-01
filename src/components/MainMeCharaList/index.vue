<template>
  <me-chara-list
    @modal-show="showModal"
    :charas="charas"
  />
</template>

<script>
import MeCharaList from './view'
import { acall } from '../../utils'
import { request } from '../../utils/api'
import { helperMethods } from '../../utils/component-helpers'

export default {
  components: {
    MeCharaList
  },
  data () {
    return {
      charas: []
    }
  },
  mounted () {
    acall(async () => {
      // TODO Tambahkan info dan image di me/chara request (buat nampilin gambar sama nama)
      this.charas = await request('me/chara')
    })
  },
  methods: {
    ...helperMethods
  }
}
</script>
