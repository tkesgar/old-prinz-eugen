<template>
  <default-layout>
    <b-container>
      <main-me-chara-list class="m-4" />
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import MainMeCharaList from '../components/MainMeCharaList'
import store from '../store'

export default {
  components: {
    DefaultLayout,
    MainMeCharaList
  },
  beforeRouteEnter (to, from, next) {
    if (!store.state.user) {
      next('/')
      return
    }

    next()
  }
}
</script>
