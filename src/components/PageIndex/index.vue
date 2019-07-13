<template>
  <base-page-default>
    <main-landing v-if="!user" />
    <main-dashboard v-else :user="user" />
  </base-page-default>
</template>

<script>
import { mapState } from 'vuex'
import BasePageDefault from '../BasePageDefault'
import MainLanding from '../MainLanding'
import MainDashboard from '../MainDashboard'

export default {
  components: {
    BasePageDefault,
    MainLanding,
    MainDashboard
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
