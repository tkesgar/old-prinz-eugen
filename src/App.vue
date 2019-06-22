<template>
  <div>
    <router-view/>
    <modal-create-chara />
  </div>
</template>

<script>
import ModalCreateChara from './components/ModalCreateChara'

export default {
  components: {
    ModalCreateChara
  }
}
</script>

<style lang="scss">
@import "./styles/main";
</style>
