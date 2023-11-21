import { kernelApi,plugin } from "../asyncModules.js";
import {default as 思源工作空间} from '../polyfills/fs.js'
import path from "../polyfills/path.js"
import { batchSetAttribute } from "./DOMAttributes.js";
import { 获取当前主题元数据路径,获取当前主题文件夹URL } from "./theme.js";
export async function download(type) {
    let fileName;
    let content;
    let mime;
    switch (type) {
      case "downloadCommonProducts":
        fileName = plugin.lastValues.commonProductName || "default.css";
        content = await 思源工作空间.readFile(
          path.join(plugin.lastValues.commonProductsPath, fileName)
        );
        mime = "text/css";
        break;
      case "downloadThemeProducts":
        fileName = plugin.lastValues.themeProductName || "default.css";
        content = await 思源工作空间.readFile(
          path.join(plugin.lastValues.themeProductsPath, fileName)
        );
        mime = "text/css";

        break;
      case "downloadConfigs":
        fileName = plugin.lastValues.lastCommonfigFileName;
        content = await 思源工作空间.readFile(
            plugin.lastValues.lastCommonfigFilePath
        );
        mime = "application/javascript";

        break;
    }
    if (fileName && content && mime) {
        kernelApi.pushMsg({
        msg: "稍等，下载马上开始",
        timeout: 1000,
      });
      let file = new File([content], fileName, { type: mime });
      let moduleURL = URL.createObjectURL(file);
      let a = document.createElement("a");
      batchSetAttribute(a, {
        href: moduleURL,
        download: fileName,
      });
      a.click();
      a.remove();
    } else {
        kernelApi.pushErrMsg({
        msg: "文件内容是空的，不能下载",
        timeout: 1000,
      });
    }
  }


 export  async function 保存() {
    plugin.lastValues.themeValues[获取当前主题文件夹URL()] =
      plugin.lastValues.themeValues[获取当前主题文件夹URL()] || {};
    plugin.lastValues.themeValues[
      获取当前主题文件夹URL()
    ].lastThemeConfigFileName = plugin.lastValues.lastThemeConfigFileName;
    plugin.lastValues.themeValues[
      获取当前主题文件夹URL()
    ].lastThemeConfigFilePath = plugin.lastValues.lastThemeConfigFilePath;
    plugin.lastValues.themeValues[获取当前主题文件夹URL()].themesCustomCss =
      plugin.lastValues.themesCustomCss;
    //console.log(plugin.lastValues);
    await 思源工作空间.writeFile(
      plugin.lastValues.commonCustomCss,
      path.join(
        plugin.lastValues.commonProductsPath,
        plugin.lastValues.commonProductName || "default.css"
      )
    );
    await 思源工作空间.writeFile(
      plugin.lastValues.themesCustomCss,
      path.join(
        plugin.lastValues.themeProductsPath,
        plugin.lastValues.themeProductName || "default.css"
      )
    );
    await 思源工作空间.writeFile(
      JSON.stringify(plugin.lastValues, undefined, 2),
      path.join(plugin.dataPath, "lastValues.json")
    );
  }