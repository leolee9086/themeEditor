import { initVueApp } from "../utils/componentsLoader.js"
import { plugin, Constants } from "../../asyncModules.js"
export const 创建文本样式面板 = async (dock面板元素) => {
    const app = initVueApp(
        '/plugins/themeEditor/source/UI/components/block-style-panel.vue',
        'aaa',
        { plugin: plugin },
        Constants.devPath,
        {}
    )
    app.mount(dock面板元素)

}