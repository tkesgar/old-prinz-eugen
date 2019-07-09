<template>
  <div>
    <component
      v-for="(block, i) of blocks"
      :key="getComponentKey(i)"
      :is="`block-${block.type}`"
      :data="block.data"
    />
  </div>
</template>

<script>
import BlockParagraph from './block/paragraph'
import BlockHeader from './block/header'
import BlockList from './block/list'
import BlockQuote from './block/quote'
import BlockDelimiter from './block/delimiter'
import BlockSimpleImage from './block/simple-image'

const SUPPORTED_BLOCKS = [
  'paragraph',
  'header',
  'list',
  'quote',
  'delimiter',
  'simple-image'
]

export default {
  components: {
    BlockParagraph,
    BlockHeader,
    BlockList,
    BlockQuote,
    BlockDelimiter,
    BlockSimpleImage
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    blocks () {
      return this.data.blocks
        .filter(block => {
          const { type } = block

          if (!SUPPORTED_BLOCKS.includes(type)) {
            console.warn(`Block '${type}' is not supported; the content will be skipped.`)
            return false
          }

          return true
        })
    }
  },
  methods: {
    getComponentKey (i) {
      return `block-${this.data.time}_${i}`
    }
  }
}
</script>
