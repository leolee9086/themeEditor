import { kernelApi } from "../../asyncModules.js"
import { cssHTMLString } from "./previewTheme.js"

export const findThemeBlocks =()=>{
    const sql =`select * from blocks where type ='c' and content like '@blockTheme%'`
    const blocks = kernelApi.sql.sync({stmt:sql})
    return blocks
}
export const parseThemeBlocks = (markdown)=>{
    const lute = Lute.New()
    return   extractCssFromPreElements(lute.Md2HTML(markdown))
}



export const extractCssFromPreElements =  (htmlString) => {
    // 创建一个新的DOMParser实例
    const parser = new DOMParser();
    // 使用DOMParser解析HTML字符串
    const doc = parser.parseFromString(htmlString, 'text/html');
    // 获取所有的<pre>元素
    const preElements = doc.querySelectorAll('pre');
    // 初始化一个数组来存储所有从<pre>元素中提取的CSS字符串
    let cssStrings = [];
    // 遍历所有的<pre>元素
    preElements.forEach(pre => {
        // 假设<pre>元素直接包含CSS字符串，将其添加到数组中
        cssStrings.push(pre.textContent);
    });
    // 将数组中的CSS字符串合并，并移除@blockTheme标记
    let css = cssStrings.join('\n').replace('@blockTheme','');
    // 使用正则表达式找到:root选择器及其规则
    const rootRegex = /:root\s*\{[^}]*\}/g;
    let rootRules = "";
    let match;
    while ((match = rootRegex.exec(css)) !== null) {
        // 将匹配到的:root规则添加到rootRules字符串
        rootRules += match[0] + "\n";
        // 从原始CSS字符串中移除匹配到的:root规则
        css = css.replace(match[0], '');
    }
    // 将:root规则放到CSS字符串的最前面
    return rootRules + css;
};
export {cssHTMLString }