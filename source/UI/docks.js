import { plugin, clientApi } from "../asyncModules.js";
import dock面板元素内容 from './html.js'
import { 创建配置面板 } from "./mainDock/index.js";
import { 创建文本样式面板 } from "./textDock/index.js";
export let Pickr
export const init = async () => {
  plugin.dock面板元素.innerHTML = dock面板元素内容
  await 创建配置面板(plugin.dock面板元素)
  await 创建文本样式面板(plugin.块样式dock面板元素)
}

