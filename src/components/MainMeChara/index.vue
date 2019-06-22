<template>
  <me-chara-list
    @modal-show="handleModalShow"
    :charas="charas"
  />
</template>

<script>
import MeCharaList from './view'
import { acall } from '../../utils'
import { request } from '../../utils/api'

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
      this.charas = await request('me/chara')
    })
  },
  methods: {
    handleModalShow (name) {
      this.$bvModal.show(`${name}_modal`)
    }
  }
}
</script>
