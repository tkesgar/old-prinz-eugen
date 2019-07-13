<template>
  <base-card
    v-on="$listeners"
    title="Tanggal lahir"
    :delete-key="['birthday.d', 'birthday.m']"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-row>
        <b-col>
          <b-form-group
            label="Tanggal"
            label-for="MainEditChara_birthdayDate"
          >
            <b-form-input
              required
              v-model.number="birthdayDate"
              type="number"
              id="MainEditChara_birthdayDate"
              min="1"
              :max="maxDateFromMonth"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Bulan"
            label-for="MainEditChara_birthdayMonth"
          >
            <b-form-input
              required
              v-model.number="birthdayMonth"
              type="number"
              id="MainEditChara_birthdayMonth"
              min="1"
              max="12"
            />
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-button type="submit">Ubah</b-button>
    </b-form>
  </base-card>
</template>

<script>
import BaseCard from '../BaseMainCharaEditProfileCard'

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
      birthdayDate: this.charaInfo['birthday.d'] || new Date().getDate(),
      birthdayMonth: this.charaInfo['birthday.m'] || (new Date().getMonth() + 1)
    }
  },
  computed: {
    maxDateFromMonth () {
      switch (this.birthdayMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31
        case 4:
        case 6:
        case 9:
        case 11:
          return 30
        case 2:
          return 29
        default:
          throw new Error(`Unknown birthday month: ${this.birthdayMonth}`)
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('change-chara-info', {
        'birthday.d': this.birthdayDate,
        'birthday.m': this.birthdayMonth
      })
    }
  }
}
</script>
