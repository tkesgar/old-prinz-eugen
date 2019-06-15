<template>
  <b-card
    title="Masuk"
    class="login-card mx-auto"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        label-for="LoginCard_name"
        label="Nama pengguna"
      >
        <b-form-input
          id="LoginCard_name"
          type="text"
          required
          placeholder="Nama pengguna"
          pattern="^\w{1,16}$"
        />
      </b-form-group>
      <b-form-group
        label-for="LoginCard_password"
        label="Kata sandi"
      >
        <b-form-input
          id="LoginCard_password"
          type="password"
          required
          placeholder="Kata sandi"
        />
      </b-form-group>
      <b-button type="submit" block>Masuk</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  methods: {
    handleSubmit () {
      const name = document.querySelector('#LoginCard_name').value
      const password = document.querySelector('#LoginCard_password').value

      this.$emit('login', { name, password })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  max-width: 480px;
}
</style>
