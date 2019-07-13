<template>
  <base-card
    v-on="$listeners"
    title="Horoskop"
    delete-key="horoscope"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group v-if="birthday">
        <b-form-checkbox v-model="useBirthdayHoroscope" switch>
          Sesuaikan dengan tanggal lahir (<b>{{ signs[signFromBirthday].text }}</b>)
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-select required v-model="horoscope" :options="signsOptions" :disabled="useBirthdayHoroscope">
          <template v-slot:first>
            <option disabled :value="null">Pilih horoskop</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-button type="submit">Ubah</b-button>
    </b-form>
  </base-card>
</template>

<script>
import BaseCard from '../BaseMainCharaEditProfileCard'

const SIGNS = {
  aries: {
    text: 'Aries',
    dateStart: [21, 3],
    dateEnd: [19, 4]
  },
  taurus: {
    text: 'Taurus',
    dateStart: [20, 4],
    dateEnd: [20, 5]
  },
  gemini: {
    text: 'Gemini',
    dateStart: [21, 5],
    dateEnd: [20, 6]
  },
  cancer: {
    text: 'Cancer',
    dateStart: [21, 6],
    dateEnd: [22, 7]
  },
  leo: {
    text: 'Leo',
    dateStart: [23, 7],
    dateEnd: [22, 8]
  },
  virgo: {
    text: 'Virgo',
    dateStart: [23, 8],
    dateEnd: [22, 9]
  },
  libra: {
    text: 'Libra',
    dateStart: [23, 9],
    dateEnd: [22, 10]
  },
  scorpio: {
    text: 'Scorpio',
    dateStart: [23, 10],
    dateEnd: [21, 11]
  },
  sagittarius: {
    text: 'Sagittarius',
    dateStart: [22, 11],
    dateEnd: [21, 12]
  },
  capricorn: {
    text: 'Capricorn',
    dateStart: [22, 12],
    dateEnd: [19, 1]
  },
  aquarius: {
    text: 'Aquarius',
    dateStart: [20, 1],
    dateEnd: [18, 2]
  },
  pisces: {
    text: 'Pisces',
    dateStart: [19, 2],
    dateEnd: [20, 3]
  }
}

function isDateInRange (date, start, end) {
  const [dateD, dateM] = date
  const [startD, startM] = start
  const [endD, endM] = end

  if (dateM === startM) {
    return startD <= dateD
  }

  if (dateM === endM) {
    return dateD <= endD
  }

  return false
}

function getSignFromDate (date) {
  const [sign] = Object.entries(SIGNS)
    .find(([sign, { dateStart, dateEnd }]) => {
      return isDateInRange(date, dateStart, dateEnd)
    })

  return sign
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
      signs: SIGNS,
      horoscope: this.charaInfo['horoscope'],
      useBirthdayHoroscope: (() => {
        if (!this.charaInfo['birthday.d'] || !this.charaInfo['birthday.m']) {
          return false
        }

        const birthday = [this.charaInfo['birthday.d'], this.charaInfo['birthday.m']]
        return this.charaInfo['horoscope'] === getSignFromDate(birthday)
      })()
    }
  },
  computed: {
    birthday () {
      const birthdayDate = this.charaInfo['birthday.d']
      const birthdayMonth = this.charaInfo['birthday.m']

      return birthdayDate && birthdayMonth ? [birthdayDate, birthdayMonth] : null
    },
    signFromBirthday () {
      if (!this.birthday) {
        return null
      }

      const [sign] = Object.entries(SIGNS)
        .find(([sign, { dateStart, dateEnd }]) => {
          return isDateInRange(this.birthday, dateStart, dateEnd)
        })

      return sign
    },
    signsOptions () {
      return Object.entries(SIGNS).map(([value, { text }]) => ({ value, text }))
    }
  },
  watch: {
    useBirthdayHoroscope (newValue) {
      if (newValue) {
        this.horoscope = this.signFromBirthday
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', { 'horoscope': this.horoscope })
    }
  }
}
</script>
