<template>
  <div class="fn__flex-column fn__flex-1">
    <BackgroundPreview ref="previewer" :backgrounds="backgrounds" @backgroundChanged="handleBackgroundChanged" />
    <div class="cc-toolbar__divider__vertical"></div>
    <div class="background-editor">
      <BackgroundList :backgrounds="backgrounds" />
      <div class="cc-toolbar__divider__vertical"></div>
    </div>
  </div>
</template>
  
<script>
import BackgroundPreview from './backgroundEditor/BackgroundPreview.vue';
import BackgroundList from './backgroundEditor/BackgroundList.vue';
import BackgroundGallery from './backgroundEditor/BackgroundGallery.vue';
import { parseBackgroundLayer } from '../utils/styleFromBlocks.js'
import eventBus from 'eventBus'
let css = `
background: url("assets/色轮1 1-20230929013032-3v30qw6.png") center center / cover no-repeat, linear-gradient(red, red), linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) center center / cover no-repeat, url("https://image.pollinations.ai/prompt/Abstract%20Pattern%202") center center / cover no-repeat, linear-gradient(rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.2)), url("https://image.pollinations.ai/prompt/Abstract%20Pattern%203") center center / cover no-repeat, linear-gradient(rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.2)), url("https://image.pollinations.ai/prompt/Abstract%20Pattern%204") center center / cover no-repeat, linear-gradient(rgba(255, 255, 0, 0.2), rgba(255, 255, 0, 0.2)), url("https://image.pollinations.ai/prompt/Abstract%20Pattern%205") center center / cover no-repeat;  `;
export default {
  components: {
    BackgroundPreview,
    BackgroundList
  },
  //这里之前是用了一个占位的背景样式代替的,之后写完编辑器要写好初始化
  data() {
    return {
      
      backgrounds: [
        {
    type: 'image',
    image: `url('assets/色轮1 1-20230929013032-3v30qw6.png')`,
    position: 'center center',
    positionX: 'center', // 新增
    positionY: 'center', // 新增
    size: 'cover',
    repeat: 'no-repeat',
    repeatX: 'no-repeat', // 新增
    repeatY: 'no-repeat', // 新增
    attachment: 'scroll', // 新增
    origin: 'padding-box', // 新增
    clip: 'border-box', // 新增
  },
  {
    type: 'color',
    position: 'left top',
    size: 'contain',
    repeat: 'repeat-x',
    color:"red"
  },
  {
    type: 'gradient',
    gradient: 'linear',
    image: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat'
  },  {
    type: 'image',
    image: `url('https://image.pollinations.ai/prompt/Abstract%20Pattern%202')`,
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat'
  },
  {
    type: 'color',
    color: 'rgba(0, 255, 0, 0.2)'
  },
  {
    type: 'image',
    image: `url('https://image.pollinations.ai/prompt/Abstract%20Pattern%203')`,
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat'
  },
  {
    type: 'color',
    color: 'rgba(0, 0, 255, 0.2)'
  },
  {
    type: 'image',
    image: `url('https://image.pollinations.ai/prompt/Abstract%20Pattern%204')`,
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat'
  },
  {
    type: 'color',
    color: 'rgba(255, 255, 0, 0.2)'
  },
  {
    type: 'image',
    image: `url('https://image.pollinations.ai/prompt/Abstract%20Pattern%205')`,
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat'
  },
]
    }
  },
  methods: {
    handleBackgroundChanged(background) {
      //不是元素,不能直接setAttribute
      eventBus.emit('css-props-change', { background: background })
    }
  }
}
</script>
<style>
.background-editor {
  max-height: 80vh;
  overflow: scroll
}
</style>