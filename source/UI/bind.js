import { plugin ,kernelApi,clientApi} from "../asyncModules.js";
import { 获取当前主题文件夹URL } from "../utils/theme.js";
import { default as 思源工作空间 } from '../polyfills/fs.js'
import path from "../polyfills/path.js"
import { download } from "../utils/files.js";
import { 保存 } from "../utils/files.js";
export async function 绑定dock事件() {
  await 绑定主题配置选择()
  await 绑定公共配置选择()
  await 绑定配置产物选择()
  await 绑定公共配置上传()
  await 绑定下载()
  await 绑定配置产物上传()
  await 绑定配置文件类型过滤();
  await 绑定分组过滤();
  await 绑定次级分组过滤();
  await 绑定选择器过滤();
  await 绑定搜索过滤();
  await 绑定刷新();
  await 绑定保存();
  await 绑定代码片段();
  await 绑定编辑区显示();
}
let 真实过滤
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
    await 保存();
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
    await 保存();
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
    selector1.innerHTML += `<option value='${主题产物.name}' ${主题产物.name == plugin.lastValues.themeProductName ? "selected" : ""
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
    await 保存();
    await plugin.初始化();
  };
  selector2.onchange = selector1.onchange = 读取配置产物;
}
export function 绑定下载() {
  plugin.dock面板元素.querySelectorAll(".cc_download").forEach((el) => {
    el.onclick = (e) => {
      download(e.currentTarget.dataset.customAction);
    };
  });
}
export function 绑定公共配置上传() {
  let 上传按钮 = plugin.dock面板元素.querySelector(
    '[data-custom-action="upLoadConfigs"]'
  );
  //如果不是安全上下文就不让上传了
  if (!window.isSecureContext) {
    上传按钮.remove();
  }
  上传按钮.onclick = async () => {
    try {
      let 文件数组 = await window.showOpenFilePicker({
        types: [
          {
            description: "配置文件",
            accept: {
              "application/javascript": [".js"],
              "application/json": [".json"],
              "text/css": [".css"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: true,
      });
      for await (let 文件句柄 of 文件数组) {
        let name = 文件句柄.name;
        let file = await 文件句柄.getFile();
        await 思源工作空间.writeFile(
          file,
          path.join(plugin.dataPath, "commonConfigs", name)
        );
      }
      let lastCommonfigFile = 文件数组[0] ? 文件数组[0].name : null;
      plugin.lastCommonfigFile = path.join(plugin.dataPath, lastCommonfigFile);

      await plugin.初始化();
    } catch (e) {
      await plugin.初始化();
    }
  };
}
export function 绑定真实过滤开关() {
  let 开关 = plugin.dock面板元素.querySelector('[data-target="真实过滤"]');
  开关.checked = 真实过滤;
  开关.onchange = () => {
    //console.log(开关.checked);
    真实过滤 = 开关.checked ? true : false;

    plugin.生成css();
  };
}
function 绑定配置产物上传() {
  let 上传按钮1 = plugin.dock面板元素.querySelector(
    '[data-custom-action="upLoadCommonProducts"]'
  );
  let 上传按钮2 = plugin.dock面板元素.querySelector(
    '[data-custom-action="upLoadThemeProducts"]'
  );
  //如果不是安全上下文就不让上传了
  let upload = async (e) => {
    let target = e.currentTarget;
    try {
      let 文件数组 = await window.showOpenFilePicker({
        types: [
          {
            description: "配置文件",
            accept: {
              "text/css": [".css"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: true,
      });
      for await (let 文件句柄 of 文件数组) {
        let name = 文件句柄.name;
        let file = await 文件句柄.getFile();
        let _path =
          target === 上传按钮1
            ? plugin.lastValues.commonProductsPath
            : plugin.lastValues.themeProductsPath;
        await 思源工作空间.writeFile(file, path.join(_path, name));
        target === 上传按钮1
          ? (plugin.lastValues.commonProductName = name)
          : (plugin.lastValues.themeProductName = name);
      }
      await 保存();
      await plugin.初始化();
    } catch (e) {
      consoleError(e);
      //await plugin.初始化();
    }
  };
  let update = async (e) => {
    let target = e.currentTarget;

    let Dialog;
    Dialog = new clientApi.Dialog({
      title: "输入文件名,留空取消",
      content: `<div class="fn__flex"><input class="fn__flex-1 b3-text-field  b3-filter" placeholder="输文件名,其实安全上下文内那个+号可以右键上传"></div>`,
      width: "400px",
      height: "96px",
      destroyCallback: async () => {
        let name = Dialog.element.querySelector("input").value;
        if (name) {
          target === 上传按钮1
            ? (plugin.lastValues.commonProductName = name + ".css")
            : (plugin.lastValues.themeProductName = name + ".css");
        }
        await 保存();
        await plugin.初始化();
      },
    });
  };
  //如果不是安全上下文就不让上传了
  if (window.isSecureContext) {
    上传按钮1.oncontextmenu = upload;
    上传按钮2.oncontextmenu = upload;
  }

  上传按钮1.onclick = update;
  上传按钮2.onclick = update;
}
async function 绑定代码片段() {
  plugin.dock面板元素.querySelectorAll(".cc_add").forEach(async (el) => {
    let action = el.dataset.customAction;
    let 标记字符串 = plugin.获取标记字符串(action);
    document.querySelectorAll(`#${标记字符串}`).forEach(
      el=>{
        el.dataset.provider = (action=="addThemeProducts")?'theme':'common'
      }
    )
    let 现有代码片段 = await kernelApi.getSnippet({ type: "all", enabled: 2 });
    let 存在元素索引 = 现有代码片段.snippets.findIndex((item) =>
      item.content.startsWith(`/*${标记字符串}*/`)
    );
    if(存在元素索引>=0){
      el.enabled = 1;
      el.style.backgroundColor='var(--b3-theme-primary-light)'
    }else{
      el.enabled = 0;
      el.style.backgroundColor=''
    }
    el.oncontextmenu=(e)=>{
      if(e.currentTarget.enabled){
        let _action = e.currentTarget.dataset.customAction;
        let 标记字符串 = plugin.获取标记字符串(_action);

        移除代码片段(标记字符串)
        return
      }
    }
    el.onclick = (e) => {
      let _action = e.currentTarget.dataset.customAction;
      let 标记字符串 = plugin.获取标记字符串(_action);
     
      if (action == "addThemeProducts") {
        生成css代码片段(
          标记字符串,
          plugin.lastValues.themesCustomCss,
          "theme",
          plugin.lastValues.themeProductName
        );
        e.currentTarget.enabled = 1;
        e.currentTarget.style.backgroundColor='var(--b3-theme-primary-light)'

      } else {
        生成css代码片段(
          标记字符串,
          plugin.lastValues.commonCustomCss,
          "common",
          plugin.lastValues.commonProductName
        );
        e.currentTarget.enabled = 1;
        e.currentTarget.style.backgroundColor='var(--b3-theme-primary-light)'
      }
    };
  });
}
function 绑定编辑区显示() {
  let hiddened;
  plugin.dock面板元素.querySelector(".hidder").onclick = () => {
    hiddened = !hiddened;
    plugin.dock面板元素.querySelectorAll(".hiddenable").forEach((el) => {
      el.style.display = hiddened ? "none" : "";
    });
    plugin.dock面板元素.querySelector(
      ".config__tab-container"
    ).style.maxHeight = hiddened ? "calc(100% - 84px)" : "calc(100% - 210px)";
  };
}


function 绑定搜索过滤() {
  plugin.dock面板元素.querySelector(".b3-filter").onchange = () => {
    Array.from(
      plugin.dock面板元素.querySelectorAll(".config__tab-container .b3-label")
    ).forEach((formItemEl) => {
      let flag = false;
      if (
        formItemEl
          .querySelector(".b3-label__text")
          .innerText.indexOf(
            plugin.dock面板元素.querySelector(".b3-filter").value
          ) > -1
      ) {
        flag = true;
      }
      if (
        formItemEl
          .querySelector(".b3-label__name")
          .innerText.indexOf(
            plugin.dock面板元素.querySelector(".b3-filter").value
          ) > -1
      ) {
        flag = true;
      }
      !flag
        ? formItemEl.classList.add("fn__none")
        : formItemEl.classList.remove("fn__none");
      真实过滤 ? plugin.生成css() : null;
    });
  };
}


function 绑定分组过滤() {
  let selector = plugin.dock面板元素.querySelector(".b3-filter-group");

  plugin.groups.forEach((group) => {
    if (selector.querySelector(`[value="${group}"]`)) {
      return;
    }
    selector.innerHTML += `<option value="${group}">${Lute.EscapeHTMLStr(
      group
    )}</option>`;
  });
  let searchCurrent = () => {
    plugin.currentGroup = selector.value;
    plugin.过滤显示({ key: "group", value: selector.value });
    绑定次级分组过滤();
    真实过滤 ? plugin.生成css() : null;
  };
  selector.addEventListener("change", searchCurrent);
  searchCurrent();
}
function 绑定次级分组过滤() {
  let selector = plugin.dock面板元素.querySelector(".b3-filter-subgroup");
  if (plugin.currentGroup) {
    selector.innerHTML = `          <option value="">全部</option>
    <option value="基础">基础</option>
    `;
    let items = plugin.dock面板元素.querySelectorAll(
      `[data-group="${plugin.currentGroup}"]`
    );
    plugin.subGroups = [];
    items.forEach((item) => {
      plugin.subGroups.push(item.dataset.subGroup);
    });
    plugin.subGroups = Array.from(new Set(plugin.subGroups));
  } else {
    selector.innerHTML = `          <option value="">全部</option>
    <option value="基础">基础</option>
    `;

    let items = plugin.dock面板元素.querySelectorAll(`[data-group]`);
    plugin.subGroups = [];
    items.forEach((item) => {
      plugin.subGroups.push(item.dataset.subGroup);
    });
    plugin.subGroups = Array.from(new Set(plugin.subGroups));
  }
  plugin.subGroups.forEach((subGroup) => {
    if (selector.querySelector(`[value="${subGroup}"]`)) {
      return;
    }
    selector.innerHTML += `<option value="${subGroup}">${Lute.EscapeHTMLStr(
      subGroup
    )}</option>`;
  });
  let searchCurrent = () => {
    plugin.过滤显示({ key: "subGroup", value: selector.value });
    真实过滤 ? plugin.生成css() : null;
  };
  selector.addEventListener("change", searchCurrent);
  searchCurrent();
}
function 绑定选择器过滤() {
  let selector = plugin.dock面板元素.querySelector(".b3-filter-selectortext");

  plugin.selectors.forEach((selectorText) => {
    if (selector.querySelector(`[value="${Lute.EscapeHTMLStr(
      selectorText
    )}"]`)) {
      return;
    }
    selector.innerHTML += `<option value="${Lute.EscapeHTMLStr(
      selectorText
    )}">${Lute.EscapeHTMLStr(
      selectorText
    )}</option>`;
  });
  let searchCurrent = () => {
    plugin.过滤显示({ key: "selectortext", value: Lute.EscapeHTMLStr(
      selector.value
    ) });

    真实过滤 ? plugin.生成css() : null;
  };
  selector.addEventListener("change", searchCurrent);
  searchCurrent();
}
function 绑定配置文件类型过滤() {
  let selector = plugin.dock面板元素.querySelector(".configFileType");
  selector.value = plugin.configFileType ? plugin.configFileType : selector.value;
  let searchCurrent = () => {
    plugin.过滤显示({ key: "config", value: selector.value });
  };
  selector.addEventListener("change", searchCurrent);
  searchCurrent();
}
function 绑定刷新() {
  plugin.dock面板元素.querySelector('[data-type="refresh"]').addEventListener(
    "click",
    async () => {
      plugin.lastValues.commonCustomCss = "";
      plugin.lastValues.themesCustomCss = "";
      await plugin.初始化();
    },
    { once: true }
  );
  plugin.dock面板元素.querySelector('[data-type="trash"]').addEventListener(
    "click",
    async () => {
      plugin.lastValues.commonCustomCss = "";
      plugin.lastValues.themesCustomCss = "";
      await 保存();

      await plugin.初始化();
    },
    { once: true }
  );
  plugin.dock面板元素.querySelector('[data-type="clear"]').addEventListener(
    "click",
    async () => {
      plugin.lastValues.commonCustomCss = "";
      plugin.lastValues.themesCustomCss = "";
      await plugin.初始化界面();
    },
    { once: true }
  );
}
function 绑定保存() {
  let a = async () => {
    await 保存();
    await plugin.初始化界面();
  };
  plugin.dock面板元素
    .querySelector('[data-type="save"]')
    .removeEventListener("click", a);
  plugin.dock面板元素
    .querySelector('[data-type="save"]')
    .addEventListener("click", a);
  plugin.正在初始化 = false;
}
