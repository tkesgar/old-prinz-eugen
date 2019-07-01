<template>
  <div>
    <h1>Data</h1>
    <h2>Chara id</h2>
    <p><code>{{ chara.id }}</code></p>
    <h2>Nama</h2>
    <p><code>{{ chara.name }}</code></p>
    <h2>Bio</h2>
    <pre v-if="chara.bio">{{ chara.bio }}</pre>
    <template v-if="charaInfo.length > 0">
      <h1>Info</h1>
      <ul>
        <li v-for="info in charaInfo" :key="info.key">
          <b>{{ info.key }}</b>: {{ info.value }}
        </li>
      </ul>
    </template>
    <template v-if="charaImage.length > 0">
      <h1>Gambar</h1>
      <ul>
        <li v-for="image in charaImage" :key="image.key">
          <b>{{ image.key }}</b>: {{ image.value }}
        </li>
      </ul>
    </template>
    <b-button :to="`/chara/${chara.id}/edit`" v-if="chara.userId === userId" @click="$emit('edit')">Edit karakter</b-button>
  </div>
</template>

<script>
export default {
  props: {
    chara: {
      type: Object,
      required: true
    },
    charaInfo: {
      type: Array,
      default: () => []
    },
    charaImage: {
      type: Array,
      default: () => []
    },
    userId: {
      type: Number,
      default: null
    }
  }
}
</script>
