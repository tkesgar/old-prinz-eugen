<template>
  <b-navbar type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/">
        Prinz Eugen <sup>alpha</sup>
      </b-navbar-brand>
      <b-navbar-nav v-if="user">
        <b-nav-item-dropdown left>
          <template slot="button-content">Buat</template>
          <b-dropdown-item to="/chara/new">Karakter baru</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <div class="ml-auto">
        <template v-if="user">
          <b-navbar-nav>
            <b-nav-item-dropdown right>
              <template slot="button-content">{{ user.displayName }}</template>
              <b-dropdown-item @click="$emit('logout')">Keluar</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav>
            <b-nav-item to="/login">Masuk</b-nav-item>
            <b-nav-item to="/register">Daftar</b-nav-item>
          </b-navbar-nav>
        </template>
      </div>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
