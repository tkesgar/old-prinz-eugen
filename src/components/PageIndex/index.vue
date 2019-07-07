<template>
  <base-default-page>
    <main-landing v-if="!user" />
    <main-dashboard v-else :user="user" />
  </base-default-page>
</template>

<script>
import { mapState } from 'vuex'
import BaseDefaultPage from '../BaseDefaultPage'
import MainLanding from '../MainLanding'
import MainDashboard from '../MainDashboard'

export default {
  components: {
    BaseDefaultPage,
    MainLanding,
    MainDashboard
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
