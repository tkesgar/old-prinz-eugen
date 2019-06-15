<template>
  <div>
    <main-navbar />
    <slot />
    <main-footer />
  </div>
</template>

<script>
import MainNavbar from '../components/MainNavbar'
import MainFooter from '../components/MainFooter'

export default {
  components: {
    MainNavbar,
    MainFooter
  }
}
</script>
