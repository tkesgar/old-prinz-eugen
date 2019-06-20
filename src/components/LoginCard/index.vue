<template>
  <login-card
    @login="handleLogin"
    @login-google="handleLoginGoogle"
  />
</template>

<script>
import { request, getUser, apiUrl } from '../../utils/api'
import { acall } from '../../utils'
import LoginCard from './view'

export default {
  components: {
    LoginCard
  },
  methods: {
    handleLogin ({ name, password }) {
      acall(async () => {
        await request('auth/login', { name, password })

        this.$store.commit('setUser', { user: await getUser() })
        this.$router.push('/')
      })
    },
    handleLoginGoogle () {
      const { next } = this.$route.query
      this.$store.commit('setNext', { next })

      window.location.assign(`${apiUrl}/auth/google`)
    }
  }
}
</script>
