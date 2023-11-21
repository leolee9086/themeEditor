import { plugin } from "../asyncModules.js";
import { 获取当前主题文件夹URL } from "../utils/theme.js";
import {default as 思源工作空间} from '../polyfills/fs.js'
import path from "../polyfills/path.js"
export async function 绑定dock事件(){
    await 绑定主题配置选择()
    await 绑定公共配置选择()
    await 绑定配置产物选择()
}
export async function 绑定主题配置选择() {
    let selector = plugin.dock面板元素.querySelector(".configFileTheme");
    selector.innerHTML = "";
    let 主题配置文件数组 = await plugin.获取当前主题配置文件数组();
    if (主题配置文件数组 && 主题配置文件数组[0]) {
        for (let i = 0, length = 主题配置文件数组.length; i < length; i++) {
            selector.innerHTML += `<option value='${i}'>${主题配置文件数组[i]}</option>`;
        }
    } else {
        selector.innerHTML += `<option value='-1'>当前主题没有提供配置文件</option>`;
    }
    selector.onchange = async () => {
        plugin.lastValues.lastThemeConfigFileName =
            主题配置文件数组[selector.value];
        plugin.lastValues.lastThemeConfigFilePath = path.join(
            "conf",
            获取当前主题文件夹URL(),
            plugin.lastValues.lastThemeConfigFilePath
        );
        await plugin.保存();
        await plugin.初始化();
    };
}
export async function 绑定公共配置选择() {
    let selector = plugin.dock面板元素.querySelector(".configFileCommon");
    selector.innerHTML = "";
    let 公共配置文件数组 = await plugin.获取当前公共配置文件数组();
    if (公共配置文件数组) {
        for (let i = 0, length = 公共配置文件数组.length; i < length; i++) {
            if (公共配置文件数组[i] == plugin.lastValues.lastCommonfigFileName) {
                selector.innerHTML += `<option value='${i}' selected>${公共配置文件数组[i]}</option>`;
                selector.value = i;
            } else {
                selector.innerHTML += `<option value='${i}'>${公共配置文件数组[i]}</option>`;
            }
        }
    } else {
        selector.innerHTML += `<option value='-1'>当前没有公共配置文件,正在重新生成</option>`;
        await plugin.复制默认公共配置文件();
    }
    selector.onchange = async () => {
        plugin.lastValues.lastCommonfigFileName = 公共配置文件数组[selector.value];
        plugin.lastValues.lastCommonfigFilePath = path.join(
            plugin.dataPath,
            "commonConfigs",
            plugin.lastValues.lastCommonfigFileName
        );
        await plugin.保存();
        await plugin.初始化();
    };
}
export async function 绑定配置产物选择() {
    let selector1 = plugin.dock面板元素.querySelector(".puductTheme");
    let selector2 = plugin.dock面板元素.querySelector(".puductCommon");
    selector1.innerHTML = "";
    selector2.innerHTML = "";
    let 主题产物数组 = await 思源工作空间.readDir(
      plugin.lastValues.themeProductsPath
    );
    let 公共产物数组 = await 思源工作空间.readDir(
      plugin.lastValues.commonProductsPath
    );
    主题产物数组.forEach((主题产物) => {
      selector1.innerHTML += `<option value='${主题产物.name}' ${
        主题产物.name == plugin.lastValues.themeProductName ? "selected" : ""
      }>${主题产物.name}</option>`;
    });
    公共产物数组.forEach((公共产物) => {
      selector2.innerHTML += `<option 
      value='${公共产物.name}' 
      ${公共产物.name == plugin.lastValues.commonProductName ? "selected" : ""}
      >${公共产物.name}</option>`;
    });
    let 读取配置产物 = async (e) => {
      let name = e.currentTarget.value;
      let type = e.currentTarget.classList.contains("puductTheme")
        ? "theme"
        : "common";
      let dirname =
        type === "theme"
          ? plugin.lastValues.themeProductsPath
          : plugin.lastValues.commonProductsPath;
      let key = type === "theme" ? "themesCustomCss" : "commonCustomCss";
      let _path = path.join(dirname, name);
      let cssContent = await 思源工作空间.readFile(_path);
      plugin.lastValues[key] = cssContent;
      key = type === "theme" ? "themeProductName" : "commonProductName";
      plugin.lastValues[key] = name;
      await plugin.保存();
      await plugin.初始化();
    };
    selector2.onchange = selector1.onchange = 读取配置产物;
  }