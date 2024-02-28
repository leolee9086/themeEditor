<template>
    <div class="block__icons">
        <div class="block__logo">
            <svg class="block__logoicon">
                <use xlink:href="#iconThemeEditor"></use>
            </svg>
            文字样式设置
        </div>
        <div class="fn__space fn__flex-1"></div>
        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W"><svg
                class="block__logoicon">
                <use xlink:href="#iconMin"></use>
            </svg></span>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
    <div class="fn__flex" style="width:100%;padding:0">
        <textStylePanel></textStylePanel>
    </div>
<!--
    <div class="block__icons">
        <div class="block__logo">
            <svg class="block__logoicon">
                <use xlink:href="#iconThemeEditor"></use>
            </svg>
            块样式转换
        </div>
        <div class="fn__space fn__flex-1"></div>
        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W">
            <svg class="block__logoicon">
                <use xlink:href="#iconMin"></use>
            </svg>
        </span>
    </div>

    <div class="cc-toolbar__divider__vertical"></div>
    <blockConverter></blockConverter>
    <div class="cc-toolbar__divider__vertical"></div>

    <div>
        <div class="block__icons">
            <div class="block__logo">
                <svg class="block__logoicon">
                    <use xlink:href="#iconThemeEditor"></use>
                </svg>
                背景
            </div>
            <div class="fn__space fn__flex-1"></div>
            <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W">
                <svg class="block__logoicon">
                    <use xlink:href="#iconMin"></use>
                </svg>
            </span>
        </div>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>

    <div>
        <div class="block__icons">
            <div class="block__logo">
                <svg class="block__logoicon">
                    <use xlink:href="#iconThemeEditor"></use>
                </svg>
                边框
            </div>
            <div class="fn__space fn__flex-1"></div>
            <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W">
                <svg class="block__logoicon">
                    <use xlink:href="#iconMin"></use>
                </svg>
            </span>
        </div>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
    <div>
        <div class="block__icons">
            <div class="block__logo">
                <svg class="block__logoicon">
                    <use xlink:href="#iconThemeEditor"></use>
                </svg>
                阴影
            </div>
            <div class="fn__space fn__flex-1"></div>
            <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W">
                <svg class="block__logoicon">
                    <use xlink:href="#iconMin"></use>
                </svg>
            </span>
        </div>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
    -->
    <div>
        <div class="block__icons">
            <div class="block__logo">
                <svg class="block__logoicon">
                    <use xlink:href="#iconThemeEditor"></use>
                </svg>
                块主题
            </div>
            <div class="fn__space fn__flex-1"></div>
            <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W">
                <svg class="block__logoicon">
                    <use xlink:href="#iconMin"></use>
                </svg>
            </span>

            <span class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W" @click="reFreshBlockThemes">
                <svg class="block__logoicon">
                    <use xlink:href="#iconRefresh"></use>
                </svg>
            </span>
        </div>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
    <div class="fn__flex b3-cards">
        <template v-for="blockTheme in blockThemes">
            <div class="b3-card b3-tooltips b3-tooltips__sw" 
:aria-label="`
来自块${blockTheme.id}
${blockTheme.themeName}
右键打开定义块
左键应用
`">
                <div class="mini-block-theme-preview" :data-theme-id="blockTheme.id"
                    @click.right.prevent.stop="openBlock(blockTheme.id)"
                    @click.prevent.stop="changeCurrentBlockTheme(blockTheme.themeName)">
                    <div v-html="cssHTMLString"></div>
                </div>
            </div>
        </template>
    </div>
    <div class="cc-toolbar__divider__vertical"></div>
</template>
<script setup>
import { ref } from 'vue'
import { clientApi, plugin } from '../../asyncModules.js'
import textStylePanel from './text-style-setter.vue'
import blockConverter from './blockConverter/block-Converter.vue'
import { findThemeBlocks, parseThemeBlocks, cssHTMLString } from '../../utils/blockTheme/index.js'
let blockThemes = ref([])
const reFreshBlockThemes = () => {
    let blocks = findThemeBlocks()
    blockThemes.value.length = 0
    document.querySelectorAll('style.custom-block-theme').forEach(
        Element => {
            Element.remove()
        }
    )
    blocks.forEach(
        blockInfo => {
            blockInfo.cssString = (parseThemeBlocks(blockInfo.markdown))
            blockInfo.themeName = blockInfo.name || '块主题-' + blockInfo.id
            blockThemes.value.push(blockInfo)
            // Create a style element and set its content to the cssString
            const styleEl = document.createElement('style');
            styleEl.classList.add("custom-block-theme")
            styleEl.textContent = `
[custom-theme="${blockInfo.themeName}"],[data-theme-id="${blockInfo.id}"]{${blockInfo.cssString}}
`
            // Append the style element to the head of the document
            document.head.appendChild(styleEl);
        }
    )

}
reFreshBlockThemes()
const openBlock = (id) => {
    clientApi.openTab({
        app: plugin.app,
        doc: {
            id,
        }
    })
}
const changeCurrentBlockTheme = (themeName) => {
    plugin.eventBus.emit('current-block-theme-change', themeName)
}
</script>
<style scoped>
.editor-container {
    min-width:calc (100% - 10px)
}

.mini-block-theme-preview {
    background-color: var(--b3-theme-background);
    display: flex;
    width: calc(491px * 0.2);
    height: calc(850px * 0.2);
    overflow: hidden;
}

.mini-block-theme-preview>div {
    transform: scale(0.2);
    transform-origin: left top;
    top: 0%;
    left: 0%;
    min-width: 500%;
    padding: 0% !important;
    z-index: 0;
}
</style>