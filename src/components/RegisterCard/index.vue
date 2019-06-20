<template>
  <register-card @register="handleRegister" />
</template>

<script>
import { request, getUser, APIError } from '../../utils/api'
import { acall } from '../../utils'
import RegisterCard from './view'

export default {
  components: {
    RegisterCard
  },
  methods: {
    handleRegister ({ name, email, password, recaptchaToken }) {
      acall(async () => {
        try {
          await request('auth/register', { name, email, password, recaptchaToken })
        } catch (err) {
          if (err instanceof APIError) {
            if (err.code === 'NAME_NOT_AVAILABLE') {
              alert('Nama pengguna yang Anda pilih tidak dapat digunakan. Silakan pilih nama pengguna lain.')
              return
            }

            if (err.code === 'EMAIL_REGISTERED') {
              alert('Alamat email yang Anda pilih sudah dipakai. Mungkin Anda sudah pernah masuk sebelumnya?')
              return
            }

            if (err.code === 'ROUTE_DISABLED') {
              alert('Sistem registrasi lewat email saat ini sedang dimatikan. Silakan masuk dengan menggunakan akun Google.')
              this.$router.push('/login')
              return
            }
          }

          throw err
        }

        alert('Pengguna baru berhasil dibuat.')

        await request('auth/login', { name, password })
        this.$store.commit('setUser', { user: await getUser() })
        this.$router.push('/')
      })
    }
  }
}
</script>
