import { plugin, clientApi } from "../asyncModules.js";
import { 获取配置文件内容 ,合并主题配置} from "../data/index.js";
import { FormItem } from "./formItem.js"; 
import {
  绑定dock事件
} from "./bind.js"
import dock面板元素内容 from './html.js'
let Pickr
export const init = async () => {
  plugin.dock面板元素.innerHTML = dock面板元素内容
  await 创建配置面板()
}
export async function 创建配置面板() {
  if (!Pickr) {
    Pickr = (await import(plugin.selfURL + "/pickr-esm2022.js"))["default"];
  }
  plugin.Pickr = Pickr
  plugin.dock面板元素.querySelector(".config__tab-container").innerHTML = "";
  plugin.formItems = [];
  await 绑定dock事件()
  await 生成主题设置条目();
  await 生成通用设置条目();
}

async function 生成主题设置条目(){
  if (!plugin.lastValues.lastThemeConfigFilePath) {
    return;
  }
  let 当前主题配置内容 = await 获取配置文件内容(
    plugin.lastValues.lastThemeConfigFilePath
  );
  if (!当前主题配置内容) {
    return;
  }
  合并主题配置(当前主题配置内容, "theme");
  plugin.当前主题配置内容 = 当前主题配置内容;
  生成设置条目(plugin.当前主题配置内容, "theme");
}
async function 生成通用设置条目() {
  let 当前通用配置内容 = await 获取配置文件内容(
    plugin.lastValues.lastCommonfigFilePath
  );
  if (!当前通用配置内容) {
    consoleError(
      `获取当前通用设置:${plugin.lastValues.lastCommonfigFilePath}失败,请检查文件是否存在`
    );
    return;
  }
  合并主题配置(当前通用配置内容, "common");
  plugin.当前通用配置内容 = 当前通用配置内容;
  生成设置条目(plugin.当前通用配置内容, "common");
}
export function 生成设置条目(设置内容, 设置类型) {
  (plugin.groups = []), (plugin.subGroups = []);

  设置内容.forEach((item) => {
    try {
      let formItem = new FormItem(
        item,
        plugin.dock面板元素.querySelector(".config__tab-container"),
        () => {
          plugin.生成css();
        },
        () => {
          let el = document.getElementById("themeEditorColorPlate");
          el ? el.remove() : null;
        }
      );
      Object.defineProperty(item, "filted", {
        get: () => {
          return (
            formItem.element.style.display !== "none" &&
            !formItem.element.classList.contains("fn__none")
          );
        },
      });
      formItem.element.setAttribute("data-config", 设置类型);
      formItem.element.setAttribute("data-group", item.group || "基础设置");
      item.group ? plugin.groups.push(item.group) : null;
      formItem.element.setAttribute(
        "data-sub-group",
        item.subGroup || "基础"
      );
      item.subGroup ? plugin.subGroups.push(item.subGroup) : null;
      formItem.element.setAttribute(
        "data-selectortext",
        Lute.EscapeHTMLStr(item.selector) || ":root"
      );
      item.selector && item.selector !== ":root"
        ? plugin.selectors.push(item.selector)
        : null;
      if (item.selector) {
        plugin.selectors.push(item.selector);
        let div = formItem.element.querySelector(".fn__flex-1");
        div.innerHTML += `<span class='selector-text' style="font-size:12px;border-top:1px solid var(--b3-theme-surface-lighter)">选择器:${Lute.EscapeHTMLStr(
          item.selector
        )}</span>`;
        div
          .querySelector(".selector-text")
          .addEventListener("mouseover", (e) => {
            testselector(Lute.UnEscapeHTMLStr(item.selector));
            e.stopPropagation();
          });
      }
      plugin.groups = Array.from(new Set(plugin.groups));
      plugin.subGroups = Array.from(new Set(plugin.subGroups));
      plugin.selectors = Array.from(new Set(plugin.selectors));
      plugin.formItems.push(formItem);
    } catch (e) {
      console.error(`配置界面生成失败：${e}`);
    }
  });
}

