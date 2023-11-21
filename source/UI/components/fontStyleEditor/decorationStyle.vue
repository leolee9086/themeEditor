<template>
  <div style="width:100%;max-width:10em" class="styEditorButton b3-tooltips b3-tooltips__e fn__flex">
    <select class="b3-select fn__flex-center" v-model="textDecorationStyle.value" :style="'width:100%;max-width:5em;'"
      ref='selector' @change="handleChange">
      <option v-for="item in textDecorationStyleOptions" :key="item" :label="item" :value="item"
        :style="'float:left;' + genStyle(item)">
        <span>{{ item }}</span>
      </option>
    </select>
    <button class="cc-font-color-previewer editor-button" ref="colorButton">
      <strong>--</strong>
    </button>
  </div>
</template>
<script setup>
import eventBus from "eventBus"
import { ref,onMounted } from "vue"
import Pickr from 'pickr'
import {plugin} from 'runtime'

const selector = ref()
const colorButton = ref()
let textDecorationColor=ref({ value: "" })
function createPickr(el, defaultColor, onChange) {
  const pickr = Pickr.create({
    el,
    theme: 'classic',
    default: defaultColor,
    useAsButton: true,
    inline: false,
    components: {
      preview: false,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true
      }
    }
  });

  pickr.on('change', onChange);
  plugin.pickrs.push(pickr)
  return pickr;
}
onMounted(
 ()=>{
   let _pickr= createPickr(colorButton.value, 'defaultColor', ()=>{},)
   _pickr.on('change', color => {
    textDecorationColor.value = color.toHEXA().toString();
    colorButton.value.style.color=textDecorationColor.value
      eventBus.emit('css-props-change',{textDecorationColor:textDecorationColor.value}) 
    });
   
 }
)
const textDecorationStyle = ref({ value: "" })
const textDecorationStyleOptions = ["none", "solid", "double", "dashed", "dotted", "wavy", "default"]
const handleChange = () => {
  selector.value.style.textDecorationStyle = textDecorationStyle.value
  eventBus.emit('css-props-change', { textDecorationStyle: textDecorationStyle.value.value })
}
const genStyle = (fontFamily) => {
  return `text-decoration-line:"${textDecorationStyle}"`
}
</script>