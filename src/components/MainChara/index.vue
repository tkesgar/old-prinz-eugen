<template>
  <div>
    <view-component
      v-if="chara"
      :chara="chara"
      :chara-info="charaInfo"
      :chara-image="charaImage"
      :user-id="user ? user.id : null"
    />
  </div>
</template>

<script>
import ViewComponent from './view'
import { acall } from '../../utils'
import { request } from '../../utils/api'
import { mapState } from 'vuex'

export default {
  components: {
    ViewComponent
  },
  data () {
    return {
      chara: null,
      charaInfo: [],
      charaImage: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    acall(async () => {
      const { charaId } = this.$route.params

      const [chara, charaInfo, charaImage] = await Promise.all([
        request(`chara/${charaId}`),
        request(`chara/${charaId}/info`),
        request(`chara/${charaId}/image`)
      ])
      Object.assign(this, { chara, charaInfo, charaImage })
    })
  }
}
</script>
