const cssproperties = [{
    "name": "背景样式", "props": [
        { "value": "background", "label": "背景", "type": "string" },
        { "value": "background-color", "label": "背景颜色", "type": "color" },
        { "value": "background-image", "label": "背景图", "type": "image" },
        { "value": "background-position", "label": "相对位置", "type": "string", "optionx": ["top", "center", "bottom"], "optiony": ["center", "left", "right"] },
        { "value": "background-repeat", "label": "重复", "type": "select", "option": ["repeat", "repeat-x", "repeat-y", "no-repeat", "default"] },
        { "value": "background-clip", "label": "裁剪", "type": "select", "option": ["border-box", "padding-box", "content-box", "default"] },
        { "value": "background-origin", "label": "对齐基准", "type": "select", "option": ["border-box", "padding-box", "content-box", "default"] },
        { "value": "background-size", "label": "大小", "type": "select", "option": ["length", "percentage", "cover", "contain", "default"] }]
},
{
    "name": "边框线型", "props": [
        { "value": "border-style", "label": "全部样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "border-top-style", "label": "顶部样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "border-bottom-style", "label": "底部样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "border-left-style", "label": "左侧样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "border-right-style", "label": "右侧样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] }]
},
{
    "name": "边框颜色", "props": [
        { "value": "border-color", "label": "全部颜色", "type": "color" },
        { "value": "border-top-color", "label": "顶部颜色", "type": "color" },
        { "value": "border-bottom-color", "label": "底部颜色", "type": "color" },
        { "value": "border-left-color", "label": "左侧颜色", "type": "color" },
        { "value": "border-right-color", "label": "右侧颜色", "type": "color" }]
},
{
    "name": "边框宽度", "props": [
        { "value": "border-width", "label": "全部宽度", "type": "number" },
        { "value": "border-top-width", "label": "顶部宽度", "type": "number" },
        { "value": "border-bottom-width", "label": "底部宽度", "type": "number" },
        { "value": "border-left-width", "label": "左侧宽度", "type": "number" },
        { "value": "border-right-width", "label": "右侧宽度", "type": "number" }]
},
{
    "name": "边框圆角", "props": [
        { "value": "border-radius", "label": "全部圆角", "type": "number" },
        { "value": "border-top-left-radius", "label": "左上圆角", "type": "number" },
        { "value": "border-bottom-left-radius", "label": "左下圆角", "type": "number" },
        { "value": "border-top-right-radius", "label": "右上圆角", "type": "number" },
        { "value": "border-bottom-right-radius", "label": "右下圆角", "type": "number" }]
},

{
    "name": "图像边框", "props": [
        { "value": "border-image-source", "label": "图像源", "type": "image" },
        { "value": "border-image-slice", "label": "向内偏移", "type": "number" },
        { "value": "border-image-width", "label": "宽度", "type": "number" },
        { "value": "border-image-outset", "label": "溢出", "type": "number" },
        { "value": "border-image-repeat", "label": "重复样式", "type": "select", "option": ["repeated", "stretched", "rounded", "default"] }]
},

{
    "name": "轮廓样式", "props": [
        { "value": "outline-color", "label": "轮廓颜色", "type": "color" },
        { "value": "outline-style", "label": "轮廓样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "outline-width", "label": "轮廓宽度", "type": "number" }]
},

{
    "name": "边距", "props": [
        { "value": "margin", "label": "全部边距", "type": "number" },
        { "value": "margin-left", "label": "左侧边距", "type": "number" },
        { "value": "margin-right", "label": "右侧边距", "type": "number" },
        { "value": "margin-top", "label": "顶部边距", "type": "number" },
        { "value": "margin-bottom", "label": "底部边距", "type": "number" }]
},
{
    "name": "内边距", "props": [
        { "value": "padding", "label": "全部填充", "type": "number" },
        { "value": "padding-left", "label": "左侧填充", "type": "number" },
        { "value": "padding-right", "label": "右侧填充", "type": "number" },
        { "value": "padding-top", "label": "顶部填充", "type": "number" },
        { "value": "padding-bottom", "label": "底部填充", "type": "number" }]
},

{
    "name": "文本溢流", "props": [
        { "value": "overflow-x", "label": "横向溢流", "type": "number" },
        { "value": "overflow-y", "label": "纵向溢流", "type": "number" }]
},

{
    "name": "尺寸和透明度", "props": [
        { "value": "opacity", "label": "透明度", "type": "number" },
        { "value": "height", "label": "高度", "type": "number" },
        { "value": "width", "label": "宽度", "type": "number" },
        { "value": "max-height", "label": "最大高度", "type": "number" },
        { "value": "max-width", "label": "最大宽度", "type": "number" },
        { "value": "min-height", "label": "最小高度", "type": "number" },
        { "value": "min-width", "label": "最小宽度", "type": "number" }]
},

{
    "name": "字体属性", "props": [
        { "value": "font-family", "label": "字体系列", "type": "fonts" },
        { "value": "font-size", "label": "字体大小", "type": "number" },
        { "value": "font-variant", "label": "大小写", "type": "string" },
        { "value": "font-weight", "label": "字体宽度", "type": "number" }]
},
{
    "name": "文本样式", "props": [
        { "value": "color", "label": "文本颜色", "type": "color" },
        { "value": "writing-mode", "label": "书写模式", "type": "select", "option": ["vertical-lr", "vertical-rl", "default"] },
        { "value": "direction", "label": "文本方向", "type": "select", "option": ["ltr", "rtl", "default"] },
        { "value": "letter-spacing", "label": "字符间距", "type": "number" },
        { "value": "line-height", "label": "行高", "type": "number" },
        { "value": "text-align", "label": "水平对齐", "type": "select", "option": ["left", "right", "center", "justify", "default"] },
        { "value": "text-decoration", "label": "文本装饰", "type": "select", "option": ["none", "underline", "overline", "line-through", "blink", "default"] },
        { "value": "text-decoration-color", "label": "文本装饰颜色", "type": "color" },
        { "value": "text-decoration-line", "label": "文本装饰类型", "type": "select", "option": ["none", "underline", "overline", "line-through", "blink", "default"] },
        { "value": "text-decoration-style", "label": "文本装饰线型", "type": "select", "option": ["none", "solid", "double", "dashed", "dotted", "wavy", "default"] },
        { "value": "vertical-align", "label": "垂直对齐", "type": "number" },
        { "value": "text-shadow", "label": "文本阴影", "type": "string" }]
},
{
    "name": "分列", "props": [
        { "value": "column-count", "label": "分列数量", "type": "number" },
        { "value": "column-gap", "label": "列间隙宽", "type": "number" },
        { "value": "column-rule-color", "label": "间隙线颜色", "type": "color" },
        { "value": "column-rule-style", "label": "间隙线样式", "type": "select", "option": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "default"] },
        { "value": "column-rule-width", "label": "间隙线宽度", "type": "number" },
        { "value": "column-width", "label": "列宽", "type": "number" }]
},
{
    "name": "显示样式", "props": [
        { "value": "display", "label": "显示样式", "type": "select", "option": ["none", "block", "inline", "inline-block", "list-item", "run-in", "table", "inline-table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption", "flex", "grid"] }
    ]
},

{
    "name": "flex容器属性", "props": [
        { "value": "flex-direction", "label": "方向", "type": "select", "option": ["row", "row-reverse", "column", "column-reverse"] },
        { "value": "flex-wrap", "label": "换行", "type": "select", "option": ["nowrap", "wrap", "wrap-reverse"] },
        { "value": "justify-content", "label": "主轴对齐", "type": "select", "option": ["flex-star", "flex-end", "center", "space-between", "space-around"] },
        { "value": "align-items", "label": "交叉轴对齐", "type": "select", "option": ["flex-star", "flex-end", "center", "baseline", "stretch"] },
        { "value": "align-content", "label": "内容对齐", "type": "select", "option": ["flex-star", "flex-end", "center", "baseline", "stretch"] }]
},

{
    "name": "flex项目属性", "props": [
        { "value": "order", "label": "序列", "type": "number" },
        { "value": "flex-grow", "label": "放大", "type": "number" },
        { "value": "flex-shrink", "label": "缩小", "type": "color" },
        { "value": "flex-basis", "label": "基本", "type": "number" },
        { "value": "align-self", "label": "自身对齐", "type": "select", "option": ["flex-star", "flex-end", "center", "baseline", "stretch", "auto"] }
    ]
},
{
    "name": "网格容器属性", "props": [
        { "value": "grid-template-columns", "label": "列规则", "type": "string" },
        { "value": "grid-template-rows", "label": "行规则", "type": "string" },
        { "value": "grid-template-areas", "label": "区域规则", "type": "string" },
        { "value": "grid-column-gap", "label": "列间距", "type": "number" },
        { "value": "grid-row-gap", "label": "行间距", "type": "number" },
        { "value": "justify-items", "label": "行对齐", "type": "select", "option": ["start", "end", "center", "stretch"] },
        { "value": "align-items", "label": "列对齐", "type": "select", "option": ["start", "end", "center", "stretch"] },
        { "value": "justify-content", "label": "整体行对齐", "type": "select", "option": ["start", "end", "center", "stretch", "space-around", "space-between", "space-evenly"] },
        { "value": "align-content", "label": "整体列对齐", "type": "select", "option": ["start", "end", "center", "stretch", "space-around", "space-between", "space-evenly"] },
        { "value": "grid-auto-columns", "label": "自动列", "type": "number" },
        { "value": "grid-auto-rows", "label": "自动行", "type": "number" },
        { "value": "grid-auto-flow", "label": "自动行", "type": "select", "option": ["row", "column", "row dense", "column dense"] }

    ]
},
{
    "name": "网格项目属性", "props": [
        { "value": "grid-column-start", "label": "起始列规则", "type": "string" },
        { "value": "grid-column-end", "label": "结束列规则", "type": "string" },
        { "value": "grid-row-start", "label": "起始行规则", "type": "string" },
        { "value": "grid-row-end", "label": "结束行规则", "type": "string" },
        { "value": "justify-self", "label": "", "type": "select", "option": ["star", "end", "center", "stretch"] },
        { "value": "align-self", "label": "", "type": "select", "option": ["star", "end", "center", "stretch"] }
    ]
}
]
let cssNames = cssproperties.reduce((acc, curr) => {
    let props = curr.props.map(prop => prop.value);
    return acc.concat(props);
}, []);

export { cssNames as cssNames }
export { cssproperties as cssproperties }