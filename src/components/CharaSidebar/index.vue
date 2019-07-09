<template>
  <b-card no-body>
    <div class="display-name text-center p-1 bg-light">{{ displayName }}</div>
    <b-img fluid-grow v-if="displayImage" :src="displayImage" />
    {{/* TODO info-list bisa jadi komponen sendiri */}}
    <ul class="info-list my-1" v-if="basicInfo.length > 0">
      <li
        v-for="info in basicInfo"
        :key="info.key"
        class="info-entry m-2 my-md-1"
      >
        <b-row>
          <b-col class="info-entry-label" md="5">
            {{ info.label }}
          </b-col>
          <b-col class="info-entry-content" md="7">
            {{ info.content }}
          </b-col>
        </b-row>
      </li>
    </ul>
    <template v-if="appearanceInfo.length > 0">
      <div class="info-title text-center p-1 bg-light">
        Penampilan
      </div>
      <ul class="info-list my-1">
        <li
          v-for="info in appearanceInfo"
          :key="info.key"
          class="info-entry m-2 my-md-1"
        >
          <b-row>
            <b-col class="info-entry-label" md="5">
              {{ info.label }}
            </b-col>
            <b-col class="info-entry-content" md="7">
              <div
                v-if="info.type === 'color'"
                class="p-1"
                :style="{
                  background: info.content,
                  color: getTextColor(info.content)
                }"
              >
                {{ info.content }}
              </div>
              <template v-else>
                {{ info.content }}
              </template>
            </b-col>
          </b-row>
        </li>
      </ul>
    </template>
    <template v-if="proInfo.length > 0">
      <div class="info-title text-center p-1 bg-light">
        Profesi
      </div>
      <ul class="info-list my-1">
        <li
          v-for="info in proInfo"
          :key="info.key"
          class="info-entry m-2 my-md-1"
        >
          <b-row>
            <b-col class="info-entry-label" md="5">
              {{ info.label }}
            </b-col>
            <b-col class="info-entry-content" md="7">
              {{ info.content }}
            </b-col>
          </b-row>
        </li>
      </ul>
    </template>
    <template v-if="favInfo.length > 0">
      <div class="info-title text-center p-1 bg-light">
        Kesukaan
      </div>
      <ul class="info-list my-1">
        <li
          v-for="info in favInfo"
          :key="info.key"
          class="info-entry m-2 my-md-1"
        >
          <b-row>
            <b-col class="info-entry-label" md="5">
              {{ info.label }}
            </b-col>
            <b-col class="info-entry-content" md="7">
              <div
                v-if="info.type === 'color'"
                class="p-1"
                :style="{
                  background: info.content,
                  color: getTextColor(info.content)
                }"
              >
                {{ info.content }}
              </div>
              <template v-else>
                {{ info.content }}
              </template>
            </b-col>
          </b-row>
        </li>
      </ul>
    </template>
  </b-card>
</template>

<script>
import { rgbToHex, hexToRGB } from '../../utils/color'
import { and } from '../../utils'

function appendUnit (value, unit) {
  return typeof value === 'number' ? `${value} ${unit}` : value
}

function getMonthString (month) {
  switch (month) {
    case 1: return 'Januari'
    case 2: return 'Februari'
    case 3: return 'Maret'
    case 4: return 'April'
    case 5: return 'Mei'
    case 6: return 'Juni'
    case 7: return 'Juli'
    case 8: return 'Agustus'
    case 9: return 'September'
    case 10: return 'Oktober'
    case 11: return 'November'
    case 12: return 'Desember'
    default:
      console.warn(`Unsupported month: ${month}`)
      return String(month)
  }
}

function getBirthdayString (date, month) {
  return `${date} ${getMonthString(month)}`
}

function getHoroscopeString (horoscope) {
  switch (horoscope) {
    case 'aries': return 'Aries'
    case 'taurus': return 'Taurus'
    case 'gemini': return 'Gemini'
    case 'cancer': return 'Cancer'
    case 'leo': return 'Leo'
    case 'virgo': return 'Virgo'
    case 'libra': return 'Libra'
    case 'scorpio': return 'Scorpio'
    case 'sagittarius': return 'Sagittarius'
    case 'capricorn': return 'Capricorn'
    case 'aquarius': return 'Aquarius'
    case 'pisces': return 'Pisces'
    default: return horoscope
  }
}

function getGenderString (gender) {
  switch (gender) {
    case 'female': return 'Perempuan'
    case 'male': return 'Laki-laki'
    case 'nongender': return 'Tidak memiliki gender'
    case 'secret': return 'Ra-ha-si-a!'
    case 'hideyoshi': return 'Hideyoshi'
    default: return gender
  }
}

function getHairLengthString (hairLength) {
  switch (hairLength) {
    case 'ear': return 'Setelinga'
    case 'neck': return 'Seleher'
    case 'shoulder': return 'Sebahu'
    case 'chest': return 'Sedada'
    case 'waist': return 'Sepinggang'
    case 'hip': return 'Sepinggul'
    case 'leg': return 'Sekaki'
    case 'floor': return 'Selantai'
    default: return hairLength
  }
}

export default {
  props: {
    chara: {
      type: Object,
      required: true
    },
    profile: {
      type: Object,
      default: () => ({})
    },
    images: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    displayName () {
      const {
        full_name: fullName,
        nick_name: nickName
      } = this.profile

      return nickName || fullName || this.chara.name
    },
    displayImage () {
      const { portrait } = this.images

      return portrait ? portrait.url : null
    },
    basicInfo () {
      const {
        'full_name': fullName,
        'nick_name': nickName,
        'jp_name': jpName,
        'birthday.d': birthdayDate,
        'birthday.m': birthdayMonth,
        age,
        horoscope,
        gender,
        hometown
      } = this.profile

      const list = []

      if (fullName || jpName) {
        list.push({
          key: 'name',
          label: 'Nama',
          content: (fullName && jpName) ? `${fullName} (${jpName})` : (fullName || jpName)
        })
      }

      if (nickName) {
        list.push({
          key: 'nickname',
          label: 'Panggilan',
          content: nickName
        })
      }

      if (age) {
        list.push({
          key: 'age',
          label: 'Usia',
          content: appendUnit(age, 'tahun')
        })
      }

      if (birthdayDate && birthdayMonth) {
        list.push({
          key: 'birthday',
          label: 'Ulang tahun',
          content: getBirthdayString(birthdayDate, birthdayMonth)
        })
      }

      if (horoscope) {
        list.push({
          key: 'horoscope',
          label: 'Horoskop',
          content: getHoroscopeString(horoscope)
        })
      }

      if (gender) {
        list.push({
          key: 'gender',
          label: 'Gender',
          content: getGenderString(gender)
        })
      }

      if (hometown) {
        list.push({
          key: 'hometown',
          label: 'Asal',
          content: hometown
        })
      }

      return list
    },
    appearanceInfo () {
      const {
        'threesizes.b': threesizesB,
        'threesizes.w': threesizesW,
        'threesizes.h': threesizesH,
        'hair_color.r': hairColorR,
        'hair_color.g': hairColorG,
        'hair_color.b': hairColorB,
        'eye_color.r': eyeColorR,
        'eye_color.g': eyeColorG,
        'eye_color.b': eyeColorB,
        'hair_length': hairLength,
        height,
        weight
      } = this.profile

      const list = []

      if (height) {
        list.push({
          key: 'height',
          label: 'Tinggi',
          content: appendUnit(height, 'cm')
        })
      }

      if (weight) {
        list.push({
          key: 'weight',
          label: 'Berat',
          content: appendUnit(weight, 'kg')
        })
      }

      if (and([threesizesB, threesizesW, threesizesH])) {
        list.push({
          key: 'threesizes',
          label: 'Three sizes',
          content: `${threesizesB}-${threesizesW}-${threesizesH}`
        })
      }

      if (and([eyeColorR, eyeColorG, eyeColorB])) {
        list.push({
          key: 'eyecolor',
          type: 'color',
          label: 'Warna mata',
          content: rgbToHex([eyeColorR, eyeColorG, eyeColorB])
        })
      }

      if (and([hairColorR, hairColorG, hairColorB])) {
        list.push({
          key: 'haircolor',
          type: 'color',
          label: 'Warna rambut',
          content: rgbToHex([hairColorR, hairColorG, hairColorB])
        })
      }

      if (hairLength) {
        list.push({
          key: 'hairlength',
          label: 'Panjang rambut',
          content: getHairLengthString(hairLength)
        })
      }

      return list
    },
    proInfo () {
      const {
        skill
      } = this.profile

      const list = []

      if (skill) {
        list.push({
          key: 'skill',
          label: 'Keahlian',
          content: skill
        })
      }

      return list
    },
    favInfo () {
      const {
        hobby,
        'fav_color.r': favColorR,
        'fav_color.g': favColorG,
        'fav_color.b': favColorB
      } = this.profile

      const list = []

      if (and([favColorR, favColorG, favColorB])) {
        list.push({
          key: 'favcolor',
          type: 'color',
          label: 'Warna favorit',
          content: rgbToHex([favColorR, favColorG, favColorB])
        })
      }

      if (hobby) {
        list.push({
          key: 'hobby',
          label: 'Hobi',
          content: hobby
        })
      }

      return list
    }
  },
  methods: {
    getTextColor (colorHex, colorDark = '#212529', colorLight = '#fff') {
      // Diambil dari Bootstrap YIQ
      const YIQ_THRESHOLD = 150
      const [r, g, b] = hexToRGB(colorHex)

      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return yiq >= YIQ_THRESHOLD ? colorDark : colorLight
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.display-name {
  font-size: 1.25rem;
  font-weight: lighter;
  white-space: nowrap;
  overflow: hidden;
}

.info-title {
  font-weight: bolder;

  @include media-breakpoint-up(md) {
    font-size: 0.75rem;
  }
}

.info-list {
  list-style-type: none;
  margin : 0;
  padding: 0;
  text-align: center;

  @include media-breakpoint-up(md) {
    text-align: left;
    font-size: 0.75rem;
  }
}

.info-entry-label {
  font-weight: bolder;
}
</style>
