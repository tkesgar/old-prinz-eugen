<template>
  <b-container class="root my-3">
    <loading-indicator class="py-5" v-if="!charaInfo" />
    <b-row v-else>
      <b-col md="8" lg="9" order="2" order-md="1">
        <div v-if="cards.length > 0" class="card-container card-columns">
          <component
            v-for="card in cards"
            :is="`card-${card}`"
            :key="card"
            :id="`MainEditChara_card-${card}`"
            :chara-info="charaInfo"
            @change-chara-info="changeCharaInfo"
            @delete-chara-info="keys => deleteCharaInfo(keys, card)"
          />
        </div>
        <div v-else class="py-5 text-center text-muted">
          Belum ada info untuk karakter Anda.
        </div>
      </b-col>
      <b-col md="4" lg="3" order="1" order-md="2" class="my-3 mt-md-0">
        <b-card v-if="cards.length > 0" header="Pindah ke info" no-body>
          <b-list-group flush>
            <b-list-group-item
              v-for="card in cards"
              :key="card"
              :href="`#MainEditChara_card-${card}`"
            >
              {{ getCardText(card) }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card v-if="cardOptions.length > 0" header="Tambah info" class="mt-3">
          <b-form @submit.prevent="insertCard">
            <b-form-group>
              <b-form-select required v-model="selectedCardOption" :options="cardOptions" />
            </b-form-group>
            <b-button block type="submit">Tambah</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'
import LoadingIndicator from '../LoadingIndicator'
import CardFullName from './cards/full-name'
import CardNickName from './cards/nick-name'
import CardJpName from './cards/jp-name'
import CardThreeSizes from './cards/three-sizes'
import CardHeight from './cards/height'
import CardWeight from './cards/weight'
import CardHairColor from './cards/hair-color'
import CardEyeColor from './cards/eye-color'
import CardFavColor from './cards/fav-color'
import CardGender from './cards/gender'
import CardHairLength from './cards/hair-length'
import CardAge from './cards/age'
import CardBirthday from './cards/birthday'
import CardHoroscope from './cards/horoscope'
import CardHometown from './cards/hometown'
import CardSkill from './cards/skill'
import CardHobby from './cards/hobby'

const CARDS = {
  'full-name': {
    text: 'Nama lengkap'
  },
  'nick-name': {
    text: 'Nama panggilan'
  },
  'jp-name': {
    text: 'Nama Jepang'
  },
  'three-sizes': {
    text: 'Three sizes (B-W-H)'
  },
  'height': {
    text: 'Tinggi badan'
  },
  'weight': {
    text: 'Berat badan'
  },
  'hair-color': {
    text: 'Warna rambut'
  },
  'eye-color': {
    text: 'Warna mata'
  },
  'fav-color': {
    text: 'Warna kesukaan'
  },
  'gender': {
    text: 'Gender'
  },
  'hair-length': {
    text: 'Panjang rambut'
  },
  'age': {
    text: 'Usia'
  },
  'birthday': {
    text: 'Ulang tahun'
  },
  'horoscope': {
    text: 'Horoskop'
  },
  'hometown': {
    text: 'Asal'
  },
  'skill': {
    text: 'Keahlian'
  },
  'hobby': {
    text: 'Hobi'
  }
}

function mapInfoKeysToCardName (keys) {
  return keys
    .map(key => {
      switch (key) {
        case 'full_name':
        case 'nick_name':
        case 'jp_name':
        case 'height':
        case 'weight':
        case 'gender':
        case 'hair_length':
        case 'age':
        case 'horoscope':
        case 'hometown':
        case 'skill':
        case 'hobby':
          return key.replace('_', '-')
        // Ini kalau info group yang lainnya diskip, cuma pilih salah satu.
        // Asumsinya dari API dijamin bersih (pasti segrup ada semua).
        case 'threesizes.b': return
        case 'threesizes.w': return
        case 'threesizes.h':
          return 'three-sizes'
        case 'hair_color.r': return
        case 'hair_color.g': return
        case 'hair_color.b':
          return 'hair-color'
        case 'eye_color.r': return
        case 'eye_color.g': return
        case 'eye_color.b':
          return 'eye-color'
        case 'fav_color.r': return
        case 'fav_color.g': return
        case 'fav_color.b':
          return 'fav-color'
        case 'birthday.d': return
        case 'birthday.m':
          return 'birthday'
        default:
          console.warn(`Unsupported chara info key: ${key}`)
      }
    })
    // Filter nilai undefined
    .filter(key => key)
}

export default {
  components: {
    LoadingIndicator,
    CardFullName,
    CardNickName,
    CardJpName,
    CardThreeSizes,
    CardHeight,
    CardWeight,
    CardHairColor,
    CardEyeColor,
    CardFavColor,
    CardGender,
    CardHairLength,
    CardAge,
    CardBirthday,
    CardHoroscope,
    CardHometown,
    CardSkill,
    CardHobby
  },
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      charaInfo: null,
      newCards: [],
      selectedCardOption: null
    }
  },
  computed: {
    cardOptions () {
      return Object.entries(CARDS)
        .filter(([name]) => !this.cards.includes(name))
        .map(([value, { text }]) => ({ value, text }))
    },
    charaInfoCards () {
      return mapInfoKeysToCardName(Object.keys(this.charaInfo))
    },
    cards () {
      return [...new Set([...this.charaInfoCards, ...this.newCards])]
    }
  },
  methods: {
    insertCard () {
      this.newCards.push(this.selectedCardOption)
    },
    changeCharaInfo (manyCharaInfo) {
      acall(async () => {
        const { charaId } = this.$route.params

        // Asumsi card perilakunya baik, jadi cuma periksa key pertama
        const [key] = Object.keys(manyCharaInfo)
        const existingCharaInfo = Boolean(this.charaInfo[key])

        if (existingCharaInfo) {
          await Promise.all(
            Object.entries(manyCharaInfo).map(async ([key, value]) => {
              await request(`chara/${charaId}/info/${key}`, {
                method: 'put',
                json: { value }
              })
            })
          )
        } else {
          await request(`chara/${charaId}/info`, {
            method: 'post',
            json: { info: manyCharaInfo }
          })
        }

        await this.fetchCharaInfo()

        this.newCards = this.newCards.filter(newCard => !this.charaInfoCards.includes(newCard))
      })
    },
    deleteCharaInfo (keyOrKeys, cardName) {
      acall(async () => {
        const { charaId } = this.$route.params

        if (Array.isArray(keyOrKeys)) {
          const keys = keyOrKeys
          await request(`chara/${charaId}/info`, {
            method: 'delete',
            json: { keys }
          })
        } else {
          const key = keyOrKeys
          if (typeof this.charaInfo[key] !== 'undefined') {
            await request(`chara/${charaId}/info/${key}`, {
              method: 'delete'
            })
          }
        }

        await this.fetchCharaInfo()
      })
    },
    getCardText (card) {
      return CARDS[card].text
    },
    async fetchCharaInfo () {
      this.charaInfo = await request(`chara/${this.chara.id}/info`)
    }
  },
  created () {
    acall(this.fetchCharaInfo())
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.card-columns {
  @include media-breakpoint-only(xs) { column-count: 1; }
  @include media-breakpoint-only(sm) { column-count: 1; }
  @include media-breakpoint-only(md) { column-count: 1; }
  @include media-breakpoint-only(lg) { column-count: 2; }
  @include media-breakpoint-only(xl) { column-count: 2; }
}
</style>
