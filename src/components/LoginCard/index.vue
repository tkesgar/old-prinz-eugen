<template>
  <login-card @login="handleLogin" />
</template>

<script>
import { request, getUser } from '../../utils/api'
import { acall } from '../../utils'
import LoginCard from './pure'

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
    }
  }
}
</script>
