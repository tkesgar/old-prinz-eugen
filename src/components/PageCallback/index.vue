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
  props: {
    action: {
      type: String,
      required: true
    }
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
      switch (this.action) {
        case 'auth':
          await this.auth()
          break
        default:
          console.warn(`Unknown action: ${this.action}; redirect to index page.`)
          this.$router.replace('/')
          break
      }
    })
  }
}
</script>
