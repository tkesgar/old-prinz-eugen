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
        case 'auth':
          this.$store.commit('setUser', { user: await getUser() })

          const next = this.$store.state.next || '/'
          this.$store.commit('clearNext')

          this.$router.push(next)
          break
        default:
          console.warn(`Unknown callback info: ${info}; redirect to index page.`)
          this.$router.push('/')
      }
    })
  }
}
</script>
