<template>
  <b-card :title="title">
    <b-row>
      <b-col md="6">
        <h5>Ubah gambar</h5>
        <b-form @submit.prevent="handleChange">
          <b-form-group>
            <b-input-group>
              <b-form-file required v-model="file" type="image/*" />
              <template v-slot:append>
                <b-button type="submit">Ubah</b-button>
              </template>
            </b-input-group>
          </b-form-group>
          <div class="text-center bg-light">
            <b-img rounded class="image-preview" :src="filePreview" />
          </div>
        </b-form>
      </b-col>
      <b-col md="6" class="text-center">
        <span v-if="!currentImage" class="text-muted">Belum ada gambar untuk karakter ini.</span>
        <template v-else>
          <b-img rounded :class="['image', imageType]" :src="currentImage" />
          <div class="mt-1">
            <b-button size="sm" variant="danger" @click="handleDelete">Hapus</b-button>
          </div>
        </template>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { acall } from '../../utils'
import { request } from '../../utils/api'

export default {
  props: {
    charaId: {
      type: Number,
      required: true
    },
    charaImages: {
      type: Object,
      required: true
    },
    imageType: {
      type: String,
      required: true
    },
    currentImageKey: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      file: null,
      filePreview: null
    }
  },
  computed: {
    currentImage () {
      const image = this.charaImages[this.currentImageKey]
      return image ? image.url : null
    }
  },
  watch: {
    file (newfile) {
      if (this.filePreview) {
        URL.revokeObjectURL(this.filePreview)
      }

      if (newfile === null) {
        this.filePreview = null
        return
      }

      this.filePreview = URL.createObjectURL(newfile)
    }
  },
  methods: {
    handleChange () {
      acall(async () => {
        const formData = new FormData()
        formData.append('image', this.file)

        if (this.charaImages[this.imageType]) {
          await request(`chara/${this.charaId}/image/${this.imageType}`, {
            method: 'put',
            body: formData
          })
        } else {
          formData.append('type', this.imageType)

          await request(`chara/${this.charaId}/image`, {
            method: 'post',
            body: formData
          })
        }

        this.file = null
        this.$emit('chara-image-update')
      })
    },
    handleDelete () {
      acall(async () => {
        await request(`chara/${this.charaId}/image/${this.imageType}`, {
          method: 'delete'
        })

        this.$emit('chara-image-update')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
  width: auto;
  height: auto;

  &.avatar {
    width: 200px;
  }
}

.image-preview {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 300px;
}
</style>
