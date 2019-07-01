<template>
  <view-component>
    <div :id="holder" />
  </view-component>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import ViewComponent from './view'

export default {
  components: {
    ViewComponent
  },
  props: {
    holder: {
      type: String,
      default: 'editor'
    }
  },
  mounted () {
    const editor = new EditorJS({
      holder: this.holder,
      onReady: () => this.$emit('editor-ready'),
      onChange: () => this.$emit('editor-change')
    })

    this._editor = editor
  }
}
</script>
