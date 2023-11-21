import kernelApi from './polyfills/kernelApi.js';
let pluginName  = import.meta.resolve('../').split('/').filter(item=>{return item}).pop()
const plugin = siyuan.ws.app.plugins.find(
    plugin => {
        return plugin.name ===pluginName
    }
)
let clientApiInstance=globalThis[Symbol.for(`clientApi`)]
export {clientApiInstance as clientApi}
export {plugin as pluginInstance}
export {plugin as plugin}
export {kernelApi as kernelApi}
export const Constants = {
    helpID:'20231028183434-6oflpzo',
    HELP_PATH : {
        zh_CN: "20210808180117-czj9bvb",
        zh_CHT: "20211226090932-5lcq56f",
        en_US: "20210808180117-6v0mkxr",
        fr_FR: "20210808180117-6v0mkxr",
    },
    Plugin_Help_path:{
        zh_CN: "SAC插件帮助.sy.zip",
    },
    Plugin_Help_name:{
        zh_CN: "SAC-请从这里开始",
    },
    CB_MOUNT_REMOVE:"cb-mount-remove"
}