<template>
  <figure class="figure w-100 text-center" :class="{ 'figure-stretched': stretched }">
    <div :class="{ 'bg-light': withBackground, 'border-secondary': withBorder }">
      <img
        class="figure-img img-fluid img-height-viewport"
        :class="{ 'img-stretched': stretched }"
        :src="url"
        :alt="alt"
      />
    </div>
    <figcaption v-if="caption" class="figure-caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    url () {
      return this.data.url
    },
    caption () {
      return this.data.caption
    },
    withBorder () {
      return this.data.withBorder
    },
    withBackground () {
      return this.data.withBackground
    },
    stretched () {
      return this.data.stretched
    },
    alt () {
      return this.caption || null
    }
  }
}
</script>

<style lang="scss" scoped>
.img-height-viewport {
  max-height: 100vh;
}

.figure-stretched {
  width: 100%;
}

.img-stretched {
  width: 100%;
  height: auto;
  max-height: unset;
}
</style>
