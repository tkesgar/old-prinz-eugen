<template>
  <div>
    <h1>Edit bio</h1>
    <p v-if="lastBioTime" class="text-muted">Biodata terakhir disimpan pada {{ lastBioTime }}</p>
    <b-card>
      <div id="MainCharaEditBio_editor" />
      <div class="text-right">
        <b-button variant="danger" size="sm" @click="handleDeleteBio">Hapus biografi</b-button>
      </div>
    </b-card>
    <b-button block class="mt-3" @click="handleSubmitBio">Ubah biografi</b-button>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import Delimiter from '@editorjs/delimiter'
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  props: {
    chara: {
      type: Object,
      required: true
    }
  },
  computed: {
    lastBioTime () {
      if (!this.chara.bio) {
        return null
      }

      return new Date(this.chara.bio.time).toLocaleString()
    }
  },
  methods: {
    handleSubmitBio () {
      acall(async () => {
        const output = await this.editor.save()

        const outputJSON = JSON.stringify(output)
        if (outputJSON.length > 65536) {
          alert('Biografi karakter terlalu panjang')
          return
        }

        await request(`chara/${this.chara.id}/bio`, {
          method: 'put',
          json: { bio: output }
        })
        this.$emit('refresh-chara')
      })
    },
    handleDeleteBio () {
      acall(async () => {
        await request(`chara/${this.chara.id}/bio`, {
          method: 'delete'
        })
        this.$emit('refresh-chara')
      })
    }
  },
  watch: {
    chara (newChara) {
      if (newChara.bio) {
        acall(async () => {
          await this.editor.render(newChara.bio || {})
        })
      } else {
        this.editor.clear()
      }
    }
  },
  mounted () {
    this.editor = new EditorJS({
      holder: 'MainCharaEditBio_editor',
      placeholder: 'Tuliskan biografi karakter Anda...',
      tools: {
        'header': Header,
        'list': List,
        'quote': Quote,
        'delimiter': Delimiter,
        'simple-image': SimpleImage,
      },
      data: this.chara.bio || {}
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
