<template>
  <b-container class="my-4">
    <div class="mb-3">
      <b-tabs pills>
        <b-tab
          title="← Kembali"
          :active="false"
          @click="goToCharaPage"
        />
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
      @refresh="$emit('refresh')"
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
  methods: {
    goToCharaPage () {
      this.$router.push(`/chara/${this.chara.id}`)
    }
  },
  beforeRouteEnter (to, from, next) {
    const user = getUser()
    console.log(to)

    if (!user) {
      next(`/401?next=${to.path}`)
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
