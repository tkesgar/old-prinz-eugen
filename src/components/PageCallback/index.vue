<template>
  <div class="py-5 text-center">
    <loading-indicator text />
  </div>
</template>

<script>
import { acall } from '../../utils'
import { getUser } from '../../utils/api'
import LoadingIndicator from '../LoadingIndicator'

export default {
  components: {
    LoadingIndicator
  },
  methods: {
    async auth () {
      this.$store.commit('setUser', await getUser())

      const next = this.$store.state.next || '/'
      this.$store.commit('setNext', null)

      this.$router.push(next)
    }
  },
  created () {
    acall(async () => {
      // TODO Rename info -> action (ini di back-end)
      const { action } = this.$route.query

      const fn = this[action]
      if (!fn) {
        console.warn(`Unknown action: ${action}; redirect to index page.`)
        this.$router.replace('/')
        return
      }

      await fn()
    })
  }
}
</script>
