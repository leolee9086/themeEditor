import { plugin } from "../../asyncModules.js";
import {  生成主题设置条目, 生成通用设置条目 } from "../docks.js";

import { 绑定dock事件 } from "../bind.js";
 let Pickr


export async function 创建配置面板() {
  if (!Pickr) {
    Pickr = (await import(plugin.selfURL + "/pickr-esm2022.js"))["default"];
  }
  plugin.Pickr = Pickr;
  plugin.dock面板元素.querySelector(".config__tab-container").innerHTML = "";
  plugin.formItems = [];
  await 绑定dock事件();
  await 生成主题设置条目();
  await 生成通用设置条目();
}
