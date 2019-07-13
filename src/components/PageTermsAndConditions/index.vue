<template>
  <base-page-content :unsafe-html-content="content" />
</template>

<script>
import content from '../../assets/markdown/terms-and-conditions.md'
import BasePageContent from '../BasePageContent'

export default {
  components: {
    BasePageContent
  },
  computed: {
    content () {
      return content
    }
  }
}
</script>
