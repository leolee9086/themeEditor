<template>
  <div class="fn__flex fn__flex-column fn__flex-1" v-if="background.type !== 'multi'">
    {{ background.type }}
    <div class="cc-toolbar__divider__vertical"></div>
    <div class="fn__flex fn__flex-1">
      <div class="fn__flex fn__flex-column">
        <input v-if="background.type === 'color'" type="color" v-model="background.color" placeholder="Color"
          title="Enter the color value">
        <template v-if="background.type === 'image'">
          <div class="fn__flex">
            <input ref="imagPathInputter" type="text" v-model="background.image" placeholder="Image URL"
              title="Enter the image URL">
            <span class="block__icon block__icon--show" @click="selectAssetsImage">
              <svg>
                <use xlink:href='#iconMore'></use>
              </svg>
            </span>
          </div>
        </template>
        <select class="b3-select fn__flex-center" v-if="background.type === 'gradient'" v-model="background.image">
          <option v-for="gradient in gradients" :value="gradient.css">
            {{ gradient.name || gradient.id }}
          </option>
        </select>
        <BackgroundPositionInput v-if="background.type !== 'color' && background.position"
          v-model="background.position" />
        <input v-if="background.type !== 'color'" type="text" v-model="background.size" placeholder="Size"
          title="Enter the size value">
      </div>
      <div class="fn__flex fn__flex-column">
        <backgroundRepeat v-if="background && background.type !== 'color'" v-model="background.repeat">
        </backgroundRepeat>
        <select class="b3-select fn__flex-center" v-if="background.type !== 'color'" v-model="background.attachment">
          <option value="scroll">Scroll</option>
          <option value="fixed">Fixed</option>
          <option value="local">Local</option>
        </select>
        <select class="b3-select fn__flex-center" v-if="background.type !== 'color'" v-model="background.origin">
          <option value="padding-box">Padding Box</option>
          <option value="border-box">Border Box</option>
          <option value="content-box">Content Box</option>
        </select>
        <select class="b3-select fn__flex-center" v-if="background.type !== 'color'" v-model="background.clip">
          <option value="border-box">Border Box</option>
          <option value="padding-box">Padding Box</option>
          <option value="content-box">Content Box</option>
          <option value="text">Text</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, reactive, defineEmits } from 'vue';
import BackgroundPositionInput from './backgroundContorllerInputters/BackgroundPositionInput.vue';
import { plugin } from "runtime"
import backgroundRepeat from './backgroundContorllerInputters/repeat.vue'
import { selectAssets } from '../../assetsSelectPannel.js';
const gradients = reactive(plugin.收藏的css渐变);
const imagPathInputter = ref(null)
const props = defineProps(['background', 'index', 'backgrounds']);
const emits = defineEmits(['imagePathChange'])
const background = ref(props.background);
const selectAssetsImage = async (e) => {
  let assetImagePath = await selectAssets()
  if (assetImagePath) {
    imagPathInputter.value.value = `url("${assetImagePath}")`
    background.image = `url("${assetImagePath}")`
    emits("imagePathChange", background.image)
  }
}
watch(() => background.value.repeatX, (newVal, oldVal) => {
  background.value.repeat = `${background.value.repeatX} ${background.value.repeatY}`;
});

watch(() => background.value.repeatY, (newVal, oldVal) => {
  background.value.repeat = `${background.value.repeatX} ${background.value.repeatY}`;
});
</script>