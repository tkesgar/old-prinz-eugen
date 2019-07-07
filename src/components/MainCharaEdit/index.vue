<template>
  <b-container class="my-4">
    <div class="mb-3">
      <b-tabs pills>
        <b-tab
          v-for="tab in TABS"
          :key="tab.name"
          :title="tab.title"
          :active="$route.path.endsWith(tab.name)"
          @click="$router.push(tab.name)"
        />
      </b-tabs>
    </div>
    <router-view
      :chara="chara"
      @refresh-chara="$emit('refresh-chara')"
    />
  </b-container>
</template>

<script>
import { getUser } from '../../store'

const TABS = [
  {
    name: 'profile',
    title: 'Profil'
  },
  {
    name: 'images',
    title: 'Gambar'
  },
  {
    name: 'bio',
    title: 'Biografi'
  },
  {
    name: 'delete',
    title: 'Hapus karakter'
  }
]

export default {
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  computed: {
    TABS: () => TABS
  },
  beforeRouteEnter (to, from, next) {
    const user = getUser()

    if (!user) {
      next('/403')
      return
    }

    next(vm => {
      const charaOwnerId = vm.chara.userId
      if (user.id !== charaOwnerId) {
        vm.$router.replace('/403')
      }
    })
  }
}
</script>
