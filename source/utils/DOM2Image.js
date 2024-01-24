import ColorThief from '../../static/color-thief.js';
import chroma from '../../static/chroma-js.js'

let colorThief = new ColorThief();

export async function copyAsPng(element) {
    if(!window.html2canvas){
        await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas")
    }
    const canvas = await html2canvas(element);
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            resolve(blob);
            canvas.remove()
        }, 'image/png');
    });
    
}
export const addScript = (path, id) => {
    return new Promise((resolve) => {
        if (document.getElementById(id)) {
            // 脚本加载后再次调用直接返回
            resolve(false);
            return false;
        }
        const scriptElement = document.createElement("script");
        scriptElement.src = path;
        scriptElement.async = true;
        // 循环调用时 Chrome 不会重复请求 js
        document.head.appendChild(scriptElement);
        scriptElement.onload = () => {
            if (document.getElementById(id)) {
                // 循环调用需清除 DOM 中的 script 标签
                scriptElement.remove();
                resolve(false);
                return false;
            }
            scriptElement.id = id;
            resolve(true);
        };
    });
};
export async  function getDOMColor(element){
    let imageBlob = await copyAsPng(element)
    let imageUrl = URL.createObjectURL(imageBlob)
    let imageObj = new Image();
    return new Promise((resolve, reject) => {
        imageObj.onload = function () {
            let color = colorThief.getColor(imageObj);
            let [r,g,b]=color
            let bgColor = chroma(r, g, b).hex();
            resolve(bgColor)
            URL.revokeObjectURL(imageUrl);
        };
        imageObj.src = imageUrl;
    })
}