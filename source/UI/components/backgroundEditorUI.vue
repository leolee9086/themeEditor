<template>
    <div class="fn__flex fn__flex-column editor-container">
      <!-- <div>
            <div style="width:100px;height:100px">
                <ccGradientGallery :gradients="收藏的css渐变"></ccGradientGallery>
            </div>
        </div>
        <div class="cc-toolbar__divider__vertical"></div>
        <ccGradientSetter></ccGradientSetter>--> 
        <BackgroundLayersEditor></BackgroundLayersEditor>
    </div>
</template>
<script setup>
import ccGradientSetter from "./cc-gradient-setter.vue"
import ccGradientGallery from "./gradient-editor/gradient-gallery.vue"
import {plugin}  from "runtime"
import { ref } from 'vue';
import BackgroundLayersEditor from "./backgroundLayersEditor.vue"
const 收藏的css渐变 = ref(plugin.收藏的css渐变);
</script>
<style>
.preview {
    border-radius:8px
}
.preview-small {
  width: 200px;
  height: 200px;
  min-width: 100px;
  min-height: 100px;
  border-radius:4px
}
</style>
