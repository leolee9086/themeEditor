import { plugin } from "../asyncModules.js"
import {default as 思源工作空间} from "../polyfills/fs.js"
import { 获取当前主题文件夹URL } from "../utils/theme.js";
import path from '../polyfills/path.js'
import { batchSetAttribute } from "../utils/DOMAttributes.js";
import { isColor } from "../utils/cssHelper.js";
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
await 复制默认公共配置文件()
export const 初始化插件数据=async()=>{
    plugin.data = {};
    await 思源工作空间.mkdir(plugin.dataPath);
    await 思源工作空间.mkdir(path.join(plugin.dataPath, "commonConfigs"));
    await 思源工作空间.mkdir(path.join(plugin.dataPath, "commonProducts"));
    await 思源工作空间.mkdir(path.join(plugin.dataPath, "themeProducts"));
    await plugin.获取当前公共配置文件数组();
    await plugin.获取当前主题配置文件数组();
    if (
      await 思源工作空间.exists(path.join(plugin.dataPath, "lastValues.json"))
    ) {
      // console.log(plugin.lastValues);
      plugin.lastValues = await 思源工作空间.readFile(
        path.join(plugin.dataPath, "lastValues.json")
      );
      //console.log(plugin.lastValues);
      plugin.lastValues = JSON.parse(plugin.lastValues);
    }
    //如果没有设置过公共文件名,就使用默认的
    if (!plugin.lastValues.lastCommonfigFileName) {
      plugin.lastValues.lastCommonfigFileName = "defaultConfig.js";
    }
    //如果没有设置过公共文件路径,就使用默认的
    if (!plugin.lastValues.lastCommonfigFilePath) {
      plugin.lastValues.lastCommonfigFilePath = path.join(
        plugin.dataPath,
        "commonConfigs",
        plugin.lastValues.lastCommonfigFileName
      );
    }
    //如果没有设置过主题文件名,就使用第一个
    if (plugin.lastValues.themeValues[获取当前主题文件夹URL()]) {
      plugin.lastValues.lastThemeConfigFileName =
        plugin.lastValues.themeValues[
          获取当前主题文件夹URL()
        ].lastThemeConfigFileName;
      plugin.lastValues.lastThemeConfigFilePath =
        plugin.lastValues.themeValues[
          获取当前主题文件夹URL()
        ].lastThemeConfigFilePath;
      plugin.lastValues.themesCustomCss =
        plugin.lastValues.themeValues[获取当前主题文件夹URL()].themesCustomCss;
    } else {
      plugin.lastValues.themesCustomCss = "";
      plugin.lastValues.lastThemeConfigFileName = "";
      plugin.lastValues.lastThemeConfigFilePath = "";
    }
    if (!plugin.lastValues.lastThemeConfigFileName) {
      plugin.lastValues.lastThemeConfigFileName = plugin.当前主题配置文件数组[0];
    }
    //如果没有设置过主题文件路径,就使用第一个主题配置文件来生成
    if (!plugin.lastValues.lastThemeConfigFilePath) {
      plugin.lastValues.lastThemeConfigFilePath = path.join(
        "/conf",
        获取当前主题文件夹URL(),
        plugin.lastValues.lastThemeConfigFileName || ""
      );
    }
    if (plugin.lastValues.lastThemeConfigFilePath) {
      let currentTheme = 获取当前主题文件夹URL().split("/").pop();

      let subDir =
        currentTheme +
        "_" +
        (plugin.lastValues.lastThemeConfigFileName || "undefined").split(".")[0] +
        "_" +
        btoa(toBinary(plugin.lastValues.lastThemeConfigFilePath)).substring(
          0,
          16
        );
      plugin.lastValues.themeProductsPath = path.join(
        plugin.dataPath,
        "themeProducts",
        subDir
      );
      await 思源工作空间.mkdir(plugin.lastValues.themeProductsPath);
      if (!(await 思源工作空间.readDir(plugin.lastValues.themeProductsPath))[0]) {
        await 思源工作空间.writeFile(
          "",
          path.join(plugin.lastValues.themeProductsPath, "default.css")
        );
        plugin.lastValues.themeProductName = "default.css";
      }
    }
    if (plugin.lastValues.lastCommonfigFilePath) {
      let subDir =
        (plugin.lastValues.lastCommonfigFileName || "undefined").split(".")[0] +
        "_" +
        btoa(toBinary(plugin.lastValues.lastCommonfigFilePath)).substring(0, 16);
      plugin.lastValues.commonProductsPath = path.join(
        plugin.dataPath,
        "commonProducts",
        subDir
      );
      await 思源工作空间.mkdir(plugin.lastValues.commonProductsPath);
      if (
        !(await 思源工作空间.readDir(plugin.lastValues.commonProductsPath))[0]
      ) {
        await 思源工作空间.writeFile(
          "",
          path.join(plugin.lastValues.commonProductsPath, "default.css")
        );
        plugin.lastValues.commonProductName = "default.css";
      }
    }
    if (plugin.lastValues.themeProductsPath && plugin.lastValues.themeProductName) {
      let themesCustomCss = await 思源工作空间.readFile(
        path.join(
          plugin.lastValues.themeProductsPath,
          plugin.lastValues.themeProductName || "default.css"
        )
      );
      plugin.lastValues.themesCustomCss =
        themesCustomCss || plugin.lastValues.themesCustomCss;
    }
    if (
      plugin.lastValues.commonProductsPath &&
      plugin.lastValues.commonProductName
    ) {
      let commonCustomCss = await 思源工作空间.readFile(
        path.join(
          plugin.lastValues.commonProductsPath,
          plugin.lastValues.commonProductName || "default.css"
        )
      );
      plugin.lastValues.commonCustomCss =
        commonCustomCss || plugin.lastValues.commonCustomCss;
    }
    // console.log(plugin.lastValues);
  }
  function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = "";
    for (let i = 0; i < charCodes.byteLength; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
  }




export async function 获取配置文件内容(配置文件路径) {
    // console.log(配置文件路径);
    let array = objectToArray(await 读取json配置(配置文件路径));
    return array
      .filter((item) => {
        return item && item.name && item.label;
      })
      .map((item) => {
        item.provider = "theme";
        return item;
      });
  }
  export async function 读取json配置(配置文件路径) {
    let extension = 配置文件路径.split("?")[0].split(".").pop();
    if (extension == "json") {
      try {
        return JSON.parse(await 思源工作空间.readFile(配置文件路径));
      } catch (e) {
        consoleError(`themeEditor:读取json配置(${配置文件路径})失败`, e);
        return [];
      }
    } else if (extension == "js") {
      try {
        let jsContent = await 思源工作空间.readFile(配置文件路径);
        let blob = new Blob([jsContent], { type: "application/javascript" });
        let moduleURL = URL.createObjectURL(blob);
        let _module = { default: "" };
        try {
          _module = await import(moduleURL);
        } catch (e) {
          consoleError(`themeEditor:读取js配置(${配置文件路径})失败：\n`, e);
          return [];
        }
        return await (
          await import(moduleURL)
        ).default;
      } catch (e) {
        consoleError(`themeEditor:读取配置(${配置文件路径})失败：\n`, e);
        return [];
      }
    } else if (extension == "css") {
      let cssContent = await 思源工作空间.readFile(配置文件路径);
  
      return cssToJson(cssContent);
    }
  }



  function cssToJson(cssText) {
    let array = [];
    let styleEl = document.createElement("style");
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    batchSetAttribute(iframe, {
      href: "about:blank",
    });
    document.body.appendChild(iframe);
    iframe.contentDocument.head.appendChild(styleEl);
    styleEl.textContent = cssText;
    Array.from(styleEl.sheet.cssRules).forEach((rule) => {
      //    console.log(rule);
      if (rule.style) {
        Array.from(rule.style).forEach(
          (
            styleName //jsonRuler[styleName]=rule.style.getPropertyValue(styleName)
          ) => {
            let _value = rule.styleMap.get(styleName);
            try {
              CSSStyleValue.parse(
                styleName,
                rule.style.getPropertyValue(styleName)
              );
            } catch (e) {
              array.push({
                name: styleName,
                default: _value.value,
                label: styleName,
                selector: rule.selectorText,
                memo:  _value.value + "不是" + styleName + "的合法值:" + e,
              });
            }
  
            switch (_value.constructor.name) {
              case "CSSUnitValue":
                array.push({
                  name: styleName,
                  default: _value.value,
                  unit: _value.unit,
                  type: "number",
                  label: styleName,
                  selector: rule.selectorText,
                  memo: "",
                });
                break;
              case "CSSStyleValue":
                if (isColor(_value.toString())) {
                  array.push({
                    name: styleName,
                    default: _value.toString(),
                    type: "color",
                    label: styleName,
                    selector: rule.selectorText,
                    memo: "",
                  });
                }
                break;
              case "CSSUnparsedValue":
                if (!isColor(_value.toString().trim())) {
                 // console.log(_value.length, _value.toString().trim());
                }
                if (isColor(_value.toString().trim())) {
                  array.push({
                    name: styleName,
                    default: _value.toString().trim(),
                    type: "color",
                    label: styleName,
                    selector: rule.selectorText,
                    memo: "",
                  });
                } else if (isVarUse(_value.toString().trim())) {
                  let rulerObj = {};
                  rulerObj = {
                    name: styleName,
                    default: _value.toString().trim(),
                    use: _value.toString().trim(),
                    label: styleName,
                    selector: rule.selectorText,
                    memo: "",
                    type:styleName.indexOf('color')>-1?'color':null
                  };
                  let rootFined = array.find((item) => {
                    return (
                      `var(${item.name})` == _value.toString().trim() &&
                      item.selector == rule.selectorText
                    );
                  });
                  let blockFined = array.find((item) => {
                    return `var(${item.name})` == _value.toString().trim();
                  });
                  rootFined = blockFined ? rootFined : null;
                  if (blockFined) {
                    rulerObj.default = blockFined.default;
                  }
                  array.push(rulerObj);
                } else {
                 // console.log(styleName, _value, _value.toString());
                  array.push({
                    name: styleName,
                    default: _value.toString(),
                    label: styleName,
                    selector: rule.selectorText,
                    memo: "",
                  });
                }
                break;
              case "CSSKeywordValue":
                //console.log(styleName, _value, _value.toString());
                array.push({
                  name: styleName,
                  default: _value.toString(),
                  label: styleName,
                  selector: rule.selectorText,
                  memo: "",
                });
                break;
              default:
               // console.log(styleName, _value, _value.toString());
                array.push({
                  name: styleName,
                  default: _value.toString(),
                  label: styleName,
                  selector: rule.selectorText,
                  memo: "",
                });
                break;
            }
          }
        );
      } else if (rule instanceof CSSImportRule) {
        array.push({
          type: "boolean",
          name: rule.href,
          subtype: "@import",
          label: rule.href,
          memo: "",
        });
      } else {
        console.log(rule);
      }
    });
    iframe.remove();
    return array;
  }
  
  //将非数组对象转为数组
function objectToArray(object) {
    if (object instanceof Array) {
      return object;
    } else {
      let resultArray = [];
      Object.getOwnPropertyNames(object || {}).forEach((name) => {
        let _value = JSON.parse(JSON.stringify(object[name]));
        !_value.name ? (_value.name = name) : null;
        resultArray.push(_value);
      });
      return resultArray;
    }
  }
  export function 合并主题配置(原始主题配置, 配置类型) {
    let 当前主题元素 = window.parent.document.getElementById("themeStyle")
      ? window.parent.document.getElementById("themeStyle")
      : window.parent.document.getElementById("themeDefaultStyle");
    let 当前目标元素 = document.getElementById(`themeEditorStyle-${配置类型}`);
    //TODO:这里需要判空
    原始主题配置.forEach((item) => {
      let ruler1 = Array.from(当前主题元素.sheet.rules).find((rule) => {
        return rule.selectorText == (item.selector || ":root");
      });
      let finded;
      if (ruler1 && ruler1.style.getPropertyValue(item.name)) {
        !item.default
          ? (item.default = ruler1.style.getPropertyValue(item.name))
          : null;
        item.ruler = ruler1;
        finded = true;
      }
      let ruler2 = Array.from(当前目标元素.sheet.rules).find((rule) => {
        return rule.selectorText == (item.selector || ":root");
      });
      if (ruler2 && ruler2.style.getPropertyValue(item.name)) {
        
          !item.value ? (item.default = ruler2.style.getPropertyValue(item.name))
          : null;
        item.ruler = ruler2;
      }
    });
    原始主题配置.forEach((item) => {
      if (item.default && item.ruler) {
        item.default = (item.default+'').trim();
        if (item.default.startsWith("var")) {
          item.value = item.ruler.style.getPropertyValue(
            item.default.replace("var", "").replace("(", "").replace(")", "")
          );
          item.value = item.value.trim();
          item.use = item.default
            .replace("var", "")
            .replace("(", "")
            .replace(")", "");
          Object.defineProperty(item, "value", {
            get: () => {
              let usedItem = 原始主题配置.find((item1) => {
                return item1.name == item.use;
              });
              if (usedItem) {
                return usedItem.value || usedItem.default;
              } else {
                return item._value;
              }
            },
            set: (newValue) => {
              let usedItem = 原始主题配置.find((item1) => {
                return item1.name == item.use;
              });
              if (usedItem) {
                usedItem.value = newValue;
              } else {
                item._value = newValue;
              }
            },
          });
        }
      }
    });
  }
  