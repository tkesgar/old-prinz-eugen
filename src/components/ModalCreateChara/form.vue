<template>
  <b-form @submit.prevent="submitForm">
    <b-form-group
      label="Nama karakter"
      label-for="CreateCharaModal_fullName"
    >
      <b-form-input
        id="CreateCharaModal_fullName"
        v-model="fullName"
        type="text"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="Nama panggilan karakter"
      label-for="CreateCharaModal_nickName"
    >
      <b-form-input
        id="CreateCharaModal_nickName"
        v-model="nickName"
        type="text"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="Nama halaman karakter"
      label-for="CreateCharaModal_name"
      description="Nama halaman hanya boleh terdiri dari huruf, angka, dan garis bawah."
    >
      <b-form-input
        id="CreateCharaModal_name"
        v-model="name"
        type="text"
        pattern="^\w+$"
        maxlength="16"
        required
      ></b-form-input>
    </b-form-group>
    {{/* FIXME Submit buttonnya nggak bisa pakai attribute form, jadinya diletakin di sini */}}
    <b-button block type="submit" variant="primary">Buat karakter baru</b-button>
  </b-form>
</template>

<script>
function shouldAutoChange (val, autoVal) {
  return val.trim().length === 0 || autoVal.startsWith(val)
}

function toNickName (str) {
  return str.trim().split(/\s+/)[0]
}

function toName (str) {
  return str.toLowerCase().split(/[^\w]+/g).join('_').slice(0, 16)
}

export default {
  data () {
    return {
      name: '',
      fullName: '',
      nickName: ''
    }
  },
  methods: {
    submitForm () {
      this.$emit('submit', {
        name: this.name,
        fullName: this.fullName,
        nickName: this.nickName
      })
    },
    reset () {
      this.name = ''
      this.fullName = ''
      this.nickName = ''
    }
  },
  watch: {
    fullName (newFullName) {
      const autoNickName = toNickName(newFullName)
      const autoName = toName(newFullName)

      if (shouldAutoChange(this.nickName, autoNickName)) {
        this.nickName = autoNickName
      }

      if (shouldAutoChange(this.name, autoName)) {
        this.name = autoName
      }
    }
  }
}
</script>
