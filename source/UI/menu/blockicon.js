import { plugin } from "../../asyncModules.js";
import { copyFontMenu } from './clipBoard/copy.js'
import { pasteFontMenu } from './clipBoard/paste.js'
import { cssNames } from "../utils/cssproperties.js";
plugin.eventBus.on('click-blockicon', (e) => {
    const { detail } = e
    plugin.blockElements = detail.blockElements
    if (Array.from(plugin.blockElements).length === 1) {
        detail.menu.addItem(
            {
                label: "复制样式",
                click: () => {
                    plugin.暂存的css样式字符串 = plugin.blockElements[0].getAttribute('style')
                },
                submenu: copyFontMenu()
            }
        )
        detail.menu.addItem(
            {
                label: "复制样式(计算分配)",
                click: () => {
                    plugin.暂存的css样式字符串 = plugin.blockElements[0].getAttribute('style')
                    cssNames.forEach(style => {
                        
                        plugin[`暂存的css样式`][style]=  window.getComputedStyle(plugin.blockElements[0]).getPropertyValue(style)
                    }
                    )
                },
            }
        )
    }
    detail.menu.addItem(
        {
            label: "打开字体编辑",
            click: () => {
                plugin.打开文字样式编辑对话框()
            }
        },
    )
    detail.menu.addItem(
        {
            label: "黏贴样式",
            click: () => {
                plugin.blockElements.forEach(
                    el => {
                        el.setAttribute('style', plugin.暂存的css样式字符串)
                    }
                )
            },
            submenu: pasteFontMenu()
        },
    )
})
