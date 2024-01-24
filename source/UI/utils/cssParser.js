import {css样式名表 } from './cssParser/propertyDB.js'
export {分解属性名} from './cssParser/property.js'


function 构建DOM元素样式操作器(元素){
    //例如,访问操作器.背景.颜色的时候相当于访问backgroundColor,其余的类似
    const 合法css样式名集合 = new Set(css样式名表)
    const 操作器 = {
        get(目标, 属性) {
            属性 = 属性.replace(/([A-Z])/g, "-$1").toLowerCase();
            if (!合法css样式名集合.has(属性)) {
                console.warn(`无效的CSS属性 "${属性}"`);
                return undefined;
            }
            return 目标[属性];
        },
        set(目标, 属性, 值) {
            属性 = 属性.replace(/([A-Z])/g, "-$1").toLowerCase();
            if (!合法css样式名集合.has(属性)) {
                console.warn(`无效的CSS属性 "${属性}"`);
                return false;
            }
            值 = 值.replace(/"/g, "'");
            目标[属性] = 值;
            元素.style.cssText = Object.entries(目标).map(([键, 值]) => `${键}: ${值}`).join('; ');
            return true;
        }
    };
    return new Proxy({}, 操作器);
}