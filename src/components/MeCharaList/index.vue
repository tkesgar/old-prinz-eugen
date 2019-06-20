<template>
  <me-chara-list
    @modal-show="handleModalShow"
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
      meChara: []
    }
  },
  mounted () {
    acall(async () => {
      this.meChara = await request('me/chara')
    })
  },
  methods: {
    handleModalShow (name) {
      this.$bvModal.show(`${name}_modal`)
    }
  }
}
</script>
