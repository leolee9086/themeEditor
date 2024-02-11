<!-- BackgroundPreview.vue -->
<template>
  <div class="preview-small" @mouseover="show = true" @mouseleave="show = false"
    :style="{ background: generateBackgroundValue(background) }">
    <div class="slot container">
      <slot v-if="show" name="custom-content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      show: false
    }
  },
  props: ['background', 'index', 'backgrounds'],
  methods: {
    generateBackgroundValue(bg) {
      let color = bg.color ? `linear-gradient(${bg.color}, ${bg.color})` : "";
      let image = bg.image ? `${bg.image} ${bg.position || ""} / ${bg.size || ""} ${bg.repeat || ""}` : "";
      return [color, image].filter(Boolean).join(', ');
    }


  }
}
</script>
<style>
.slot.container {
  width: 200px;
  height: 200px;
  position: relative
}
</style>

