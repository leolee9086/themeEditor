const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
let Pickr;
let path;
let 思源工作空间;
let importDep;
let consoleError;
let 核心api;
let 真实过滤;
class themeEditor extends Plugin {
  onload() {
    this.selfURL = `/plugins/${this.constructor.name}`;
    this.dataPath = `/data/storage/petal/${this.constructor.name}`;
    //用来存储最后的选择
    this.lastValues = {
      lastCommonfigFileName: "",
      lastThemeConfigFileName: "",
      lastCommonfigFilePath: "",
      lastThemeConfigFilePath: "",
      themeValues: {},
      commonCustomCss: "",
      themeProductName: "",
      commonProductName: "",
    };
    //Dock先创建再异步初始化
    this.显示过滤条件 = {};
    this.groups = [];
    this.subGroups = [];
    this.selectors = [];
    真实过滤 = false;
    this.创建配置Dock();
    //初始化界面和数据
    this.初始化();
    this.监听当前主题变化();
    注册图标({
      id: "iconThemeEditor",
      content: `
      <path d="M8.997 13.985c.01 1.104-.88 2.008-1.986 2.015-1.105.009-2.005-.88-2.011-1.984-.01-1.105.879-2.005 1.982-2.016 1.106-.007 2.009.883 2.015 1.985zm-.978-3.986c-1.104.008-2.008-.88-2.015-1.987-.009-1.103.877-2.004 1.984-2.011 1.102-.01 2.008.877 2.012 1.982.012 1.107-.88 2.006-1.981 2.016zm7.981-4.014c.004 1.102-.881 2.008-1.985 2.015-1.106.01-2.008-.879-2.015-1.983-.011-1.106.878-2.006 1.985-2.015 1.101-.006 2.005.881 2.015 1.983zm-12 15.847c4.587.38 2.944-4.492 7.188-4.537l1.838 1.534c.458 5.537-6.315 6.772-9.026 3.003zm14.065-7.115c1.427-2.239 5.846-9.748 5.846-9.748.353-.623-.429-1.273-.975-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.04 3.995-2.811zm-12.622 4.806c-2.084-1.82-3.42-4.479-3.443-7.447-.044-5.51 4.406-10.03 9.92-10.075 3.838-.021 6.479 1.905 6.496 3.447l1.663-1.456c-1.01-2.223-4.182-4.045-8.176-3.992-6.623.055-11.955 5.466-11.903 12.092.023 2.912 1.083 5.57 2.823 7.635.958.492 2.123.329 2.62-.204zm12.797-1.906c1.059 1.97-1.351 3.37-3.545 3.992-.304.912-.803 1.721-1.374 2.311 5.255-.591 9.061-4.304 6.266-7.889-.459.685-.897 1.197-1.347 1.586z"/>        `,
      viewBox: "0 0 24 24",
    });
    注册图标({
      id: "iconThemeEditorSave",
      content: `
      <path d="M15.004 3h2.996v5h-2.996v-5zm8.996 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9zm-2 2h-14v1h14v-1zm0 2h-14v1h14v-1zm0 2h-14v1h14v-1z"/>        `,
      viewBox: "0 0 24 24",
    });
  }
  创建配置Dock() {
    let that = this;
    this.addDock({
      config: {
        icon: "iconThemeEditor",

        position: "LeftBottom",
        size: { width: 200, height: 0 },
        title: "themeEditor",
      },
      data: {
        text: "This is my custom dock",
      },
      type: "config",
      init() {
        this.element.innerHTML = `
        <div class="block__icons">
          <div class="block__logo">
              <svg><use xlink:href="#iconThemeEditor"></use></svg>
              themeEditor
          </div>
          <span class="fn__flex-1 fn__space  b3-tooltips b3-tooltips__sw hidder" style="min-height:30px" aria-label="单击显示/隐藏详细设置"></span>
          <span data-type="trash" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="重新开始设置"><svg><use xlink:href="#iconClose"></use></svg></span>

          <span data-type="clear" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="清除当前设置"><svg><use xlink:href="#iconTrashcan"></use></svg></span>
          <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="重载当前设置"><svg><use xlink:href="#iconRefresh"></use></svg></span>

          <span data-type="save" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="保存当前设置"><svg><use xlink:href="#iconThemeEditorSave"></use></svg></span>

          <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min ${clientApi.adaptHotkey(
            "⌘W"
          )}"><svg><use xlink:href="#iconMin"></use></svg></span>
        </div>
        <div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
          主题配置文件:
          <span 
          class="block__logo cc_add b3-tooltips b3-tooltips__e" aria-label="创建一个针对当前主题的代码片段,左键添加/更新,右键删除\n在你要关掉这个插件的时候使用"
          data-custom-action="addThemeProducts"
          style='border-radius:3px'
          >
          <svg><use xlink:href="#iconCode"></use></svg>
  
          </span>
  
          <select class="b3-select fn__flex-center fn__size100 configFileTheme">
          </select>
          <span class='fn__flex-1'> </span>

          主题配置产品:

          <select class="b3-select fn__flex-center fn__size100 puductTheme">
          <option value=0>临时</option>
          </select>
          <span class="block__logo" data-custom-action="upLoadThemeProducts">
        <svg><use xlink:href="#iconAdd"></use></svg>
        </span>
        <span class="block__logo cc_download" data-custom-action="downloadThemeProducts">
        <svg><use xlink:href="#iconDownload"></use></svg>

        </span>
        </span>
        
        </div>
        <div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
        公共配置文件:
        <span 
        class="block__logo cc_add b3-tooltips b3-tooltips__e" aria-label="创建一个公共代码片段,左键添加/更新,右键删除\n在你要关掉这个插件的时候使用"
        data-custom-action="addCommonProducts" 
        style='border-radius:3px'

        >
        <svg><use xlink:href="#iconCode"></use></svg>

        </span>
        <select class="b3-select fn__flex-center fn__size100 configFileCommon">
        </select>
        <span class="block__logo" data-custom-action="upLoadConfigs">
        <svg><use xlink:href="#iconUpload"></use></svg>

        </span>
        <span class="block__logo cc_download" data-custom-action="downloadConfigs">
        <svg><use xlink:href="#iconDownload"></use></svg>

        </span>


        <span class='fn__flex-1'> </span>

        公共配置产品:
        <select class="b3-select fn__flex-center fn__size100 puductCommon">
        <option value=0>临时</option>

        </select>
        
        <span class="block__logo" data-custom-action="upLoadCommonProducts">
        <svg><use xlink:href="#iconAdd"></use></svg>
        </span>
        <span class="block__logo cc_download" data-custom-action="downloadCommonProducts">
        <svg><use xlink:href="#iconDownload"></use></svg>

        </span>
       

        </div>
        <div class="block__icons " style="max-height:42px;overflow:hidden">
          <span class="block__logo">
            <svg><use xlink:href="#iconSearch"></use>
          </svg>
          </span> 
          <input class="fn__flex-1 b3-text-field  b3-filter" placeholder="关键字过滤 Enter">
          <span class="fn__space"></span>

          <span class="hiddenable"> 真实过滤</span>
          <span class="fn__space"></span>

          <input class="b3-switch fn__flex-center"  type="checkbox" data-target="真实过滤">
        </div>
        <div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
        <span class="block__logo">
        <svg><use xlink:href="#iconFilter"></use></svg>
        </span> 

        配置源过滤:
        <select class="b3-select fn__flex-center  configFileType">
        <option value=0>全部显示</option>
        <option value='theme'>主题配置文件</option>
          <option value='common'>公共配置文件</option>
        </select>
        分组过滤:
        <select class="b3-select fn__flex-center  b3-filter-group">
          <option value="">全部</option>
          <option value="基础设置">基础设置</option>
        <select>
        <select class="b3-select fn__flex-center  b3-filter-subgroup">
          <option value="">全部</option>
          <option value="基础">基础</option>
        <select>
        选择器过滤:
        <select class="b3-select fn__flex-center fn__flex-1 b3-filter-selectortext">
          <option value="">:root</option>
          <select>
        </div>
        <div class="fn__flex-1  theme-editor__custom-dock config__tab-container" style='max-height:calc(100% - 210px);background-color:var(--b3-theme-background);'> 
        </div>
        `;
        that.dock面板元素 = this.element;
        //console.log(this, that);
        that.初始化();
        consoleError = (...args) => {
          console.error(...args);
          let textLines = args.map((item) => {
            return `<div>${Lute.EscapeHTMLStr(item.toString())}</div>`;
          });
          that.dock面板元素.querySelector(
            ".config__tab-container"
          ).innerHTML = `
            <div style="color:var(--b3-card-error-color);background-color:var(--b3-card-error-background)">
              ${textLines}
            <div>
          `;
        };
      },
    });
  }
  async 初始化() {
    if (!this.dock面板元素) {
      return;
    }
    console.log("开始初始化");
    await this.初始化后端接口();
    await this.初始化数据();
    await this.初始化界面();
  }
  async 监听当前主题变化() {
    let 当前主题元素 = () => {
      return window.parent.document.getElementById("themeStyle")
        ? window.parent.document.getElementById("themeStyle")
        : window.parent.document.getElementById("themeDefaultStyle");
    };

    let watcher = new MutationObserver((mutations) => {
      if (当前主题元素() && !this.当前主题元素) {
        this.当前主题元素 = 当前主题元素();
      }
      if (当前主题元素() && 当前主题元素() !== this.当前主题元素) {
        this.初始化();
      }
      this.当前主题元素 = 当前主题元素();
    });
    watcher.observe(document.head, { childList: true, subtree: true });
  }
  async 初始化后端接口() {
    path = (await import(this.selfURL + "/polyfills/path.js"))["default"];
    importDep = async (moduleName) => {
      return await import(path.join(this.selfURL, moduleName));
    };
    //await importDep("./polyfills/genKernelApi.js");
    核心api = (await importDep("./polyfills/kernelApi.js"))["default"];
    思源工作空间 = (await importDep("./polyfills/fs.js"))["default"];
   
  }
  async 初始化数据() {
    this.data = {};
    await 思源工作空间.mkdir(this.dataPath);
    await 思源工作空间.mkdir(path.join(this.dataPath, "commonConfigs"));
    await 思源工作空间.mkdir(path.join(this.dataPath, "commonProducts"));
    await 思源工作空间.mkdir(path.join(this.dataPath, "themeProducts"));
    await this.复制默认公共配置文件();
    await this.获取当前公共配置文件数组();
    await this.获取当前主题配置文件数组();

    if (
      await 思源工作空间.exists(path.join(this.dataPath, "lastValues.json"))
    ) {
      // console.log(this.lastValues);
      this.lastValues = await 思源工作空间.readFile(
        path.join(this.dataPath, "lastValues.json")
      );
      //console.log(this.lastValues);
      this.lastValues = JSON.parse(this.lastValues);
    }
    //如果没有设置过公共文件名,就使用默认的
    if (!this.lastValues.lastCommonfigFileName) {
      this.lastValues.lastCommonfigFileName = "defaultConfig.js";
    }
    //如果没有设置过公共文件路径,就使用默认的
    if (!this.lastValues.lastCommonfigFilePath) {
      this.lastValues.lastCommonfigFilePath = path.join(
        this.dataPath,
        "commonConfigs",
        this.lastValues.lastCommonfigFileName
      );
    }
    //如果没有设置过主题文件名,就使用第一个
    if (this.lastValues.themeValues[获取当前主题文件夹URL()]) {
      this.lastValues.lastThemeConfigFileName =
        this.lastValues.themeValues[
          获取当前主题文件夹URL()
        ].lastThemeConfigFileName;
      this.lastValues.lastThemeConfigFilePath =
        this.lastValues.themeValues[
          获取当前主题文件夹URL()
        ].lastThemeConfigFilePath;
      this.lastValues.themesCustomCss =
        this.lastValues.themeValues[获取当前主题文件夹URL()].themesCustomCss;
    } else {
      this.lastValues.themesCustomCss = "";
      this.lastValues.lastThemeConfigFileName = "";
      this.lastValues.lastThemeConfigFilePath = "";
    }
    if (!this.lastValues.lastThemeConfigFileName) {
      this.lastValues.lastThemeConfigFileName = this.当前主题配置文件数组[0];
    }
    //如果没有设置过主题文件路径,就使用第一个主题配置文件来生成
    if (!this.lastValues.lastThemeConfigFilePath) {
      this.lastValues.lastThemeConfigFilePath = path.join(
        "/conf",
        获取当前主题文件夹URL(),
        this.lastValues.lastThemeConfigFileName || ""
      );
    }
    if (this.lastValues.lastThemeConfigFilePath) {
      let currentTheme = 获取当前主题文件夹URL().split("/").pop();

      let subDir =
        currentTheme +
        "_" +
        (this.lastValues.lastThemeConfigFileName || "undefined").split(".")[0] +
        "_" +
        btoa(toBinary(this.lastValues.lastThemeConfigFilePath)).substring(
          0,
          16
        );
      this.lastValues.themeProductsPath = path.join(
        this.dataPath,
        "themeProducts",
        subDir
      );
      await 思源工作空间.mkdir(this.lastValues.themeProductsPath);
      if (!(await 思源工作空间.readDir(this.lastValues.themeProductsPath))[0]) {
        await 思源工作空间.writeFile(
          "",
          path.join(this.lastValues.themeProductsPath, "default.css")
        );
        this.lastValues.themeProductName = "default.css";
      }
    }
    if (this.lastValues.lastCommonfigFilePath) {
      let subDir =
        (this.lastValues.lastCommonfigFileName || "undefined").split(".")[0] +
        "_" +
        btoa(toBinary(this.lastValues.lastCommonfigFilePath)).substring(0, 16);
      this.lastValues.commonProductsPath = path.join(
        this.dataPath,
        "commonProducts",
        subDir
      );
      await 思源工作空间.mkdir(this.lastValues.commonProductsPath);
      if (
        !(await 思源工作空间.readDir(this.lastValues.commonProductsPath))[0]
      ) {
        await 思源工作空间.writeFile(
          "",
          path.join(this.lastValues.commonProductsPath, "default.css")
        );
        this.lastValues.commonProductName = "default.css";
      }
    }
    if (this.lastValues.themeProductsPath && this.lastValues.themeProductName) {
      let themesCustomCss = await 思源工作空间.readFile(
        path.join(
          this.lastValues.themeProductsPath,
          this.lastValues.themeProductName || "default.css"
        )
      );
      this.lastValues.themesCustomCss =
        themesCustomCss || this.lastValues.themesCustomCss;
    }
    if (
      this.lastValues.commonProductsPath &&
      this.lastValues.commonProductName
    ) {
      let commonCustomCss = await 思源工作空间.readFile(
        path.join(
          this.lastValues.commonProductsPath,
          this.lastValues.commonProductName || "default.css"
        )
      );
      this.lastValues.commonCustomCss =
        commonCustomCss || this.lastValues.commonCustomCss;
    }
    // console.log(this.lastValues);
  }
  async 获取当前主题配置文件路径(主题配置序号) {
    if (!主题配置序号) {
      主题配置序号 = 0;
    }
    if (this.lastValues.lastThemeConfigFile) {
      主题配置序号 = this.lastValues.lastThemeConfigFile;
    }
    let 主题配置文件数组 = await this.获取当前主题配置文件数组();
    return 获取当前主题文件夹URL() + "/" + 主题配置文件数组[主题配置序号];
  }
  async 获取当前公共配置文件数组() {
    let 公共配置文件夹内容 = await 思源工作空间.readDir(
      path.join(this.dataPath, "commonConfigs")
    );
    return 公共配置文件夹内容
      .filter((item) => {
        return !item.isDir;
      })
      .map((item) => {
        return item.name;
      });
  }
  async 获取当前主题配置文件数组() {
    let 当前主题元数据 = await (await fetch(获取当前主题元数据路径())).json();
    let 主题配置文件数组 = 当前主题元数据["config"];
    if (!主题配置文件数组) {
      this.当前主题配置文件数组 = [];
      return [];
    }
    if (!(主题配置文件数组 instanceof Array)) {
      主题配置文件数组 = [当前主题元数据["config"]];
    }
    this.当前主题配置文件数组 = 主题配置文件数组 || [];
    return this.当前主题配置文件数组;
  }
  //初始化界面是异步的,所以用正在初始化这个变量保存状态,如果初始化还没有完成就不继续了
  async 初始化界面() {
    if (this.正在初始化) {
      return;
    }
    let el = document.getElementById("themeEditorColorPlate");
    el ? el.remove() : null;

    this.正在初始化 = true;
    this.初始化设置css();
    await this.创建配置面板();
    await this.绑定主题配置选择();
    await this.绑定公共配置选择();
    await this.绑定配置产物选择();

    await this.绑定公共配置上传();
    await this.绑定配置产物上传();
    await this.绑定下载();

    await this.绑定真实过滤开关();
    await this.绑定配置文件类型过滤();
    await this.绑定分组过滤();
    await this.绑定次级分组过滤();
    await this.绑定选择器过滤();
    await this.绑定搜索过滤();
    await this.绑定刷新();
    await this.绑定保存();
    await this.绑定代码片段();

    await this.绑定编辑区显示();
  }
  获取标记字符串(action) {
    if (action == "addThemeProducts") {
      let 标记字符串 = btoa(
        toBinary(this.lastValues.lastThemeConfigFilePath)
      ).substring(0, 16);
      let 当前主题名 = 获取当前主题文件夹URL().split("/").pop();
      标记字符串 =
        标记字符串 +
        "," +
        `${当前主题名}下${this.lastValues.lastThemeConfigFileName}配置产物`;
      return 标记字符串;
    } else {
      let 标记字符串 = btoa(
        toBinary(this.lastValues.lastCommonfigFilePath)
      ).substring(0, 16);
      标记字符串 =
        标记字符串 +
        "," +
        `${this.lastValues.lastCommonfigFileName}配置产物`;
      return 标记字符串;
    }
  }
  async 绑定代码片段() {
    this.dock面板元素.querySelectorAll(".cc_add").forEach(async (el) => {
      let action = el.dataset.customAction;
      let 标记字符串 = this.获取标记字符串(action);
      document.querySelectorAll(`#${标记字符串}`).forEach(
        el=>{
          el.dataset.provider = (action=="addThemeProducts")?'theme':'common'
        }
      )
      let 现有代码片段 = await 核心api.getSnippet({ type: "all", enabled: 2 });
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
          let 标记字符串 = this.获取标记字符串(_action);
  
          移除代码片段(标记字符串)
          return
        }
      }
      el.onclick = (e) => {
        let _action = e.currentTarget.dataset.customAction;
        let 标记字符串 = this.获取标记字符串(_action);
       
        if (action == "addThemeProducts") {
          生成css代码片段(
            标记字符串,
            this.lastValues.themesCustomCss,
            "theme",
            this.lastValues.themeProductName
          );
          e.currentTarget.enabled = 1;
          e.currentTarget.style.backgroundColor='var(--b3-theme-primary-light)'
  
        } else {
          生成css代码片段(
            标记字符串,
            this.lastValues.commonCustomCss,
            "common",
            this.lastValues.commonProductName
          );
          e.currentTarget.enabled = 1;
          e.currentTarget.style.backgroundColor='var(--b3-theme-primary-light)'
        }
      };
    });
  }
  绑定编辑区显示() {
    let hiddened;
    this.dock面板元素.querySelector(".hidder").onclick = () => {
      hiddened = !hiddened;
      this.dock面板元素.querySelectorAll(".hiddenable").forEach((el) => {
        el.style.display = hiddened ? "none" : "";
      });
      this.dock面板元素.querySelector(
        ".config__tab-container"
      ).style.maxHeight = hiddened ? "calc(100% - 84px)" : "calc(100% - 210px)";
    };
  }
  绑定真实过滤开关() {
    let 开关 = this.dock面板元素.querySelector('[data-target="真实过滤"]');
    开关.checked = 真实过滤;
    开关.onchange = () => {
      //console.log(开关.checked);
      真实过滤 = 开关.checked ? true : false;

      this.生成css();
    };
  }
  初始化设置css() {
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
        themeEditorStyle.textContent = this.lastValues.commonCustomCss;
      } else {
        themeEditorStyle.textContent = this.lastValues.themesCustomCss;
      }
      document.head.appendChild(themeEditorStyle);
    });
  }
  绑定公共配置上传() {
    let 上传按钮 = this.dock面板元素.querySelector(
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
            path.join(this.dataPath, "commonConfigs", name)
          );
        }
        let lastCommonfigFile = 文件数组[0] ? 文件数组[0].name : null;
        this.lastCommonfigFile = path.join(this.dataPath, lastCommonfigFile);

        await this.初始化();
      } catch (e) {
        await this.初始化();
      }
    };
  }
  绑定配置产物上传() {
    let 上传按钮1 = this.dock面板元素.querySelector(
      '[data-custom-action="upLoadCommonProducts"]'
    );
    let 上传按钮2 = this.dock面板元素.querySelector(
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
              ? this.lastValues.commonProductsPath
              : this.lastValues.themeProductsPath;
          await 思源工作空间.writeFile(file, path.join(_path, name));
          target === 上传按钮1
            ? (this.lastValues.commonProductName = name)
            : (this.lastValues.themeProductName = name);
        }
        await this.保存();
        await this.初始化();
      } catch (e) {
        consoleError(e);
        //await this.初始化();
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
              ? (this.lastValues.commonProductName = name + ".css")
              : (this.lastValues.themeProductName = name + ".css");
          }
          await this.保存();
          await this.初始化();
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
  绑定下载() {
    this.dock面板元素.querySelectorAll(".cc_download").forEach((el) => {
      el.onclick = (e) => {
        this.download(e.currentTarget.dataset.customAction);
      };
    });
  }
  async download(type) {
    let fileName;
    let content;
    let mime;
    switch (type) {
      case "downloadCommonProducts":
        fileName = this.lastValues.commonProductName || "default.css";
        content = await 思源工作空间.readFile(
          path.join(this.lastValues.commonProductsPath, fileName)
        );
        mime = "text/css";
        break;
      case "downloadThemeProducts":
        fileName = this.lastValues.themeProductName || "default.css";
        content = await 思源工作空间.readFile(
          path.join(this.lastValues.themeProductsPath, fileName)
        );
        mime = "text/css";

        break;
      case "downloadConfigs":
        fileName = this.lastValues.lastCommonfigFileName;
        content = await 思源工作空间.readFile(
          this.lastValues.lastCommonfigFilePath
        );
        mime = "application/javascript";

        break;
    }
    if (fileName && content && mime) {
      核心api.pushMsg({
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
      核心api.pushErrMsg({
        msg: "文件内容是空的，不能下载",
        timeout: 1000,
      });
    }
  }
  绑定搜索过滤() {
    this.dock面板元素.querySelector(".b3-filter").onchange = () => {
      Array.from(
        this.dock面板元素.querySelectorAll(".config__tab-container .b3-label")
      ).forEach((formItemEl) => {
        let flag = false;
        if (
          formItemEl
            .querySelector(".b3-label__text")
            .innerText.indexOf(
              this.dock面板元素.querySelector(".b3-filter").value
            ) > -1
        ) {
          flag = true;
        }
        if (
          formItemEl
            .querySelector(".b3-label__name")
            .innerText.indexOf(
              this.dock面板元素.querySelector(".b3-filter").value
            ) > -1
        ) {
          flag = true;
        }
        !flag
          ? formItemEl.classList.add("fn__none")
          : formItemEl.classList.remove("fn__none");
        真实过滤 ? this.生成css() : null;
      });
    };
  }

  async 绑定主题配置选择() {
    let selector = this.dock面板元素.querySelector(".configFileTheme");
    selector.innerHTML = "";
    let 主题配置文件数组 = await this.获取当前主题配置文件数组();
    if (主题配置文件数组 && 主题配置文件数组[0]) {
      for (let i = 0, length = 主题配置文件数组.length; i < length; i++) {
        selector.innerHTML += `<option value='${i}'>${主题配置文件数组[i]}</option>`;
      }
    } else {
      selector.innerHTML += `<option value='-1'>当前主题没有提供配置文件</option>`;
    }
    selector.onchange = async () => {
      this.lastValues.lastThemeConfigFileName =
        主题配置文件数组[selector.value];
      this.lastValues.lastThemeConfigFilePath = path.join(
        "conf",
        获取当前主题文件夹URL(),
        this.lastValues.lastThemeConfigFilePath
      );
      await this.保存();
      await this.初始化();
    };
  }
  async 绑定配置产物选择() {
    let selector1 = this.dock面板元素.querySelector(".puductTheme");
    let selector2 = this.dock面板元素.querySelector(".puductCommon");

    selector1.innerHTML = "";
    selector2.innerHTML = "";
    let 主题产物数组 = await 思源工作空间.readDir(
      this.lastValues.themeProductsPath
    );
    let 公共产物数组 = await 思源工作空间.readDir(
      this.lastValues.commonProductsPath
    );
    主题产物数组.forEach((主题产物) => {
      selector1.innerHTML += `<option value='${主题产物.name}' ${
        主题产物.name == this.lastValues.themeProductName ? "selected" : ""
      }>${主题产物.name}</option>`;
    });
    公共产物数组.forEach((公共产物) => {
      selector2.innerHTML += `<option 
      value='${公共产物.name}' 
      ${公共产物.name == this.lastValues.commonProductName ? "selected" : ""}
      >${公共产物.name}</option>`;
    });
    let 读取配置产物 = async (e) => {
      let name = e.currentTarget.value;
      let type = e.currentTarget.classList.contains("puductTheme")
        ? "theme"
        : "common";
      let dirname =
        type === "theme"
          ? this.lastValues.themeProductsPath
          : this.lastValues.commonProductsPath;
      let key = type === "theme" ? "themesCustomCss" : "commonCustomCss";
      let _path = path.join(dirname, name);
      let cssContent = await 思源工作空间.readFile(_path);
      this.lastValues[key] = cssContent;
      key = type === "theme" ? "themeProductName" : "commonProductName";
      this.lastValues[key] = name;

      await this.保存();
      await this.初始化();
    };
    selector2.onchange = selector1.onchange = 读取配置产物;
  }
  async 绑定公共配置选择() {
    let selector = this.dock面板元素.querySelector(".configFileCommon");
    selector.innerHTML = "";
    let 公共配置文件数组 = await this.获取当前公共配置文件数组();
    if (公共配置文件数组) {
      for (let i = 0, length = 公共配置文件数组.length; i < length; i++) {
        if (公共配置文件数组[i] == this.lastValues.lastCommonfigFileName) {
          selector.innerHTML += `<option value='${i}' selected>${公共配置文件数组[i]}</option>`;
          selector.value = i;
        } else {
          selector.innerHTML += `<option value='${i}'>${公共配置文件数组[i]}</option>`;
        }
      }
    } else {
      selector.innerHTML += `<option value='-1'>当前没有公共配置文件,正在重新生成</option>`;
      await this.复制默认公共配置文件();
    }
    selector.onchange = async () => {
      this.lastValues.lastCommonfigFileName = 公共配置文件数组[selector.value];
      this.lastValues.lastCommonfigFilePath = path.join(
        this.dataPath,
        "commonConfigs",
        this.lastValues.lastCommonfigFileName
      );
      await this.保存();
      await this.初始化();
    };
  }

  async 复制默认公共配置文件() {
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
   /* let 默认配置文件内容 = await 思源工作空间.readFile(
      path.join("data", "plugins", "themeEditor", "defaultConfig.js")
    );
    await 思源工作空间.writeFile(
      默认配置文件内容,
      path.join(
        "data",
        "storage",
        "petal",
        "themeEditor",
        "commonConfigs",
        "defaultConfig.js"
      )
    );*/
  }
  绑定分组过滤() {
    let selector = this.dock面板元素.querySelector(".b3-filter-group");

    this.groups.forEach((group) => {
      if (selector.querySelector(`[value="${group}"]`)) {
        return;
      }
      selector.innerHTML += `<option value="${group}">${Lute.EscapeHTMLStr(
        group
      )}</option>`;
    });
    let searchCurrent = () => {
      this.currentGroup = selector.value;
      this.过滤显示({ key: "group", value: selector.value });
      this.绑定次级分组过滤();
      真实过滤 ? this.生成css() : null;
    };
    selector.addEventListener("change", searchCurrent);
    searchCurrent();
  }
  绑定次级分组过滤() {
    let selector = this.dock面板元素.querySelector(".b3-filter-subgroup");
    if (this.currentGroup) {
      selector.innerHTML = `          <option value="">全部</option>
      <option value="基础">基础</option>
      `;
      let items = this.dock面板元素.querySelectorAll(
        `[data-group="${this.currentGroup}"]`
      );
      this.subGroups = [];
      items.forEach((item) => {
        this.subGroups.push(item.dataset.subGroup);
      });
      this.subGroups = Array.from(new Set(this.subGroups));
    } else {
      selector.innerHTML = `          <option value="">全部</option>
      <option value="基础">基础</option>
      `;

      let items = this.dock面板元素.querySelectorAll(`[data-group]`);
      this.subGroups = [];
      items.forEach((item) => {
        this.subGroups.push(item.dataset.subGroup);
      });
      this.subGroups = Array.from(new Set(this.subGroups));
    }
    this.subGroups.forEach((subGroup) => {
      if (selector.querySelector(`[value="${subGroup}"]`)) {
        return;
      }
      selector.innerHTML += `<option value="${subGroup}">${Lute.EscapeHTMLStr(
        subGroup
      )}</option>`;
    });
    let searchCurrent = () => {
      this.过滤显示({ key: "subGroup", value: selector.value });
      真实过滤 ? this.生成css() : null;
    };
    selector.addEventListener("change", searchCurrent);
    searchCurrent();
  }
  绑定选择器过滤() {
    let selector = this.dock面板元素.querySelector(".b3-filter-selectortext");

    this.selectors.forEach((selectorText) => {
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
      this.过滤显示({ key: "selectortext", value: Lute.EscapeHTMLStr(
        selector.value
      ) });

      真实过滤 ? this.生成css() : null;
    };
    selector.addEventListener("change", searchCurrent);
    searchCurrent();
  }
  绑定配置文件类型过滤() {
    let selector = this.dock面板元素.querySelector(".configFileType");
    selector.value = this.configFileType ? this.configFileType : selector.value;
    let searchCurrent = () => {
      this.过滤显示({ key: "config", value: selector.value });
    };
    selector.addEventListener("change", searchCurrent);
    searchCurrent();
  }
  过滤显示(属性对象) {
    this.显示过滤条件[属性对象.key] =
      属性对象.value !== "0" ? 属性对象.value : undefined;
    let formItemEls = this.dock面板元素.querySelectorAll("[data-config]");
    formItemEls.forEach((el) => {
      let flag = true;
      Object.getOwnPropertyNames(this.显示过滤条件).forEach((name) => {
        if (
          this.显示过滤条件[name] &&
          this.显示过滤条件[name] !== el.dataset[name]
        ) {
          flag = false;
        }
      });
      el.style.display = flag ? "" : "none";
    });
  }
  async 创建配置面板() {
    if (!Pickr) {
      Pickr = (await import(this.selfURL + "/pickr-esm2022.js"))["default"];
    }
    this.dock面板元素.querySelector(".config__tab-container").innerHTML = "";
    this.formItems = [];
    await this.生成主题设置条目();
    await this.生成通用设置条目();
  }
  async 生成主题设置条目() {
    if (!this.lastValues.lastThemeConfigFilePath) {
      return;
    }
    let 当前主题配置内容 = await 获取配置文件内容(
      this.lastValues.lastThemeConfigFilePath
    );
    if (!当前主题配置内容) {
      return;
    }
    合并主题配置(当前主题配置内容, "theme");
    this.当前主题配置内容 = 当前主题配置内容;
    this.生成设置条目(this.当前主题配置内容, "theme");
  }
  async 生成通用设置条目() {
    let 当前通用配置内容 = await 获取配置文件内容(
      this.lastValues.lastCommonfigFilePath
    );
    if (!当前通用配置内容) {
      consoleError(
        `获取当前通用设置:${this.lastValues.lastCommonfigFilePath}失败,请检查文件是否存在`
      );
      return;
    }
    合并主题配置(当前通用配置内容, "common");
    this.当前通用配置内容 = 当前通用配置内容;
    this.生成设置条目(this.当前通用配置内容, "common");
  }
  生成css() {
    this.lastValues.commonCustomCss = 计算css.bind(this)(
      this.当前通用配置内容,
      "common"
    );
    this.lastValues.themesCustomCss = 计算css.bind(this)(
      this.当前主题配置内容,
      "theme"
    );
  }
  生成设置条目(设置内容, 设置类型) {
    (this.groups = []), (this.subGroups = []);

    设置内容.forEach((item) => {
      try {
        let formItem = new FormItem(
          item,
          this.dock面板元素.querySelector(".config__tab-container"),
          () => {
            this.生成css();
            /*if (设置类型 == "common") {
            this.lastValues.commonCustomCss = 计算css(设置内容, 设置类型);
          } else {
            this.lastValues.themesCustomCss = 计算css(设置内容, 设置类型);
          }*/
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
        item.group ? this.groups.push(item.group) : null;
        formItem.element.setAttribute(
          "data-sub-group",
          item.subGroup || "基础"
        );
        item.subGroup ? this.subGroups.push(item.subGroup) : null;
        formItem.element.setAttribute(
          "data-selectortext",
          Lute.EscapeHTMLStr(item.selector) || ":root"
        );
        item.selector && item.selector !== ":root"
          ? this.selectors.push(item.selector)
          : null;
        if (item.selector) {
          this.selectors.push(item.selector);
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
        this.groups = Array.from(new Set(this.groups));
        this.subGroups = Array.from(new Set(this.subGroups));
        this.selectors = Array.from(new Set(this.selectors));
        //console.log(this);
        this.formItems.push(formItem);
      } catch (e) {
        consoleError(`配置界面生成失败：${e}`);
      }
    });
  }

  绑定刷新() {
    this.dock面板元素.querySelector('[data-type="refresh"]').addEventListener(
      "click",
      async () => {
        this.lastValues.commonCustomCss = "";
        this.lastValues.themesCustomCss = "";
        await this.初始化();
      },
      { once: true }
    );
    this.dock面板元素.querySelector('[data-type="trash"]').addEventListener(
      "click",
      async () => {
        this.lastValues.commonCustomCss = "";
        this.lastValues.themesCustomCss = "";
        await this.保存();

        await this.初始化();
      },
      { once: true }
    );
    this.dock面板元素.querySelector('[data-type="clear"]').addEventListener(
      "click",
      async () => {
        this.lastValues.commonCustomCss = "";
        this.lastValues.themesCustomCss = "";
        await this.初始化界面();
      },
      { once: true }
    );
  }
  绑定保存() {
    let a = async () => {
      await this.保存();
      await this.初始化界面();
    };
    this.dock面板元素
      .querySelector('[data-type="save"]')
      .removeEventListener("click", a);
    this.dock面板元素
      .querySelector('[data-type="save"]')
      .addEventListener("click", a);
    this.正在初始化 = false;
  }
  async 保存() {
    this.lastValues.themeValues[获取当前主题文件夹URL()] =
      this.lastValues.themeValues[获取当前主题文件夹URL()] || {};
    this.lastValues.themeValues[
      获取当前主题文件夹URL()
    ].lastThemeConfigFileName = this.lastValues.lastThemeConfigFileName;
    this.lastValues.themeValues[
      获取当前主题文件夹URL()
    ].lastThemeConfigFilePath = this.lastValues.lastThemeConfigFilePath;
    this.lastValues.themeValues[获取当前主题文件夹URL()].themesCustomCss =
      this.lastValues.themesCustomCss;
    //console.log(this.lastValues);
    await 思源工作空间.writeFile(
      this.lastValues.commonCustomCss,
      path.join(
        this.lastValues.commonProductsPath,
        this.lastValues.commonProductName || "default.css"
      )
    );
    await 思源工作空间.writeFile(
      this.lastValues.themesCustomCss,
      path.join(
        this.lastValues.themeProductsPath,
        this.lastValues.themeProductName || "default.css"
      )
    );
    await 思源工作空间.writeFile(
      JSON.stringify(this.lastValues, undefined, 2),
      path.join(this.dataPath, "lastValues.json")
    );
  }
  onUnload() {}
}
module.exports = themeEditor;

//计算css的工具方法
function 计算css(配置内容, 设置类型) {
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
          ? this.lastValues.lastThemeConfigFilePath
          : this.lastValues.lastCommonfigFilePath;
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
//获取当前配置的工具函数
function 获取当前主题文件夹URL() {
  let currentThemeURL = (
    window.parent.document.getElementById("themeStyle")
      ? window.parent.document.getElementById("themeStyle")
      : window.parent.document.getElementById("themeDefaultStyle")
  ).getAttribute("href");
  currentThemeURL = currentThemeURL
    .split("/")
    .slice(0, currentThemeURL.split("/").length - 1)
    .join("/");
  return currentThemeURL;
}
function 获取当前主题元数据路径() {
  return 获取当前主题文件夹URL() + "/theme.json";
}

async function 获取配置文件内容(配置文件路径) {
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
//兼容json与esm格式配置
async function 读取json配置(配置文件路径) {
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

class FormItem {
  constructor(Item, container, cb, destroyCb) {
    this.cb = cb;
    this.destroyCb = destroyCb ? destroyCb : () => {};
    this.container = container;
    this.element = document.createElement("label");
    this.element.setAttribute("class", "fn__flex b3-label");
    this.element.innerHTML = `
        <div class="fn__flex-1">
        <span class="b3-label__name">${Item.name}</span>
        <div class="b3-label__text">${Item.label}</div>
    </div>
    <span class="fn__space"></span>
        `;
    this.inputter = new FormIpputer(Item, this);
    this.element.appendChild(this.inputter.element);
    container.appendChild(this.element);
  }
  destroy() {
    if (this.pickrs) {
      this.pickrs.forEach((pickr) => {
        pickr.destroy();
        pickr = undefined;
      });
      this.pickrs = undefined;
      this.destroyCb();
    }
  }
}

/*UI元素*/
class FormIpputer {
  constructor(options, formItem) {
    this.options = options;
    this.formItem = formItem;
    this.element = this.buildElement(options);
  }
  buildElement(options) {
    let element = document.createElement("input");
    switch (options.type) {
      case "boolean":
        batchSetAttribute(element, {
          class: "b3-switch fn__flex-center",
          type: "checkbox",
          value: options.value || options.default,
        });
        element.addEventListener("change", () => {
          options.value = element.checked;
          this.formItem.cb.bind(this.formItem)(options);
        });
        break;
      case "string":
        element = document.createElement("textarea");
        element.value = options.value || options.default || "";
        batchSetAttribute(element, {
          class: "b3-text-field fn__flex-center fn__size200",
          value: options.value || options.default || "",
        });
        element.addEventListener("change", () => {
          options.value = element.value;
          this.formItem.cb.bind(this.formItem)(options);
        });
        break;
      case "number":
        element = document.createElement("span");
        batchSetAttribute(element, {
          class: "b3-tooltips b3-tooltips__w",
          "aria-label": options.value || options.default || 0,
        });
        element.innerHTML = "<input></input>";
        batchSetAttribute(element.querySelector("input"), {
          class: "b3-slider ",
          value: options.value || options.default || 0,
          style: "box-sizing: border-box",
          type: "range",
        });
        element.querySelector("input").max= options.max || 100,
        element.querySelector("input").min= options.min || 1,
        element.querySelector("input").step=options.step||1,

        element.querySelector("input").addEventListener("mousemove", () => {
          element.setAttribute(
            "aria-label",
            element.querySelector("input").value+ (options.unit || "px")
          );
          options.value =
          element.querySelector("input").value + (options.unit || "px");

          this.formItem.cb.bind(this.formItem)(options);
        });
        element.querySelector("input").addEventListener("change", () => {
          options.value =
            element.querySelector("input").value + (options.unit || "px");
          this.formItem.cb.bind(this.formItem)(options);
        });
        break;
      case "select":
        let isFont = options.subtype == "fonts";

        element = document.createElement("select");
        if (options.options) {
          options.options.forEach((item, index) => {
            element.innerHTML += `
              <option 
              value="${item.value || item}"
              ${isFont ? `style="font-family:${item.value || item || ""}"` : ""}
              >${item.label || item.value || item}</option>
              `;
          });
        }
        batchSetAttribute(element, {
          class: "b3-select fn__flex-center fn__size200",
        });
        if (options.multiple) {
          let values = [];
          element.innerHTML += `
          <option value="" style='display:none' class='realValue'></option>
          `;
          let realValueOption = element.querySelector(".realValue");
          element.addEventListener("input", (e) => {
            element
              .querySelectorAll(`[value="${element.value}"]`)
              .forEach((option) => {
                if (values.includes(option.value)) {
                  values.splice(values.indexOf(option.value), 1);
                  option.style.backgroundColor = "";
                } else {
                  values.push(option.value);
                  option.style.backgroundColor =
                    "var(--b3-card-info-background)";
                  option.style.color = "var(--b3-card-info-color)";
                }
                realValueOption.value = values.join(",");
                realValueOption.text = realValueOption.value;
                element.options[element.options.length - 1].selected = true;
                element.value = realValueOption.value;
                options.value = element.value;
                this.formItem.cb.bind(this.formItem)(options);
              });
          });
        } else {
          element.addEventListener("change", () => {
            options.value = element.value;
            this.formItem.cb.bind(this.formItem)(options);
          });
        }
        break;
      case "color":
        element = document.createElement("div");
        this.formItem.container.appendChild(this.formItem.element);
        this.formItem.element.appendChild(element);
        let themeEditorColorPlate = document.getElementById(
          "themeEditorColorPlate"
        );
        if (!themeEditorColorPlate) {
          themeEditorColorPlate = document.createElement("div");
          themeEditorColorPlate.setAttribute("id", "themeEditorColorPlate");
          document.body.appendChild(themeEditorColorPlate);
        }
        let pickr = new Pickr({
          container: themeEditorColorPlate,
          el: element,
          theme: "classic",
          default: options.value || options.default || "blue",
          comparison: false,
          components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
              input: true,
            },
          },
        });
        if (!this.formItem.pickrs) {
          this.formItem.pickrs = [];
        }
        this.formItem.pickrs.push(pickr);

        pickr.on("change", async (color, source, instance) => {
          options.value = color.toRGBA().toString();
          element.value = options.value;
          const event = new Event("change", {
            bubbles: true,
            cancelable: false,
          });

          element.dispatchEvent(event);
          this.formItem.cb.bind(this.formItem)(options);
        });

        break;
      default:
        if (options.render) {
          element = options.render(options, this.formItem);
          element.addEventListener("change", () => {
            options.value = element.value;
            this.formItem.cb.bind(this.formItem)(options);
          });
        } else {
          element = document.createElement("textarea");
          element.value = options.value || options.default || "";
          batchSetAttribute(element, {
            class: "b3-text-field fn__flex-center fn__size200",
            value: options.value || options.default || "",
          });
          element.addEventListener("change", () => {
            options.value = element.value;
            this.formItem.cb.bind(this.formItem)(options);
          });
        }
    }
    if (element.tagName == "TEXTAREA") {
      batchSetAttribute(this.formItem.element, {
        class: "fn__flex-column b3-label",
        style: "min-height:0 !important",
      });
      batchSetAttribute(element, {
        style: "max-width:100% !important;width:100%;min-width:100%",
      });

      this.formItem.element.innerHTML += '<div class="fn__hr"></div>';
    }
    if (!options.subtype == "@import") {
      element.addEventListener("change", () => {
        try {
          let name = options.name;
          if (options.as) {
            //console.log(options.as);
            name = options.as;
          }
          CSSStyleValue.parse(name, element.value);
          this.formItem.element.style.backgroundColor = "";
          this.formItem.element
            .querySelectorAll(".item-error-container")
            .forEach((el) => {
              el.remove();
            });
        } catch (e) {
          this.formItem.element.style.backgroundColor =
            "var(--b3-card-error-background)";
          if (!this.formItem.element.querySelector(".item-error-container")) {
            this.formItem.element
              .querySelector(".b3-label__text")
              .insertAdjacentHTML(
                "beforeend",
                `<div class="item-error-container">${e}</div>`
              );
          } else {
            this.formItem.element.querySelector(
              ".item-error-container"
            ).innerText = e;
          }
        }
      });
    }

    return element;
  }
}
function batchSetAttribute(element, attributes) {
  Object.getOwnPropertyNames(attributes).forEach((name) => {
    element.setAttribute(name, attributes[name]);
  });
}
//将配置文件的声明和当前主题的实际值进行混合
function 合并主题配置(原始主题配置, 配置类型) {
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
function testselector(selector) {
  if (selector === ":root") {
    return;
  }
  let tempstyle = window.document.createElement("style");
  tempstyle.innerHTML =
    selector + "{border:dashed 2px blue;background-color:yellow}";
  tempstyle.setAttribute("id", "tempstyle");
  document.head.appendChild(tempstyle);
  setTimeout(() => {
    tempstyle.remove();
  }, 1000);
}

if (!window.parent.document.querySelector("#noobIcon")) {
  window.parent.document.body.insertAdjacentHTML(
    "afterbegin",
    `<svg 
  aria-hidden="true" 
  style="position: 
  absolute; 
  width: 0; 
  height: 0; 
  overflow: hidden;" 
  version="1.1" 
  id="noobIcon"
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="iconPublish" viewBox="0 0 900 900">
        <path 
        d="M924.145781 233.089709l0-3.215228-0.642636-0.642636 0-2.571568-0.642636-0.642636 0-0.642636-0.642636-0.642636-0.642636 0-0.642636-0.642636 0-0.642636-1.928932-1.928932 0-0.642636-0.642636-0.642636 0-1.286296-1.928932 0-0.642636-0.642636-1.286296 0-0.642636-0.642636 0-0.642636-0.642636 0 0-0.642636-0.642636 0-0.642636-0.642636-0.642636 0 0-0.642636-2.571568 0 0-0.642636-5.14416 0-0.642636 0.642636-0.642636 0 0 0.642636-1.286296 0-0.642636 0.642636-1.286296 0L112.707968 515.999081c-10.287297 3.857864-15.431457 14.788821-11.573593 25.718755 2.571568 5.786797 7.073092 9.644661 12.216229 11.573593l235.972363 94.517677 24.433482 135.667889c1.928932 10.930957 12.216229 17.36039 22.50455 16.074094 4.500501-0.642636 8.358365-3.215228 10.930957-6.429433l87.444585-87.444585 178.104397 71.370491c10.287297 3.857864 21.218254-0.642636 25.718755-10.287297l223.756133-523.383258 0.642636-0.642636 0-0.642636 0-1.286296 0-5.14416L924.145781 233.089709 924.145781 233.089709zM364.112812 610.516758 364.112812 610.516758l-190.32165-75.870991 604.39841-230.829226L364.112812 610.516758 364.112812 610.516758zM405.263024 738.468918 405.263024 738.468918l-12.859889-74.585719 62.368466 25.076118L405.263024 738.468918 405.263024 738.468918zM670.169369 733.325781 670.169369 733.325781 406.54932 627.877147l452.012767-334.347904L670.169369 733.325781 670.169369 733.325781z" 
        p-id="3328">
        </path>
    </symbol>
  </defs>
  <defs>
    <symbol id="iconBrush" viewBox="0 0 1024 1024">
    <path d="M678.656 141.013333a93.866667 93.866667 0 0 1 108.373333 17.621334l78.421334 78.421333a93.866667 93.866667 0 0 1-0.042667 132.693333l-84.48 84.48 45.312 45.312a128.085333 128.085333 0 0 1 5.717333 174.805334l-5.76 6.144-120.618666 120.746666-0.085334-0.042666-90.453333 90.496a128 128 0 0 1-174.933333 5.76l-6.101334-5.76L132.266667 590.08a128 128 0 0 1 0-181.034667l90.453333-90.538666 120.746667-120.746667a128 128 0 0 1 180.992 0.085333l45.269333 45.226667 89.344-89.258667 13.354667-9.642666zM301.226667 396.928a25.6 25.6 0 0 0-36.181334 0L192.64 469.333333l-3.541333 4.010667a42.666667 42.666667 0 0 0 3.541333 56.32l301.653333 301.653333 4.053334 3.584a42.666667 42.666667 0 0 0 56.32-3.541333l72.405333-72.405333a25.6 25.6 0 0 0 0-36.181334z m423.253333-179.626667a8.533333 8.533333 0 0 0-7.68 0l-2.176 1.621334-144.853333 144.810666-105.6-105.6-4.010667-3.541333a42.666667 42.666667 0 0 0-56.32 3.541333l-42.24 42.24a25.6 25.6 0 0 0 0 36.181334l325.845333 325.888 3.541334 2.986666a25.6 25.6 0 0 0 32.64-2.986666l42.24-42.24 3.498666-4.053334c13.013333-16.725333 11.818667-40.96-3.541333-56.32l-105.557333-105.6 144.810666-144.810666 1.578667-2.176a8.533333 8.533333 0 0 0-1.578667-9.856L726.613333 218.88z" p-id="3299"></path>
    </symbol>
  </defs>
  <defs>
    <symbol id="iconPlugin" viewBox="0 0 1024 1024">
    <path d="M276 854.848h32-32z m0-68.576h-32 32zM96 603.424H64h32zM492 205.76h-32 32zM600 96v32-32z m108 109.728h-32 32z m-288 73.12v-32 32z m-72 0v32-32z m432 0v32-32z m76 0v-32 32zM276 420.576h32-32z m0-68.576h-32 32zM928 854.72h-32 32z m0-502.624h-32 32zM348.096 928v32-32z m143.904-73.152h-32 32z m216 0h-32 32z m0 73.152h-32a32 32 0 0 0 32 32v-32z m-216 0v32a32 32 0 0 0 32-32h-32z m364.448 0l0.096 32h0.128l-0.256-32z m-0.704-32a32 32 0 1 0 0.256 64l-0.256-64zM308 854.848v-68.576h-64v68.576h64z m-104-173.696C162.496 681.152 128 646.816 128 603.424H64c0 77.792 62.208 141.728 140 141.728v-64zM128 603.424c0-43.392 34.496-77.696 76-77.696v-64C126.208 461.728 64 525.632 64 603.424h64zM524 205.76C524 162.304 558.496 128 600 128V64c-77.792 0-140 63.936-140 141.728h64zM600 128c41.504 0 76 34.304 76 77.728h64C740 127.936 677.792 64 600 64v64z m-180 118.848h-72v64h72v-64z m360 64h76v-64h-76v64z m-472 109.728V352h-64v68.576h64zM960 854.72V352.096h-64V854.72h64zM348 246.848c-57.92 0-104 47.584-104 105.152h64c0-23.2 18.4-41.152 40-41.152v-64z m508 64c21.568 0 40 17.984 40 41.248h64c0-57.568-46.048-105.248-104-105.248v64zM204 525.76c57.92 0 104-47.584 104-105.152h-64c0 23.2-18.4 41.152-40 41.152v64z m472-320c0 57.6 46.08 105.12 104 105.12v-64c-21.632 0-40-17.92-40-41.12h-64zM308 786.24c0-57.6-46.08-105.12-104-105.12v64c21.632 0 40 17.92 40 41.12h64z m152-580.544c0 23.2-18.368 41.12-40 41.12v64c57.92 0 104-47.552 104-105.12h-64z m-216 649.12c0 57.664 46.272 105.152 104.096 105.152v-64c-21.664 0-40.096-18.016-40.096-41.152h-64z m280 0c0-43.392 34.496-77.696 76-77.696v-64c-77.792 0-140 63.904-140 141.696h64z m76-77.696c41.504 0 76 34.304 76 77.696h64c0-77.76-62.208-141.696-140-141.696v64z m76 77.696V928h64v-73.152h-64z m-216 0V928h64v-73.152h-64zM348.096 960h143.904v-64h-143.904v64zM896 854.72c0 23.104-18.336 41.12-39.808 41.28l0.48 64C914.24 959.552 960 912.096 960 854.72h-64zM856.32 896h-0.576l0.256 64h0.544l-0.224-64z m-148.32 64h148.448v-64h-148.448v64z" fill="#000000" p-id="2197"></path>
    </symbol>
  </defs>
  </svg>`
  );
}
function 注册图标(图标设置) {
  let naive图标元素 = window.parent.document.querySelector("#noobIcon");
  let viewBox = 图标设置.viewBox || "0 0 1024 1024";
  naive图标元素.innerHTML += `
    <defs>
        <symbol id="${图标设置.id}" viewBox="${viewBox}">
            ${图标设置.content || 图标设置.element.innerHTML}
        </symbol>
    </defs>
    `;
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
function isColor(value) {
  let namedColors = new Set([
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
  ]);
  /*try {
    CSSStyleValue.parse("color", value);
    return "color";
  } catch (e) {}*/
  if (
    value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ||
    value.match(
      /^rgb\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)$/
    ) ||
    value.match(
      /^rgba\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*([01]{1}|[0-9]{1,2}\.[0-9]{1,2}|100)\s*\)$/
    ) ||
    value.match(
      /^hsl\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*\)$/
    ) ||
    value.match(
      /^hsla\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*,\s*([01]{1}|[0-9]{1,2}\.[0-9]{1,2}|100)\s*\)$/
    ) ||
    namedColors.has(value.toLowerCase())
  ) {
    return "color";
  } else if (value.startsWith("#")) {
    try {
      CSSStyleValue.parse("color", value);
      return "color";
    } catch (e) {}
  }
}
function isVarUse(value) {
  return value.match(/^var\((--[\w-]+)\)/);
}

function getUnit(value) {
  if (value === 0) return "";
  const units = [
    "px",
    "rem",
    "em",
    "vw",
    "vh",
    "%",
    "cm",
    "mm",
    "in",
    "pt",
    "pc",
    "ex",
    "ch",
  ];
  for (let i = 0; i < units.length; i++) {
    if (String(value).endsWith(units[i])) {
      return units[i];
    }
  }
  return "";
}
async function 移除代码片段(标记字符串) {
  let 现有代码片段 = await 核心api.getSnippet({ type: "all", enabled: 2 });
  let 存在元素索引 = 现有代码片段.snippets.findIndex((item) =>
    item.content.startsWith(`/*${标记字符串}*/`)
  );
  if (存在元素索引 >= 0) {
    现有代码片段.snippets.splice(存在元素索引, 1);
    await 核心api.setSnippet(现有代码片段);
    window.location.reload();
  }
}
async function 生成css代码片段(标记字符串, css内容, 类型, 名称) {
  let 现有代码片段 = await 核心api.getSnippet({ type: "all", enabled: 2 });
  let id = Lute.NewNodeID() + "themeEditor";
  let 存在元素索引 = 现有代码片段.snippets.findIndex((item) =>
    item.content.startsWith(`/*${标记字符串}*/`)
  );
  let 判断主题函数内容 = `if(获取当前主题文件夹URL()==\`${获取当前主题文件夹URL()}\`)`;
  类型 == "common" ? (判断主题函数内容 = "if(true)") : null;
  let 代码片段内容 = `/*${标记字符串}*/
    ${生成元素.toString()}
    ${获取当前主题文件夹URL.toString()}

    ${判断主题函数内容}{
      
    
    document.head.appendChild(
      生成元素(
        "style",
        {
          id: \`${Lute.EscapeHTMLStr(标记字符串)}\`,
          "data-provider":'${类型}'
        },
        \`${css内容}\`
      )
    )
      }
  `;
  if (存在元素索引 >= 0) {
    // 如果元素已存在，则替换元素value
    现有代码片段.snippets[存在元素索引].content =
      `/*${标记字符串}*/\n` + 代码片段内容;
    现有代码片段.snippets[存在元素索引].name = 名称;
    id = 现有代码片段.snippets[存在元素索引].id;
    if (现有代码片段.snippets[存在元素索引].enabled) {
      await 核心api.setSnippet(现有代码片段);
      window.location.reload();
    } else {
      现有代码片段.snippets[存在元素索引].enabled = true;
      await 核心api.setSnippet(现有代码片段);
      document.head.appendChild(
        生成元素(
          "script",
          {
            id: `snippetJS${id}`,
            type: "text/javascript",
          },
          代码片段内容
        )
      );
    }
  } else {
    // 否则添加新元素
    现有代码片段.snippets.push({
      id: id,
      content: 代码片段内容,
      name: 名称,
      type: "js",
      enabled: true,
    });
    await 核心api.setSnippet(现有代码片段);
    document.head.appendChild(
      生成元素(
        "script",
        {
          id: `snippetJS${id}`,
          type: "text/javascript",
        },
        代码片段内容
      )
    );
  }
}
function 生成元素(标签, 属性对象, 内容) {
  let 元素 = document.createElement(标签);
  Object.getOwnPropertyNames(属性对象).forEach((属性名) =>
    元素.setAttribute(属性名, 属性对象[属性名])
  );
  元素.innerHTML = 内容;
  return 元素;
}
function kebabToCamel(str) {
  const arr = str.split('-');
  let camelStr = '';
  
  for (let i = 0; i < arr.length; i++) {
    const word = arr[i];
    camelStr += i === 0 ? word : word[0].toUpperCase() + word.slice(1); 
  }
  
  return camelStr;
}