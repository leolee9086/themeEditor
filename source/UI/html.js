import { plugin ,clientApi} from "../asyncModules.js";
const {i18n}=plugin
const dock面板元素内容=`
<div class="block__icons">
  <div class="block__logo">
<<<<<<< HEAD
      <svg class="block__logoicon"><use xlink:href="#iconThemeEditor"></use></svg>
      themeEditor
  </div>
  <span class="fn__flex-1 fn__space  b3-tooltips b3-tooltips__sw hidder" style="min-height:30px" aria-label="${i18n["单击显示/隐藏详细设置"]}"></span>
  <span data-type="trash" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n["重新开始设置"]}"><svg class="block__logoicon"><use xlink:href="#iconClose"></use></svg></span>

  <span data-type="clear" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.清除当前设置}"><svg class="block__logoicon"><use xlink:href="#iconTrashcan"></use></svg></span>
  <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.重载当前设置}"><svg class="block__logoicon"><use xlink:href="#iconRefresh"></use></svg></span>

  <span data-type="save" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.保存当前设置}"><svg class="block__logoicon"><use xlink:href="#iconThemeEditorSave"></use></svg></span>

  <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min ${clientApi.adaptHotkey(
    "⌘W"
  )}"><svg class="block__logoicon"><use xlink:href="#iconMin"></use></svg></span>
=======
      <svg><use xlink:href="#iconThemeEditor"></use></svg>
      themeEditor
  </div>
  <span class="fn__flex-1 fn__space  b3-tooltips b3-tooltips__sw hidder" style="min-height:30px" aria-label="${i18n["单击显示/隐藏详细设置"]}"></span>
  <span data-type="trash" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n["重新开始设置"]}"><svg><use xlink:href="#iconClose"></use></svg></span>

  <span data-type="clear" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.清除当前设置}"><svg><use xlink:href="#iconTrashcan"></use></svg></span>
  <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.重载当前设置}"><svg><use xlink:href="#iconRefresh"></use></svg></span>

  <span data-type="save" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="${i18n.保存当前设置}"><svg><use xlink:href="#iconThemeEditorSave"></use></svg></span>

  <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min ${clientApi.adaptHotkey(
    "⌘W"
  )}"><svg><use xlink:href="#iconMin"></use></svg></span>
>>>>>>> 05700748ea3e2f97b064b461739d859468f61489
</div>
<div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
${i18n.主题配置文件}:
  <span 
  class="block__logo cc_add b3-tooltips b3-tooltips__e" aria-label="${i18n["创建一个针对当前主题的代码片段,左键添加/更新,右键删除\n在你要关掉这个插件的时候使用"]}"
  data-custom-action="addThemeProducts"
  style='border-radius:3px'
  >
<<<<<<< HEAD
  <svg class="block__logoicon"><use xlink:href="#iconCode"></use></svg>
=======
  <svg><use xlink:href="#iconCode"></use></svg>
>>>>>>> 05700748ea3e2f97b064b461739d859468f61489

  </span>

  <select class="b3-select fn__flex-center fn__size100 configFileTheme">
  </select>
  <span class='fn__flex-1'> </span>

  ${i18n.主题配置产品}:

  <select class="b3-select fn__flex-center fn__size100 puductTheme">
  <option value=0>临时</option>
  </select>
  <span class="block__logo" data-custom-action="upLoadThemeProducts">
<<<<<<< HEAD
<svg class="block__logoicon"><use xlink:href="#iconAdd"></use></svg>
</span>
<span class="block__logo cc_download" data-custom-action="downloadThemeProducts">
<svg class="block__logoicon"><use xlink:href="#iconDownload"></use></svg>
=======
<svg><use xlink:href="#iconAdd"></use></svg>
</span>
<span class="block__logo cc_download" data-custom-action="downloadThemeProducts">
<svg><use xlink:href="#iconDownload"></use></svg>
>>>>>>> 05700748ea3e2f97b064b461739d859468f61489

</span>
</span>

</div>
<div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
${i18n.公共配置文件}:
<span 
class="block__logo cc_add b3-tooltips b3-tooltips__e" aria-label="${i18n["创建一个公共代码片段,左键添加/更新,右键删除\n在你要关掉这个插件的时候使用"]}"
data-custom-action="addCommonProducts" 
style='border-radius:3px'

>
<<<<<<< HEAD
<svg class="block__logoicon"><use xlink:href="#iconCode"></use></svg>
=======
<svg><use xlink:href="#iconCode"></use></svg>
>>>>>>> 05700748ea3e2f97b064b461739d859468f61489

</span>
<select class="b3-select fn__flex-center fn__size100 configFileCommon">
</select>
<span class="block__logo" data-custom-action="upLoadConfigs">
<svg class="block__logoicon"><use xlink:href="#iconUpload"></use></svg>

</span>
<span class="block__logo cc_download" data-custom-action="downloadConfigs">
<svg class="block__logoicon"><use xlink:href="#iconDownload"></use></svg>

</span>


<span class='fn__flex-1'> </span>

${i18n.公共配置产品}:
<select class="b3-select fn__flex-center fn__size100 puductCommon">
<option value=0>临时</option>

</select>

<span class="block__logo" data-custom-action="upLoadCommonProducts">
<svg class="block__logoicon"><use xlink:href="#iconAdd"></use></svg>
</span>
<span class="block__logo cc_download" data-custom-action="downloadCommonProducts">
<svg class="block__logoicon"><use xlink:href="#iconDownload"></use></svg>

</span>


</div>
<div class="block__icons " style="max-height:42px;overflow:hidden">
  <span class="block__logo">
    <svg class="block__logoicon"><use xlink:href="#iconSearch"></use>
  </svg>
  </span> 
  <input class="fn__flex-1 b3-text-field  b3-filter" placeholder="${i18n.关键字过滤} Enter">
  <span class="fn__space"></span>

  <span class="hiddenable"> ${i18n.真实过滤}</span>
  <span class="fn__space"></span>

  <input class="b3-switch fn__flex-center"  type="checkbox" data-target="${i18n.真实过滤}">
</div>
<div class="block__icons hiddenable" style="max-height:42px;overflow:hidden">
<span class="block__logo">
<svg class="block__logoicon"><use xlink:href="#iconFilter"></use></svg>
</span> 

${i18n.配置源过滤}:
<select class="b3-select fn__flex-center  configFileType">
<option value=0>${i18n.全部显示}</option>
<option value='theme'>${i18n.主题配置文件}</option>
  <option value='common'>${i18n.公共配置文件}</option>
</select>
${i18n.分组过滤}:
<select class="b3-select fn__flex-center  b3-filter-group">
  <option value="">${i18n.全部}</option>
  <option value="基础设置">${i18n.基础设置}</option>
<select>
<select class="b3-select fn__flex-center  b3-filter-subgroup">
  <option value="">${i18n.全部}</option>
  <option value="基础">${i18n.基础}</option>
<select>
${i18n.选择器过滤}:
<select class="b3-select fn__flex-center fn__flex-1 b3-filter-selectortext">
  <option value="">:root</option>
  <select>
</div>
<div class="fn__flex-1  theme-editor__custom-dock config__tab-container" style='max-height:calc(100% - 210px);background-color:var(--b3-theme-background);'> 
</div>
`
export default dock面板元素内容