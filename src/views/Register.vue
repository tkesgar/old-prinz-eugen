<template>
  <default-layout>
    <b-container>
      <div class="py-5">
        <register-card />
      </div>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import RegisterCard from '../components/RegisterCard'

export default {
  components: {
    DefaultLayout,
    RegisterCard
  }
}
</script>
