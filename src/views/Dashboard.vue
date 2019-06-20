<template>
  <default-layout>
    <b-container>
      <me-chara-list class="m-4" />
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import MeCharaList from '../components/MeCharaList'

export default {
  components: {
    DefaultLayout,
    MeCharaList
  }
}
</script>
