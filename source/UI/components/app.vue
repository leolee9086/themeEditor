<template>
    <div class="fn__flex fn__flex-column editor-container">
    <div class="fn__flex">
            <fontFamily></fontFamily>
            <div class="cc-toolbar__divider"></div>

            <fontSize :targets=elements></fontSize>
            <div class="cc-toolbar__divider"></div>
            <letterSpacing :targets=elements></letterSpacing>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
    <div class="fn__flex">
        <fontColor :targets=elements></fontColor>
        <div class="cc-toolbar__divider"></div>
            <textAlign></textAlign>
            <div class="cc-toolbar__divider"></div>
            <textDecoration></textDecoration>
            <DecorationStyle></DecorationStyle>
            <div class="cc-toolbar__divider"></div>
            行高<CssSizeInputter  :modelValue="lineHeight" @update:modelValue="updateLineHeight"></CssSizeInputter>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
</div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import fontColor from './fontStyleEditor/fontColor.vue'
import fontSize from "./fontStyleEditor/fontSize.vue";
import letterSpacing from "./fontStyleEditor/letterSpacing.vue";
import fontFamily from './fontStyleEditor/fontFamily.vue'
import textAlign from './fontStyleEditor/textAlign.vue'
import verticalAlign from './fontStyleEditor/verticalAlign.vue'
import textDecoration from './fontStyleEditor/textDecoration.vue'
import DecorationStyle from './fontStyleEditor/decorationStyle.vue'
import CssSizeInputter from './common/CssSizeInputter.vue'
import eventBus from "eventBus"
const lineHeight = ref('');  // 新增

const { elements } = defineProps(['elements'])
function updateLineHeight(value){
    lineHeight.value = value;

    eventBus.emit('css-props-change',{lineHeight:lineHeight.value}) 

}
</script>
<style>



.fn__size3em {
    max-width: 3.3em
}
.size50{
    max-width: 50px
}
.editor-container{
    padding:10px
}
.editor-button{
    width:28px;
    height:28px
}
.preview {
    border-radius:8px
}
</style>
