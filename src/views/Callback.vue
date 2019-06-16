<template>
  <div>Silakan tunggu sebentar...</div>
</template>

<script>
import { getUser } from '../utils/api'
import { acall } from '../utils'

export default {
  mounted () {
    acall(async () => {
      const { info } = this.$router.currentRoute.query
      switch (info) {
        case 'auth_google':
          this.$store.commit('setUser', { user: await getUser() })
          this.$router.push('/')
          break
        default:
          console.warn(`Unknown callback info: ${info}; redirect to index page.`)
          this.$router.push('/')
      }
    })
  }
}
</script>
