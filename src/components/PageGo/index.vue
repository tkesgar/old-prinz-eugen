<template>
  <base-page-content :showBackButton="false">
    <h1>Menuju link luar</h1>
    <p>Anda telah meng-klik link yang akan mengarahkan Anda keluar dari situs ini:</p>
    <p><b>{{ url }}</b></p>
    <p v-if="isSafe">
      Halaman Anda akan secara otomatis berpindah ke halaman yang dituju dalam 3 detik.
      Anda juga bisa <b-link :href="url">klik di sini</b-link> untuk pindah langsung.
    </p>
    <template v-else>
      <p>
        <i>Hati-hati ketika meng-klik tautan ke halaman lain.</i>
        Untuk keamanan, mohon konfirmasikan bahwa Anda memang ingin pindah ke halaman
        di atas dengan memasukkan nama domain (<b>{{ urlDomain }}</b>) yang Anda tuju.
      </p>
      <form @submit.prevent="handleSubmit">
        <b-form-group>
          <b-form-input required v-model="confirmDomain" type="text" />
        </b-form-group>
        <b-button
          block
          type="submit"
          :disabled="confirmDomain !== urlDomain"
        >
          Ya, saya ingin menuju halaman di {{ urlDomain }}.
        </b-button>
      </form>
    </template>
  </base-page-content>
</template>

<script>
// TODO Ini kalau URL-nya invalid URL jadinya bakal error.
import BasePageContent from '../BasePageContent'
import isSafeURL from '../../utils/safe-url'

export default {
  components: {
    BasePageContent
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      confirmDomain: null
    }
  },
  computed: {
    isSafe () {
      return isSafeURL(this.url)
    },
    urlDomain () {
      return new URL(this.url).hostname
    }
  },
  methods: {
    handleSubmit () {
      window.location.assign(this.url)
    }
  },
  mounted () {
    if (this.isSafe) {
      setTimeout(() => window.location.assign(this.url), 3000)
    }
  }
}
</script>
