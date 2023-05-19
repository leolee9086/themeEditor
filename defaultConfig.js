export default [
  {
    name: "background-color",
    //type: "color",
    label: "二级标题颜色",
    memo: "",
    group: "编辑器",
    subGroup:"标题",
    selector:" div.protyle-wysiwyg.protyle-wysiwyg--attr > div.h2",
    render:(options)=>{
      let element = document.createElement('input')
      return element
    }
  },
  {
    name: "--b3-theme-primary11",
    type: "select",
    label: "测试",
    memo: "",
    options: ["ceshi", { label: "emoji", value: "1111" }],
    multiple: true,
    group: "主要",
  },
  {
    name: "--b3-theme-primary12",
    type: "number",
    label: "测试",
    memo: "",
    options: ["ceshi", { label: "emoji", value: "1111" }],
  },
  {
    name: "--b3-theme-primary",
    type: "color",
    label: "主色",
    memo: "",
  },
  {
    name: "--b3-theme-primary-light",
    type: "color",
    label: "主色-浅",
    memo: "",
  },
  {
    name: "--b3-theme-primary-lighter",
    type: "color",
    label: "主色-较浅",
    memo: "",
  },
  {
    name: "--b3-theme-primary-lightest",
    type: "color",
    label: "主色-最浅",
    memo: "",
  },
  {
    name: "--b3-theme-secondary",
    type: "color",
    label: "第二色调",
    memo: "",
  },
  {
    name: "--b3-theme-background",
    type: "color",
    label: "背景色",
    memo: "",
  },
  {
    name: "--b3-theme-surface",
    type: "color",
    label: "第二背景色",
    memo: "",
  },
  {
    name: "--b3-theme-surface-light",
    type: "color",
    label: "第二背景色-浅",
    memo: "",
  },
  {
    name: "--b3-theme-error",
    type: "color",
    label: "错误警告色",
    memo: "",
  },
  {
    name: "--b3-theme-on-primary",
    type: "color",
    label: "主色上的文本",
    memo: "",
  },
  {
    name: "--b3-theme-on-secondary",
    type: "color",
    label: "第二色调上的文本",
    memo: "",
  },
  {
    name: "--b3-theme-on-background",
    type: "color",
    label: "背景色上的文本",
    memo: "",
  },
  {
    name: "--b3-theme-on-surface",
    type: "color",
    label: "第二背景色上的文本",
    memo: "",
  },
  {
    name: "--b3-theme-on-error",
    type: "color",
    label: "错误警告色上的文本",
    memo: "",
  },
  {
    name: "--b3-font-family",
    type: "fonts",
    label: "编辑器字体",
    memo: "",
  },
  {
    name: "--b3-font-family-code",
    type: "fonts",
    label: "代码块字体",
    memo: "",
  },
  {
    name: "--b3-font-family-graph",
    type: "fonts",
    label: "关系图字体",
    memo: "",
  },
  {
    name: "--b3-font-family-emoji",
    type: "readonly",
    label: "emoji",
    memo: "",
  },
  {
    name: "--b3-border-color",
    type: "color",
    label: "边框颜色",
    memo: "",
  },
  {
    name: "--b3-scroll-color",
    type: "color",
    label: "滚动条颜色",
    memo: "",
  },
  {
    name: "--b3-list-hover",
    type: "color",
    label: "文件列表当前选项色",
    memo: "",
  },
  {
    name: "--b3-tab-background",
    type: "color",
    label: "页签背景",
    memo: "",
  },
  {
    name: "--b3-tab-background-hover",
    type: "color",
    label: "鼠标指向的页签背景",
    memo: "",
  },
  {
    name: "--b3-menu-background",
    type: "color",
    label: "菜单栏背景色",
    memo: "",
  },
  {
    name: "--b3-tooltips-color",
    type: "color",
    label: "提示色",
    memo: "",
  },
  {
    name: "--b3-card-error-color",
    type: "color",
    label: "卡片-错误-文字颜色",
    memo: "",
  },
  {
    name: "--b3-card-error-background",
    type: "color",
    label: "卡片-错误-背景色",
    memo: "",
  },
  {
    name: "--b3-card-warning-color",
    type: "color",
    label: "卡片-警告-文字颜色",
    memo: "",
  },
  {
    name: "--b3-card-warning-background",
    type: "color",
    label: "卡片-警告-背景色",
    memo: "",
  },
  {
    name: "--b3-card-info-color",
    type: "color",
    label: "卡片-信息-文字颜色",
    memo: "",
  },
  {
    name: "--b3-card-info-background",
    type: "color",
    label: "卡片-信息-背景色",
    memo: "",
  },
  {
    name: "--b3-card-success-color",
    type: "color",
    label: "卡片-成功-文字颜色",
    memo: "",
  },
  {
    name: "--b3-card-success-background",
    type: "color",
    label: "卡片-成功-背景色",
    memo: "",
  },
  {
    name: "--b3-font-color1",
    type: "color",
    label: "自定义文字1",
    memo: "",
  },
  {
    name: "--b3-font-color2",
    type: "color",
    label: "自定义文字2",
    memo: "",
  },
  {
    name: "--b3-font-color3",
    type: "color",
    label: "自定义文字3",
    memo: "",
  },
  {
    name: "--b3-font-color4",
    type: "color",
    label: "自定义文字4",
    memo: "",
  },
  {
    name: "--b3-font-color5",
    type: "color",
    label: "自定义文字5",
    memo: "",
  },
  {
    name: "--b3-font-color6",
    type: "color",
    label: "自定义文字6",
    memo: "",
  },
  {
    name: "--b3-font-color7",
    type: "color",
    label: "自定义文字7",
    memo: "",
  },
  {
    name: "--b3-font-color8",
    type: "color",
    label: "自定义文字8",
    memo: "",
  },
  {
    name: "--b3-font-color9",
    type: "color",
    label: "自定义文字9",
    memo: "",
  },
  {
    name: "--b3-font-color10",
    type: "color",
    label: "自定义文字10",
    memo: "",
  },
  {
    name: "--b3-font-color11",
    type: "color",
    label: "自定义文字11",
    memo: "",
  },
  {
    name: "--b3-font-color12",
    type: "color",
    label: "自定义文字12",
    memo: "",
  },
  {
    name: "--b3-font-color13",
    type: "color",
    label: "自定义文字13",
    memo: "",
  },
  {
    name: "--b3-font-background1",
    type: "color",
    label: "自定义文字背景1",
    memo: "",
  },
  {
    name: "--b3-font-background2",
    type: "color",
    label: "自定义文字背景2",
    memo: "",
  },
  {
    name: "--b3-font-background3",
    type: "color",
    label: "自定义文字背景3",
    memo: "",
  },
  {
    name: "--b3-font-background4",
    type: "color",
    label: "自定义文字背景4",
    memo: "",
  },
  {
    name: "--b3-font-background5",
    type: "color",
    label: "自定义文字背景5",
    memo: "",
  },
  {
    name: "--b3-font-background6",
    type: "color",
    label: "自定义文字背景6",
    memo: "",
  },
  {
    name: "--b3-font-background7",
    type: "color",
    label: "自定义文字背景7",
    memo: "",
  },
  {
    name: "--b3-font-background8",
    type: "color",
    label: "自定义文字背景8",
    memo: "",
  },
  {
    name: "--b3-font-background9",
    type: "color",
    label: "自定义文字背景9",
    memo: "",
  },
  {
    name: "--b3-font-background10",
    type: "color",
    label: "自定义文字背景10",
    memo: "",
  },
  {
    name: "--b3-font-background11",
    type: "color",
    label: "自定义文字背景11",
    memo: "",
  },
  {
    name: "--b3-font-background12",
    type: "color",
    label: "自定义文字背景12",
    memo: "",
  },
  {
    name: "--b3-font-background13",
    type: "color",
    label: "自定义文字背景13",
    memo: "",
  },
  {
    name: "--b3-transition",
    type: "readonly",
    label: "变形动画",
    memo: "",
  },
  {
    name: "--b3-width-transition",
    type: "readonly",
    label: "宽度变换动画",
    memo: "",
  },
  {
    name: "--b3-point-shadow",
    type: "readonly",
    label: "点阴影",
    memo: "",
  },
  {
    name: "--b3-dialog-shadow",
    type: "readonly",
    label: "对话框阴影",
    memo: "",
  },
  {
    name: "--b3-diff-add",
    type: "color",
    label: "历史-增加",
    memo: "",
  },
  {
    name: "--b3-diff-add-surface",
    type: "color",
    label: "历史-增加-背景",
    memo: "",
  },
  {
    name: "--b3-diff-del",
    type: "color",
    label: "历史-删除",
    memo: "",
  },
  {
    name: "--b3-diff-del-surface",
    type: "color",
    label: "历史-删除-背景",
    memo: "",
  },
  {
    name: "--b3-graph-p-point",
    type: "color",
    label: "关系图-段落点",
    memo: "",
  },
  {
    name: "--b3-graph-heading-point",
    type: "color",
    label: "关系图-标题点",
    memo: "",
  },
  {
    name: "--b3-graph-math-point",
    type: "color",
    label: "关系图-数学公式点",
    memo: "",
  },
  {
    name: "--b3-graph-code-point",
    type: "color",
    label: "关系图-代码点",
    memo: "",
  },
  {
    name: "--b3-graph-table-point",
    type: "color",
    label: "关系图-表格点",
    memo: "",
  },
  {
    name: "--b3-graph-list-point",
    type: "color",
    label: "关系图-列表点",
    memo: "",
  },
  {
    name: "--b3-graph-todo-point",
    type: "color",
    label: "关系图-任务点",
    memo: "",
  },
  {
    name: "--b3-graph-olist-point",
    type: "color",
    label: "关系图-有序列表点",
    memo: "",
  },
  {
    name: "--b3-graph-listitem-point",
    type: "color",
    label: "关系图-列表项点",
    memo: "",
  },
  {
    name: "--b3-graph-bq-point",
    type: "color",
    label: "关系图-引述点",
    memo: "",
  },
  {
    name: "--b3-graph-super-point",
    type: "color",
    label: "关系图-超级块的点",
    memo: "",
  },
  {
    name: "--b3-graph-doc-point",
    type: "color",
    label: "关系图-文档点",
    memo: "",
  },
  {
    name: "--b3-graph-tag-point",
    type: "color",
    label: "关系图-标签点",
    memo: "",
  },
  {
    name: "--b3-graph-asset-point",
    type: "color",
    label: "关系图-资源点",
    memo: "",
  },
  {
    name: "--b3-graph-line",
    type: "color",
    label: "关系图-连线",
    memo: "",
  },
  {
    name: "--b3-graph-ref-line",
    type: "color",
    label: "关系图-引用线",
    memo: "",
  },
  {
    name: "--b3-graph-tag-line",
    type: "color",
    label: "关系图-标签和节点之间的线",
    memo: "",
  },
  {
    name: "--b3-graph-tag-tag-line",
    type: "color",
    label: "关系图-标签之间的线",
    memo: "",
  },
  {
    name: "--b3-graph-asset-line",
    type: "color",
    label: "关系图-资源线",
    memo: "",
  },
  {
    name: "--b3-graph-hl-point",
    type: "color",
    label: "关系图-高亮的点",
    memo: "",
  },
  {
    name: "--b3-graph-hl-line",
    type: "color",
    label: "关系图-高亮的线",
    memo: "",
  },
  {
    name: "--b3-protyle-search-background",
    type: "color",
    label: "搜索-背景",
    memo: "",
  },
  {
    name: "--b3-protyle-search-border-color",
    type: "color",
    label: "搜素-边框颜色",
    memo: "",
  },
  {
    name: "--b3-protyle-search-current-background",
    type: "color",
    label: "搜素-当前背景",
    memo: "",
  },
  {
    name: "--b3-protyle-code-background",
    type: "color",
    label: "文档-代码背景",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-strong-color",
    type: "color",
    label: "文档-加粗",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-em-color",
    type: "color",
    label: "文档-斜体",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-s-color",
    type: "color",
    label: "文档-删除线",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-link-color",
    type: "color",
    label: "文档-链接",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-mark-background",
    type: "color",
    label: "文档-高亮背景",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-mark-color",
    type: "color",
    label: "文档-高亮文字色",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-tag-color",
    type: "color",
    label: "文档-标签",
    memo: "",
  },
  {
    name: "--b3-protyle-inline-blockref-color",
    type: "color",
    label: "文档-引用",
    memo: "",
  },
];