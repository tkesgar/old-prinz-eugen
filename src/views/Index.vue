<template>
  <default-layout>
    <b-container>
      <b-jumbotron class="jumbotron">
        <h1>Prinz Eugen</h1>
        <p>Ich liebe dich~ is this a joke or the truth? Why don't you decide for yourself~</p>
      </b-jumbotron>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import store from '../store'

export default {
  components: {
    DefaultLayout
  },
  beforeRouteEnter (to, from, next) {
    if (store.state.user) {
      next('/home')
      return
    }

    next()
  }
}
</script>

<style lang="scss" scoped>
.jumbotron {
  text-align: center;
  margin-bottom: 0;
  font-size: 1.5rem;
}
</style>
