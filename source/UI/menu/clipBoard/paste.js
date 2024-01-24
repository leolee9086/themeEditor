import { plugin } from "../../../asyncModules.js";
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
    return fontStyles.filter((item) => {
        return plugin[`暂存的css样式`][item]
    }).map(style => {
        return {
            label: `黏贴${style}(计算值)`,
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