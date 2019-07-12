<template>
  <base-content-page :unsafe-html-content="CONTENT" />
</template>

<script>
import content from '../../assets/markdown/terms-and-conditions.md'
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
