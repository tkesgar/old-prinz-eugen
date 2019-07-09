<template>
  <b-card class="login-card mx-auto my-5">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-input
          required
          v-model="email"
          type="email"
          placeholder="Email pengguna"
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          required
          v-model="password"
          type="password"
          placeholder="Kata sandi"
        />
      </b-form-group>
      <b-button block type="submit">Masuk</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    handleSubmit () {
      acall(async () => {
        await request('auth/login', {
          method: 'post',
          json: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('/_callback?action=auth')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

:root {
  background: $light;
}

.login-card {
  max-width: 400px;
}
</style>
