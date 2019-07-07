<template>
  <base-content-page :unsafe-html-content="CONTENT" />
</template>

<script>
import content from '../../assets/markdown/privacy-policy.md'
import BaseContentPage from '../BaseContentPage'

export default {
  components: {
    BaseContentPage
  },
  computed: {
    CONTENT () {
      return content
    }
  }
}
</script>
