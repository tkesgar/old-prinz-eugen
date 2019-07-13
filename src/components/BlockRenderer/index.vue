<template>
  <div>
    <component
      v-for="(block, i) of data.blocks"
      :key="getComponentKey(i)"
      :is="`block-renderer-${block.type}`"
      :data="block.data"
    />
  </div>
</template>

<script>
import BlockRendererParagraph from '../BlockRendererParagraph'
import BlockRendererHeader from '../BlockRendererHeader'
import BlockRendererList from '../BlockRendererList'
import BlockRendererQuote from '../BlockRendererQuote'
import BlockRendererDelimiter from '../BlockRendererDelimiter'
import BlockRendererSimpleImage from '../BlockRendererSimpleImage'

export default {
  components: {
    BlockRendererParagraph,
    BlockRendererHeader,
    BlockRendererList,
    BlockRendererQuote,
    BlockRendererDelimiter,
    BlockRendererSimpleImage
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    getComponentKey (i) {
      return `block-${this.data.time}-${i}`
    }
  }
}
</script>
