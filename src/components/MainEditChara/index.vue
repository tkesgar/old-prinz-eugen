<template>
  <b-container class="root my-3">
    <b-row>
      <b-col lg="8" order="2" order-lg="1">
        <div v-if="cards.length > 0" class="card-container">
          <component
            v-for="card of cards"
            :is="`card-${card.name}`"
            :key="card.name"
            :id="`MainEditChara_card-${card.name}`"
            :initial-value="card.initialValue"
            class="card"
            @insert-chara-info="insertCharaInfo"
            @change-chara-info="changeCharaInfo"
            @delete-chara-info="(...keys) => deleteCharaInfoAndCard(keys, card.name)"
          />
        </div>
        <div v-else class="py-5 text-center text-muted">
          Belum ada info untuk karakter Anda.
        </div>
      </b-col>
      <b-col lg="4" order="1" order-lg="2" class="mt-3 mt-lg-0 mb-3">
        <b-card v-if="cards.length > 0" header="Pindah ke info" no-body>
          <b-list-group flush>
            <b-list-group-item
              v-for="card of cards"
              :key="card.name"
              :href="`#MainEditChara_card-${card.name}`"
            >
              {{ card.text }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card v-if="cardOptions.length > 0" header="Tambah info">
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
import CardFullName from './cards/full-name'
import CardNickName from './cards/nick-name'
import CardJpName from './cards/jp-name'
import { acall } from '../../utils'
import { request } from '../../utils/api'

const CARD_DICT = {
  'full-name': {
    text: 'Nama lengkap'
  },
  'nick-name': {
    text: 'Nama panggilan'
  },
  'jp-name': {
    text: 'Nama dalam tulisan Jepang'
  }
}

export default {
  components: {
    CardFullName,
    CardNickName,
    CardJpName
  },
  data () {
    return {
      chara: null,
      charaInfo: null,
      charaImages: null,
      cards: [],
      selectedCardOption: null
    }
  },
  computed: {
    cardOptions () {
      return Object.entries(CARD_DICT)
        .filter(([cardName]) => !this.cards.find(card => card.name === cardName))
        .map(([cardName, cardData]) => {
          return {
            value: cardName,
            text: cardData.text
          }
        })
    }
  },
  methods: {
    insertCard () {
      const name = this.selectedCardOption
      const newCard = CARD_DICT[name]
      if (!newCard) {
        throw new Error(`Unknown card name: ${name}`)
      }

      this.cards.push({ ...newCard, name })
    },
    deleteCard (name) {
      const index = this.cards.findIndex(card => card.name === card)
      this.cards.splice(index, 1)
    },
    insertCharaInfo (manyCharaInfo) {
      acall(async () => {
        const { charaId } = this.$route.params
        await request(`chara/${charaId}/info`, { info: manyCharaInfo })

        this.fetchCharaInfo()
      })
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
              await request(`chara/${charaId}/info/${key}`, { value }, 'put')
            })
          )
        } else {
          await request(`chara/${charaId}/info`, { info: manyCharaInfo })
        }

        this.fetchCharaInfo()
      })
    },
    deleteCharaInfoAndCard (keys, cardName) {
      acall(async () => {
        const { charaId } = this.$route.params

        await Promise.all(keys.map(async key => request(`chara/${charaId}/info/${key}`, undefined, 'delete')))

        this.fetchCharaInfo()

        this.deleteCard(cardName)
      })
    },
    async fetchChara () {
      const { charaId } = this.$route.params
      this.chara = await request(`chara/${charaId}`)
    },
    async fetchCharaInfo () {
      const { charaId } = this.$route.params
      this.charaInfo = await request(`chara/${charaId}/info`)
    },
    async fetchCharaImages () {
      const { charaId } = this.$route.params
      this.charaImages = await request(`chara/${charaId}/image`)
    }
  },
  created () {
    acall([
      async () => this.fetchChara(),
      async () => {
        await this.fetchCharaInfo()

        for (const [key, value] of Object.entries(this.charaInfo)) {
          let card = {}

          switch (key) {
            case 'full_name':
              card.name = 'full-name'
              card.initialValue = value
              break
            case 'nick_name':
              card.name = 'nick-name'
              card.initialValue = value
              break
            case 'jp_name':
              card.name = 'jp-name'
              card.initialValue = value
              break
            default:
              console.warn(`Unsupported chara info key: ${key}`)
              break
          }

          if (card.name) {
            Object.assign(card, CARD_DICT[card.name])
            this.cards.push(card)
          }
        }
      }
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/include";

.card + .card {
  margin-top: $spacer;
}
</style>
