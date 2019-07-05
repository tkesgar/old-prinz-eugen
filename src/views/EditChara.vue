<template>
  <default-layout>
    <main-edit-chara />
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import MainEditChara from '../components/MainEditChara'
import { acall } from '../utils'
import { request } from '../utils/api'
import store from '../store'

export default {
  components: {
    DefaultLayout,
    MainEditChara
  },
  beforeRouteEnter (to, from, next) {
    const { user } = store.state

    if (!user) {
      next('/')
      return
    }

    acall(async () => {
      const { charaId } = to.params
      const chara = await request(`chara/${charaId}`)
      if (chara.userId !== user.id) {
        next('/403')
        return
      }

      next()
    })
  }
}
</script>
