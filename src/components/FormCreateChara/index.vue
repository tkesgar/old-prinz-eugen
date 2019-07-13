<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group
      label="Nama karakter"
      label-for="FormCreateChara_fullName"
    >
      <b-form-input
        id="FormCreateChara_fullName"
        v-model.trim="fullName"
        type="text"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="Nama panggilan karakter"
      label-for="FormCreateChara_nickName"
    >
      <b-form-input
        id="FormCreateChara_nickName"
        v-model.trim="nickName"
        type="text"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="Nama halaman karakter"
      label-for="FormCreateChara_name"
      description="Nama halaman hanya boleh terdiri dari huruf, angka, dan garis bawah."
    >
      <b-form-input
        id="FormCreateChara_name"
        v-model.trim="name"
        type="text"
        pattern="^\w+$"
        maxlength="16"
        required
      ></b-form-input>
    </b-form-group>
    <b-button block type="submit" variant="primary">Buat karakter baru</b-button>
  </b-form>
</template>

<script>
function shouldAutoChange (val, autoVal) {
  return val.length === 0 || autoVal.startsWith(val)
}

function toName (str) {
  return str.toLowerCase().split(/[^\w]+/g).join('_').slice(0, 16)
}

function toNickName (str) {
  return str.split(/\s+/).shift()
}

export default {
  data () {
    return {
      name: null,
      fullName: null,
      nickName: null
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('submit', {
        name: this.name,
        fullName: this.fullName,
        nickName: this.nickName
      })
    },
    reset () {
      this.name = null
      this.fullName = null
      this.nickName = null
    }
  },
  watch: {
    fullName (newFullName) {
      const autoNickName = toNickName(newFullName)
      if (shouldAutoChange(this.nickName, autoNickName)) {
        this.nickName = autoNickName
      }

      const autoName = toName(newFullName)
      if (shouldAutoChange(this.name, autoName)) {
        this.name = autoName
      }
    }
  }
}
</script>
