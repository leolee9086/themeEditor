import { plugin } from "../../../asyncModules.js";
import { cssNames } from "../../utils/cssproperties.js";

const fontStyles = [
    'font-size',
    'font-weight',
    'font-style',
    'text-decoration',
    'text-transform',
    'letter-spacing',
    'line-height'
];

// 创建菜单项
const menuItems = () => {
    return cssNames.filter((item) => {
        return plugin[`暂存的css样式`][item]
    }).map(style => {
        return {
            label: `应用样式:${style}`,
            click: () => {
                plugin.blockElements.forEach(
                    el => {
                        el.style.setProperty(style, plugin[`暂存的css样式`][style]);
                })
            }
        };
    });
}
export { menuItems as pasteFontMenu }