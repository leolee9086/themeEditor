<template>
    <div>
        <button class="editor-button" @click="handleChange('left')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignLeft"></use>
            </svg>
        </button>
        <button class="editor-button" @click="handleChange('center')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignCenter"></use>
            </svg>
        </button>
        <button class="editor-button" @click="handleChange('right')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignRight"></use>
            </svg>
        </button>
        <button class="editor-button" @click="handleChange('justify')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconMenu"></use>
            </svg>
        </button>
    </div>
</template>
<script>
import eventBus from "eventBus"
export default {
    methods: {
        handleChange(align) {
            console.log('Text align changed to: ' + align);
            eventBus.emit('css-props-change',{textAlign:align})
            // 在这里你可以添加更改文本对齐方式的逻辑
        }
    }
}
</script>