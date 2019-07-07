<template>
  <div>
    <slot name="header">
      <main-navbar />
    </slot>
    <slot />
    <slot name="footer">
      <main-footer />
    </slot>
  </div>
</template>

<script>
import MainNavbar from '../MainNavbar'
import MainFooter from '../MainFooter'

export default {
  components: {
    MainNavbar,
    MainFooter
  }
}
</script>
