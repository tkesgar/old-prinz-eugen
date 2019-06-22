<template>
  <default-layout>
    <b-container>
      <div class="py-5">
        <main-register-card />
      </div>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import MainRegisterCard from '../components/MainRegisterCard'

export default {
  components: {
    DefaultLayout,
    MainRegisterCard
  }
}
</script>
