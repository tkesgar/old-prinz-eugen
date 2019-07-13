<template>
  <base-card
    v-on="$listeners"
    title="Gender"
    delete-key="gender"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <b-form-select required v-model="gender" :options="genderOptions">
          <template v-slot:first>
            <option disabled :value="null">Pilih jenis kelamin</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group v-if="gender === 'custom'">
        <b-form-input
          required
          v-model="customGender"
          type="text"
        />
      </b-form-group>
      <b-button type="submit">Ubah</b-button>
    </b-form>
  </base-card>
</template>

<script>
import BaseCard from '../BaseMainCharaEditProfileCard'

const GENDER_OPTIONS = {
  female: 'Perempuan',
  male: 'Laki-laki',
  nongender: 'Tidak memiliki gender',
  secret: 'Ra-ha-si-a!',
  hideyoshi: 'Hideyoshi',
  custom: 'Lainnya'
}

export default {
  components: {
    BaseCard
  },
  props: {
    charaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      genderOptions: Object.entries(GENDER_OPTIONS).map(([value, text]) => ({ value, text })),
      gender: (() => {
        const genderFromCharaInfo = this.charaInfo['gender']

        if (typeof this.charaInfo['gender'] === 'undefined') {
          return null
        }

        if (Object.keys(GENDER_OPTIONS).includes(genderFromCharaInfo)) {
          return genderFromCharaInfo
        }

        return 'custom'
      })(),
      customGender: null
    }
  },
  methods: {
    handleSubmit () {
      const gender = this.gender === 'custom' ? this.customGender : this.gender
      this.$emit('change-chara-info', { gender })
    }
  }
}
</script>
