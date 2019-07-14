<template>
  <b-card>
    <loading-indicator v-if="loading" />
    <template v-else>
      Jumlah like: <b>{{ count }}</b>
      <template v-if="toggleable">
        <b-button block v-if="!isUserLike" @click="handleClickLike" variant="primary">
          Suka
        </b-button>
        <b-button block v-if="isUserLike" @click="handleClickUnlike" variant="primary">
          Tidak suka
        </b-button>
      </template>
    </template>
  </b-card>
</template>

<script>
import LoadingIndicator from '../LoadingIndicator'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  components: {
    LoadingIndicator
  },
  props: {
    charaId: {
      type: Number,
      required: true
    },
    toggleable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: true,
      isUserLike: null,
      count: null
    }
  },
  methods: {
    async fetchLikeData () {
      const { count, isUserLike } = await request(`chara/${this.charaId}/like`)
      this.count = count
      this.isUserLike = isUserLike || null
    },
    handleClickLike () {
      acall(async () => {
        await request(`chara/${this.charaId}/like`, { method: 'POST' })
        this.count += 1
        this.isUserLike = true

        await this.fetchLikeData()
      })
    },
    handleClickUnlike () {
      acall(async () => {
        await request(`chara/${this.charaId}/like`, { method: 'DELETE' })
        this.count -= 1
        this.isUserLike = false

        await this.fetchLikeData()
      })
    }
  },
  mounted () {
    acall(async () => {
      await this.fetchLikeData()
      this.loading = false
    })
  }
}
</script>
