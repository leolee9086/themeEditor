import { plugin ,clientApi} from "../asyncModules.js";

const dock面板元素内容=`
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
`
export default dock面板元素内容