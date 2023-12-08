import { plugin, kernelApi } from "../asyncModules.js";
import { 保存 } from "../utils/files.js";
import './stylesWatcher.js'
import { openStyleDialog as openTextStyle } from "../UI/textStlyleEditor.js";
import { openStyleDialog as openBackgroundStyle } from "../UI/backgroundStyleEditor.js";
import { openStyleDialog as openGradientEditor } from "../UI/gradientEditor.js";
import { isColorDark } from "../UI/utils/colorProcessor.js";
import { hasClosestBlock } from "../utils/DOMFinder.js";
import chroma from '../../static/chroma-js.js'
const { eventBus } = plugin
function camelToKebab(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
Object.defineProperty(plugin, 'blockElements', {
    get: function () {
        try {
            // 获取所有 '.protyle-wysiwyg--select' 元素
            let elements = Array.from(document.querySelectorAll('.protyle-wysiwyg--select'));
            // 如果没有 '.protyle-wysiwyg--select' 元素，那么获取当前光标所在的、满足 hasClosestBlock 条件的元素
            if (elements.length === 0) {
                let activeElement = document.activeElement;
                if (hasClosestBlock(activeElement)) {
                    elements.push(activeElement);
                }
            }
            return elements;
        } catch (e) {
            console.warn(e)
            return []
        }
    }
});
eventBus.on('save-all', 保存)
eventBus.on('css-props-change', (e) => {
    const data = e.detail;
    plugin.blockElements && plugin.blockElements.forEach(element => {
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                let kebabProp = camelToKebab(prop);
                // 替换双引号为单引号
                let value = data[prop].replace(/\"/g, "'");
                element.style.setProperty(kebabProp, value);
                if (prop === 'backgroundColor') {
                        let bgColor = value;
                        if (!bgColor) {
                            // 如果没有指定颜色，计算出同色系但反差足够的颜色
                            bgColor = chroma.random().hex();
                        }
                        let contrastColor = chroma(bgColor).luminance() < 0.5 ? chroma(bgColor).brighten().brighten().hex() : chroma(bgColor).darken().darken().hex();
                        element.style.color = contrastColor;
                }
                let newStyle = (element.getAttribute('style') || "").replace(/\"/g, "'");
                element.setAttribute('style', newStyle);
                kernelApi.setBlockAttrs({
                    id: element.getAttribute("data-node-id"),
                    attrs: { style: element.getAttribute("style") }
                })
            }
        }
    });
})

eventBus.on('css-backgroundImage-add', (e) => {
    const data = e.detail;
    plugin.blockElements && plugin.blockElements.forEach(element => {
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                // 替换双引号为单引号
                let value = data[prop].replace(/\"/g, "'");
                let newStyle = (element.getAttribute('style') || "") + `;background-image:${value}`
                element.setAttribute('style', newStyle);
                kernelApi.setBlockAttrs({
                    id: element.getAttribute("data-node-id"),
                    attrs: { style: element.getAttribute("style") }
                })

            }
        }
    });
})
eventBus.on('clear-style', (e) => {
    const data = e.detail;
    if (data.props === 'all') {
        plugin.blockElements && plugin.blockElements.forEach(element => {
            element.setAttribute('style', "")
            kernelApi.setBlockAttrs({
                id: element.getAttribute("data-node-id"),
                attrs: { style: element.getAttribute("style") }
            })

        });

    }
    if (data.props === 'background') {
        plugin.blockElements && plugin.blockElements.forEach(element => {
            element.style.background = "";
            kernelApi.setBlockAttrs({
                id: element.getAttribute("data-node-id"),
                attrs: { style: element.getAttribute("style") }
            })

        });
    }
    if (data.props === 'font') {
        plugin.blockElements && plugin.blockElements.forEach(element => {
            element.style.font = "";
            element.style.color = "";
            element.style.letterSpacing = "";
            element.style.textDecoration = "";
            kernelApi.setBlockAttrs({
                id: element.getAttribute("data-node-id"),
                attrs: { style: element.getAttribute("style") }
            })

        });
    }
})

eventBus.on('dialog-open-backgroundEditor', (e) => {
    openBackgroundStyle()
})

eventBus.on('dialog-open-gradientEditor', (e) => {
    openGradientEditor()
})
eventBus.on('dialog-open-openTextStyleEditor', (e) => {
    openTextStyle()
})
eventBus.on('save-gradient', (e) => {
    console.log(e)
    plugin.收藏的css渐变.push(e.detail)
})
