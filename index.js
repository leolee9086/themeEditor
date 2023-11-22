const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
globalThis[Symbol.for(`clientApi`)] = globalThis[Symbol.for(`clientApi`)] || clientApi
let path;
let 思源工作空间;
let importDep;
let 核心api
class themeEditor extends Plugin {
  onload() {
    //初始化界面容器
    this.初始化同步状态()
    //初始化数据,实际加载界面
    this.初始化异步状态()
  }
  初始化同步状态(){
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
    this.暂存的css样式 = {}
    this.暂存的css样式字符串 = ""
    this.系统字体列表 = []
    this.pickrs = []
    this.收藏的css渐变=[]
    this.groups = [];
    this.subGroups = [];
    this.selectors = [];
    this.创建配置Dock容器();
    this.注册图标()
  }

  async 初始化异步状态(){
    this.收藏样式映射表 = await this.loadData('styles')
    this.收藏的css渐变 = (await this.loadData('gradients'))||[
        {
            id:1,css:'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
        },
        {
            id:2,css:'linear-gradient(90deg, #99999915 1px, transparent 0), linear-gradient(#99999915 1px, transparent 0)'
        },
    ]
    clientApi.fetchPost('/api/system/getSysFonts', {},
        data => {
            this.系统字体列表 = data.data
        }
    )
    await import(`/plugins/${this.name}/source/UI/menu/blockicon.js`)
    await import(`/plugins/${this.name}/source/events/index.js`)

    this.初始化();
  }
  注册图标() {
    this.addIcons(
      `<symbol id="iconThemeEditor" viewBox="0 0 24 24">
         <path d="M8.997 13.985c.01 1.104-.88 2.008-1.986 2.015-1.105.009-2.005-.88-2.011-1.984-.01-1.105.879-2.005 1.982-2.016 1.106-.007 2.009.883 2.015 1.985zm-.978-3.986c-1.104.008-2.008-.88-2.015-1.987-.009-1.103.877-2.004 1.984-2.011 1.102-.01 2.008.877 2.012 1.982.012 1.107-.88 2.006-1.981 2.016zm7.981-4.014c.004 1.102-.881 2.008-1.985 2.015-1.106.01-2.008-.879-2.015-1.983-.011-1.106.878-2.006 1.985-2.015 1.101-.006 2.005.881 2.015 1.983zm-12 15.847c4.587.38 2.944-4.492 7.188-4.537l1.838 1.534c.458 5.537-6.315 6.772-9.026 3.003zm14.065-7.115c1.427-2.239 5.846-9.748 5.846-9.748.353-.623-.429-1.273-.975-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.04 3.995-2.811zm-12.622 4.806c-2.084-1.82-3.42-4.479-3.443-7.447-.044-5.51 4.406-10.03 9.92-10.075 3.838-.021 6.479 1.905 6.496 3.447l1.663-1.456c-1.01-2.223-4.182-4.045-8.176-3.992-6.623.055-11.955 5.466-11.903 12.092.023 2.912 1.083 5.57 2.823 7.635.958.492 2.123.329 2.62-.204zm12.797-1.906c1.059 1.97-1.351 3.37-3.545 3.992-.304.912-.803 1.721-1.374 2.311 5.255-.591 9.061-4.304 6.266-7.889-.459.685-.897 1.197-1.347 1.586z"/>        
      </symbol>
    `,
    )
    this.addIcons(
      `<symbol id="iconThemeEditorSave" viewBox="0 0 24 24">
      <path d="M15.004 3h2.996v5h-2.996v-5zm8.996 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9zm-2 2h-14v1h14v-1zm0 2h-14v1h14v-1zm0 2h-14v1h14v-1z"/>   
      </symbol>
    `);
    this.addIcons(
      `
      <symbol id="iconPublish" viewBox="0 0 900 900">
      <path 
      d="M924.145781 233.089709l0-3.215228-0.642636-0.642636 0-2.571568-0.642636-0.642636 0-0.642636-0.642636-0.642636-0.642636 0-0.642636-0.642636 0-0.642636-1.928932-1.928932 0-0.642636-0.642636-0.642636 0-1.286296-1.928932 0-0.642636-0.642636-1.286296 0-0.642636-0.642636 0-0.642636-0.642636 0 0-0.642636-0.642636 0-0.642636-0.642636-0.642636 0 0-0.642636-2.571568 0 0-0.642636-5.14416 0-0.642636 0.642636-0.642636 0 0 0.642636-1.286296 0-0.642636 0.642636-1.286296 0L112.707968 515.999081c-10.287297 3.857864-15.431457 14.788821-11.573593 25.718755 2.571568 5.786797 7.073092 9.644661 12.216229 11.573593l235.972363 94.517677 24.433482 135.667889c1.928932 10.930957 12.216229 17.36039 22.50455 16.074094 4.500501-0.642636 8.358365-3.215228 10.930957-6.429433l87.444585-87.444585 178.104397 71.370491c10.287297 3.857864 21.218254-0.642636 25.718755-10.287297l223.756133-523.383258 0.642636-0.642636 0-0.642636 0-1.286296 0-5.14416L924.145781 233.089709 924.145781 233.089709zM364.112812 610.516758 364.112812 610.516758l-190.32165-75.870991 604.39841-230.829226L364.112812 610.516758 364.112812 610.516758zM405.263024 738.468918 405.263024 738.468918l-12.859889-74.585719 62.368466 25.076118L405.263024 738.468918 405.263024 738.468918zM670.169369 733.325781 670.169369 733.325781 406.54932 627.877147l452.012767-334.347904L670.169369 733.325781 670.169369 733.325781z" 
      p-id="3328">
      </path>
  </symbol>`
    )
    this.addIcons(
      `
      <symbol id="iconBrush" viewBox="0 0 1024 1024">
      <path d="M678.656 141.013333a93.866667 93.866667 0 0 1 108.373333 17.621334l78.421334 78.421333a93.866667 93.866667 0 0 1-0.042667 132.693333l-84.48 84.48 45.312 45.312a128.085333 128.085333 0 0 1 5.717333 174.805334l-5.76 6.144-120.618666 120.746666-0.085334-0.042666-90.453333 90.496a128 128 0 0 1-174.933333 5.76l-6.101334-5.76L132.266667 590.08a128 128 0 0 1 0-181.034667l90.453333-90.538666 120.746667-120.746667a128 128 0 0 1 180.992 0.085333l45.269333 45.226667 89.344-89.258667 13.354667-9.642666zM301.226667 396.928a25.6 25.6 0 0 0-36.181334 0L192.64 469.333333l-3.541333 4.010667a42.666667 42.666667 0 0 0 3.541333 56.32l301.653333 301.653333 4.053334 3.584a42.666667 42.666667 0 0 0 56.32-3.541333l72.405333-72.405333a25.6 25.6 0 0 0 0-36.181334z m423.253333-179.626667a8.533333 8.533333 0 0 0-7.68 0l-2.176 1.621334-144.853333 144.810666-105.6-105.6-4.010667-3.541333a42.666667 42.666667 0 0 0-56.32 3.541333l-42.24 42.24a25.6 25.6 0 0 0 0 36.181334l325.845333 325.888 3.541334 2.986666a25.6 25.6 0 0 0 32.64-2.986666l42.24-42.24 3.498666-4.053334c13.013333-16.725333 11.818667-40.96-3.541333-56.32l-105.557333-105.6 144.810666-144.810666 1.578667-2.176a8.533333 8.533333 0 0 0-1.578667-9.856L726.613333 218.88z" p-id="3299"></path>
      </symbol>
      `
    )
  }
  创建配置Dock容器() {
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
        that.dock面板元素 = this.element;
        that.eventBus.emit('main-dock-ready')
        that.eventBus.emit('reload-dock')
      },
    });
  }
  async 初始化() {
    let that =this
    that.eventBus.on('main-dock-ready',()=>{that.初始化()})
    console.log(this)
    if (!this.dock面板元素) {
      return;
    }
    console.log(this)
    await this.初始化后端接口();
    //初始化数据
    let fn = (await import(`/plugins/${this.name}/source/data/index.js`))["初始化插件数据"];
    await fn()
    await this.初始化界面();
  }
  //初始化界面是异步的,所以用正在初始化这个变量保存状态,如果初始化还没有完成就不继续了
  async 初始化界面() {
    if (this.正在初始化) {
      return;
    }
    let el = document.getElementById("themeEditorColorPlate");
    el ? el.remove() : null;
    this.正在初始化 = true;
    let _path = `/plugins/themeEditor/source`
    await import(_path + '/init.js');
    await (await import(_path + '/UI/docks.js')).init();
  }

  async 初始化后端接口() {
    console.log(this)
    path = (await import(this.selfURL + "/source/polyfills/path.js"))["default"];
    importDep = async (moduleName) => {
      return await import(path.join(this.selfURL, moduleName));
    };
    //await importDep("./polyfills/genKernelApi.js");
    核心api = (await importDep("./source/polyfills/kernelApi.js"))["default"];
    思源工作空间 = (await importDep("./source/polyfills/fs.js"))["default"];
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
  async 保存() {
    this.eventBus.emit('save-all', {})
  }
  onUnload() { }
}
module.exports = themeEditor;
//计算css的工具方法=
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


