<template>
  <main-navbar :user="user" @logout="handleLogout" />
</template>

<script>
import { request } from '../../utils/api'
import { acall } from '../../utils'
import { mapState } from 'vuex'
import MainNavbar from './view'

export default {
  components: {
    MainNavbar
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleLogout () {
      acall(async () => {
        await request('auth/logout')

        this.$store.commit('setUser', { user: null })
        this.$router.push('/')
      })
    }
  }
}
</script>
