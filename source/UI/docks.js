import { plugin, clientApi } from "../asyncModules.js";
import dock面板元素内容 from './html.js'
import { 创建配置面板 } from "./mainDock/index.js";
export let Pickr
export const init = async () => {
  plugin.dock面板元素.innerHTML = dock面板元素内容
  await 创建配置面板(plugin.dock面板元素)
}

