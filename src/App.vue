<template>
  <div>
    <router-view/>
    <create-chara-modal />
  </div>
</template>

<script>
import CreateCharaModal from './components/CreateCharaModal'

export default {
  components: {
    CreateCharaModal
  }
}
</script>

<style lang="scss">
@import "./styles/main";
</style>
