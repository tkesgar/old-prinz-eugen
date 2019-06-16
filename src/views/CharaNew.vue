<template>
  <default-layout>
    <b-container class="my-5">
      <h1 class="pb-2">Buat karakter baru</h1>
      <b-form @submit.prevent="handleSubmit">
        <b-form-group
          label="Nama unik karakter"
          label-for="CharaNew_name"
        >
          <b-form-input
            id="CharaNew_name"
            type="text"
            required
            placeholder="Nama unik karakter"
            pattern="^\w{1,16}$"
          />
          <small class="form-text text-muted">
            Nama karakter hanya terdiri dari huruf, angka, dan garis bawah (_), dengan panjang
            maksimal 16 karakter.
          </small>
        </b-form-group>
        <b-form-row>
          <b-col lg="6">
            <b-form-group
              label="Biodata"
              label-for="CharaNew_bio"
            >
              <small class="form-text text-muted">
                Gunakan sintaks Markdown untuk memformat teks.
              </small>
              <b-form-textarea
                id="CharaNew_bio"
                placeholder="Biodata"
                v-model="bio"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" v-if="hasBio">
            <b-form-group
              label="Tampilan biodata"
            >
              <markdown-renderer class="border border-light p-3" :markdown="bio" />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-button variant="primary" type="submit">Buat karakter baru</b-button>
      </b-form>
    </b-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { request } from '../utils/api'
import { acall } from '../utils'

export default {
  components: {
    DefaultLayout,
    MarkdownRenderer
  },
  data () {
    return {
      bio: ''
    }
  },
  computed: {
    hasBio () {
      return Boolean(this.bio.trim())
    }
  },
  methods: {
    handleSubmit () {
      acall(async () => {
        const name = document.querySelector('#CharaNew_name').value
        const { bio } = this

        await request('chara', { name, bio: bio.trim() || null })

        alert('Karakter berhasil dibuat')

        this.$router.push(`/chara/${name}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/include";

h1 {
  border-bottom: $hr-border-width solid $hr-border-color;
}

#CharaNew_bio {
  font-family: $font-family-monospace;
}
</style>
