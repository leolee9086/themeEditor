import { plugin } from "../../asyncModules.js";
import { copyFontMenu } from './clipBoard/copy.js'
import { pasteFontMenu } from './clipBoard/paste.js'
import { cssNames } from "../utils/cssproperties.js";
plugin.eventBus.on('click-blockicon', (e) => {
    const { detail } = e
    if (Array.from(plugin.blockElements).length === 1) {

        detail.menu.addItem(
            {
                label: "捕获样式(计算分配)",
                click: () => {
                    plugin.暂存的css样式字符串 = plugin.blockElements[0].getAttribute('style')
                    cssNames.forEach(style => {
                        
                        plugin[`暂存的css样式`][style]=  window.getComputedStyle(plugin.blockElements[0]).getPropertyValue(style)
                    }
                    )
                },
            }
        )
        detail.menu.addItem(
            {
                label: "复制样式(内联)",
                click: () => {
                    plugin.暂存的css样式字符串 = plugin.blockElements[0].getAttribute('style')
                    const element = plugin.blockElements[0];
                    let stylesToCopy = '';
                    if (element && element.getAttribute('style')) {
                        // 获取元素的style属性
                        const styleObj = element.style;
                        cssNames.forEach(styleName => {
                            // 使用getPropertyValue来获取连字符形式的CSS属性值
                            const value = styleObj.getPropertyValue(styleName);
                            plugin[`暂存的css样式`][styleName]=value
                        });
                    }
            
                },
            }
        )
        detail.menu.addItem(
            {
                label:"将内联样式应用到块属性",
                click:()=>{
                    const element = plugin.blockElements[0];
                    const customAttributes = {};
                    
                    // 遍历元素的所有属性
                    for (let attr of element.attributes) {
                        // 检查属性名是否以'custom-'开头
                        if (attr.name.startsWith('custom-')) {
                            // 将符合条件的属性名和值存储到customAttributes对象中
                            customAttributes[attr.name] = attr.value;
                        }
                    }
                    console.log(customAttributes)
                }
            }
        )
    }
    detail.menu.addItem(
        {
            label: "打开字体编辑",
            click: () => {
                plugin.eventBus.emit('dialog-open-openTextStyleEditor',{})
            }
        },
    )
    detail.menu.addItem(
        {
            label: "黏贴捕获的样式",
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
    detail.menu.addItem({
        label: '应用渐变',
        submenu:plugin.收藏的css渐变.map(
            style=>{
                return {
                    label:`<span style="background-image:${style.css};max-width:400px !important;display:block">${style.name||style.id}</span>`,
                    click: async () => {
                        plugin.eventBus.emit('css-props-change',{backgroundImage:style.css})
                    },
                }
            }
        )
    })

})
