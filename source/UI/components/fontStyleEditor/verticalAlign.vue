<template>
    <div>
        <button @click="handleChange('top')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignTop"></use>
            </svg>
        </button>
        <button @click="handleChange('middle')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignMiddle"></use>
            </svg>
        </button>
        <button @click="handleChange('bottom')">
            <svg class="b3-menu__icon " style="">
                <use xlink:href="#iconAlignBottom"></use>
            </svg>
        </button>
    </div>
</template>
<script>
import eventBus from "eventBus"
export default {
    methods: {
        handleChange(align) {
            console.log('Text vertical align changed to: ' + align);
            eventBus.emit('css-props-change',{verticalAlign:align})
            // 在这里你可以添加更改文本垂直对齐方式的逻辑
        }
    }
}
</script>