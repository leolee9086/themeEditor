<template>
  <div class="preview" ref="preview" :style="backgroundStyle"></div>
</template>
  
<script>
export default {
  props: ['backgrounds'],
  methods: {
    generateBackgroundValue(bg) {
  let color = bg.color ? `linear-gradient(${bg.color}, ${bg.color})` : "";
  let image = bg.image ? `${bg.image} ${bg.position || ""} / ${bg.size || ""} ${bg.repeat || ""}` : "";
  let attachment = bg.attachment || ""; // Add this line
  return [color, image, attachment].filter(Boolean).join(', ');
}

  },
  computed: {
    backgroundStyle() {
      let that = this
      let background = this.backgrounds.map((bg) => { return bg && that.generateBackgroundValue(bg) }).filter(bg => { return bg }).join(', ')
      return {
        background
      }
    },
  },
  watch: {
    backgroundStyle(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$refs.preview.setAttribute('data-backgrounds-json',JSON.stringify(newVal.background))
        this.$emit('backgroundChanged', newVal.background);
      }
    }
  }

}
</script>
<style scoped>
.preview {
  min-width: 300px;
  min-height: 200px;
}
</style>