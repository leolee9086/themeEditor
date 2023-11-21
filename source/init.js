import { plugin } from "./asyncModules.js";
import {default as 思源工作空间} from '../polyfills/fs.js'
import path from "../polyfills/path.js"

export const 初始化设置css=()=>{
    document.head.querySelectorAll(".themeEditorStyle").forEach((oldStyle) => {
        oldStyle.remove();
      });
      document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style id="themeEditorStyle-theme" class="themeEditorStyle" data-provider="theme"></style>
  
      <style id="themeEditorStyle-common" class="themeEditorStyle" data-provider="common"></style>
      `
      );
      let themeEditorStyles = document.head.querySelectorAll(".themeEditorStyle");
      themeEditorStyles.forEach((themeEditorStyle) => {
        themeEditorStyle.textContent = "";
        if (themeEditorStyle.dataset.provider == "common") {
          themeEditorStyle.textContent = plugin.lastValues.commonCustomCss;
        } else {
          themeEditorStyle.textContent = plugin.lastValues.themesCustomCss;
        }
        document.head.appendChild(themeEditorStyle);
      });
}
async function 复制默认公共配置文件() {
  let 默认配置文件夹内容 = await 思源工作空间.readDir(
    path.join("data", "plugins", "themeEditor", "sampleConfigs")
  )
  console.log(默认配置文件夹内容)
  默认配置文件夹内容.forEach(
    async(配置项目)=>{
      if(配置项目.isDir){
        return
      }
      let 目标文件路径 =       path.join(
        "data",
        "storage",
        "petal",
        "themeEditor",
        "commonConfigs",
        配置项目.name
      )
      if(await 思源工作空间.exists(目标文件路径)){
        return
      }
      let 默认配置文件内容 = await 思源工作空间.readFile(
        path.join("data", "plugins", "themeEditor", "sampleConfigs",配置项目.name)
      );
      await 思源工作空间.writeFile(
        默认配置文件内容,
        path.join(
          "data",
          "storage",
          "petal",
          "themeEditor",
          "commonConfigs",
          配置项目.name
        )
      );
    }
  )
}

初始化设置css()
await 复制默认公共配置文件()