import { plugin } from "../asyncModules.js";
//开始监听块元素和编辑器元素的变化
export const startWatchProtyle = () => {
    plugin.eventBus.on('click-blockicon', (e) => {
        console.log(e)
        plugin.currentProtyleBlockID = e.detail.protyle.block.id
    })
    plugin.eventBus.on('click-editortitleicon', (e) => {
        console.log(e)
        plugin.currentProtyleBlockID = e.detail.protyle.block.id

        }
    )
    plugin.eventBus.on('click-editorcontent', (e) => {
        console.log(e)
        plugin.currentProtyleBlockID = e.detail.protyle.block.id
        }
    )
}