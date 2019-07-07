<template>
  <view-component
    :user="user"
    :apiUrl="apiUrl"
    @logout="handleLogout"
    @modal-show="handleModalShow"
  />
</template>

<script>
import { request, apiUrl } from '../../utils/api'
import { acall } from '../../utils'
import { mapState } from 'vuex'
import ViewComponent from './view'

export default {
  components: {
    ViewComponent
  },
  data () {
    return {
      apiUrl
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleLogout () {
      acall(async () => {
        await request('auth/logout')

        this.$store.commit('setUser', null)
        this.$router.push('/')
      })
    },
    handleModalShow (name) {
      this.$bvModal.show(`${name}_modal`)
    }
  }
}
</script>
