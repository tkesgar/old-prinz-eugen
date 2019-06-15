<template>
  <default-layout>
    <b-container>
      <div class="py-5">
        <login-card />
      </div>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import LoginCard from '../components/LoginCard'

export default {
  components: {
    DefaultLayout,
    LoginCard
  }
}
</script>
