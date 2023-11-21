import { plugin } from "../asyncModules.js";
export function 生成css(){
    plugin.lastValues.commonCustomCss = 计算css.bind(plugin)(
        plugin.当前通用配置内容,
        "common"
      );
      plugin.lastValues.themesCustomCss = 计算css.bind(plugin)(
        plugin.当前主题配置内容,
        "theme"
      );
  
}
export function 计算css(配置内容, 设置类型) {
    let 选择器字典 = {
      ":root": [],
    };
    let 导入列表 = [];
    let css = "";
    配置内容.forEach((item) => {
      if (!item.filted && 真实过滤) {
        return;
      }
      if (item.subtype == "@import") {
        item.value ? 导入列表.push(item.target || item.name) : null;
        return;
      }
      if (!item.selector) {
        选择器字典[":root"].push(item);
      } else {
        if (!选择器字典[item.selector]) {
          选择器字典[item.selector] = [];
        }
        选择器字典[item.selector].push(item);
      }
    });
    Object.getOwnPropertyNames(选择器字典).forEach((name) => {
      if (选择器字典[name]) {
        css += 生成选择器css(选择器字典[name], name);
      }
    });
    let themeEditorStyle = document.head.querySelector(
      `#themeEditorStyle-${设置类型}`
    );
    if (!themeEditorStyle) {
      themeEditorStyle = document.createElement("style");
      batchSetAttribute(themeEditorStyle, {
        id: `themeEditorStyle-${设置类型}`,
        class: "themeEditorStyle",
      });
      document.head.appendChild(themeEditorStyle);
    }
    let 导入css = "";
  
    if (导入列表[0]) {
      导入列表.forEach((item) => {
        let base =
          设置类型 == "theme"
            ? plugin.lastValues.lastThemeConfigFilePath
            : plugin.lastValues.lastCommonfigFilePath;
        let url = item;
        base ? (url = resolveRelativePath(base, item)) : null;
        url = workspacePathToURL(url);
        导入css += `@import url("${url}");\n`;
      });
    }
    css = 导入css + css;
    document.querySelectorAll(`[data-provider="${设置类型}"]`).forEach(el=>{
      el.textContent = css;
    })
    return css;
  }
  function workspacePathToURL(url) {
    if (url.startsWith("/data")) {
      return url.replace("/data", "");
    } else if (url.startsWith("/conf/appearance")) {
      return url.replace("/conf", "");
    }
  }
  function resolveRelativePath(file, path) {
    if (path.startsWith("/")) return path;
    if (path.match(/^http/)) return path;
    if (path.match(/^file/)) return path;
    if (!file) return path;
    const basePath = file.substring(0, file.lastIndexOf("/"));
    if (path.startsWith("../")) {
      return resolveRelativePath(basePath, path.substring(3));
    } else if (path.startsWith("./")) {
      path = path.substring(2);
    }
  
    return basePath + "/" + path;
  }
  function 生成选择器css(配置内容, 选择器) {
    if (!选择器) {
      选择器 = ":root";
    }
    let css = `${选择器}{
      `;
    配置内容.forEach((item) => {
      if (item.memo) {
        css += `\n/*${item.memo}*/`;
      }
      css += `\n${item.name}:${item.value || item.default};`;
    });
    css = css + "}\n";
    return css;
  }