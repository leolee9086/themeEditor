import { plugin ,clientApi} from "../asyncModules.js";
import {
    绑定主题配置选择, 绑定公共配置选择
} from "./bind.js"
import dock面板元素内容 from './html.js'
let Pickr
export const init= async()=>{
plugin.dock面板元素.innerHTML=dock面板元素内容
await 创建配置面板()
  }
export async function 创建配置面板() {
    if (!Pickr) {
      Pickr = (await import(plugin.selfURL + "/pickr-esm2022.js"))["default"];
    }
    plugin.Pickr=Pickr
    plugin.dock面板元素.querySelector(".config__tab-container").innerHTML = "";
    plugin.formItems = [];
    await plugin.生成主题设置条目();
    await plugin.生成通用设置条目();
    await 绑定主题配置选择()
    await 绑定公共配置选择()
}
