<template>
  <b-navbar type="light" variant="light">
    <b-navbar-brand to="/">
      CharaDB<sup>alpha</sup>
    </b-navbar-brand>
    <b-navbar-nav v-if="user">
      <b-nav-item-dropdown left>
        <template slot="button-content">Buat</template>
        <b-dropdown-item @click="handleClickCreateChara">Karakter baru</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <div class="ml-auto">
      <template v-if="user">
        <b-navbar-nav>
          <b-nav-item-dropdown right>
            <template slot="button-content">{{ user.displayName }}</template>
            <b-dropdown-item @click="handleClickLogout">Keluar</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav>
          <b-nav-item :href="loginURL">Masuk</b-nav-item>
        </b-navbar-nav>
      </template>
    </div>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { request, apiUrl } from '../../utils/api'
import { acall } from '../../utils'

export default {
  data () {
    return {
      apiUrl
    }
  },
  computed: {
    ...mapState(['user']),
    loginURL () {
      return `${this.apiUrl}/auth/google`
    }
  },
  methods: {
    handleClickLogout () {
      acall(async () => {
        await request('auth/logout')

        this.$store.commit('setUser', null)
        this.$router.push('/')
      })
    },
    handleClickCreateChara () {
      this.$bvModal.show('ModalCreateChara')
    }
  }
}
</script>
