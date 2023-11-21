import { clientApi, plugin } from "../asyncModules.js"
import { initVueApp } from "./utils/componentsLoader.js"
import { Constants } from "../asyncModules.js"

import "./blockHandler.js"
export const openStyleDialog = (blockElements) => {
    if (plugin.styleDialog) {
        return
    }
    const dialog = new clientApi.Dialog(
        {
            title: '块文字样式',
            content: `
<div id="styleEditorPanel" 
class='fn__flex-column styleEditor'  

style="pointer-events:auto;overflow:hidden;z-index:5">
            <div>测试</div>
</div>
`,
            destroyCallback: () => {
                plugin.styleDialog = undefined

                try {
                    plugin.pickrs.forEach(
                        pickr => {
                            try {
                            pickr&&pickr.destroyAndRemove();
                            }catch(e){

                            }
                            pickr = undefined;
                        }
                    )
                } catch (e) {
                    console.warn(e)
                }
            },
            width: '400px',
            height: 'auto',
            transparent: true,
            disableClose: false,
            disableAnimation: false
        }
    )
    dialog.element.style.pointerEvents = 'none'
    dialog.element.querySelector(".b3-dialog__container").style.pointerEvents = 'auto'
    dialog.element.querySelector('.resize__move.b3-dialog__header').insertAdjacentHTML('beforeend', `
<span 
    class="block__icons block__icons--menu" style="width: 50%;
    float: right;
    margin: 0;
    padding: 0;
    min-height: auto;">
    <span class="fn__space fn__flex-1 resize__move">
    </span>
    <span data-type="clear-style" class="block__icon block__icon--show b3-tooltips b3-tooltips__sw" aria-label="清除样式">
        <svg><use xlink:href="#iconTrashcan"></use></svg>
    </span>
    <span class="fn__space"></span>
    <span data-type="pin" class="block__icon block__icon--show b3-tooltips b3-tooltips__sw block__icon--active" aria-label="取消钉住">
        <svg><use xlink:href="#iconPin"></use></svg>
    </span> 
</span>
    
    `)
    dialog.element.querySelector('[data-type="clear-style"]').addEventListener('click', () => {
        plugin.eventBus.emit('clear-style', { props: 'all' })
    })

    let container = dialog.element.querySelector(".b3-dialog__container");
    container.style.position="absolute"
    if (plugin.lastDialogPosition) {
        container.style.left = plugin.lastDialogPosition.left
        container.style.top = plugin.lastDialogPosition.top
    }
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                let left = container.style.left
                let top = container.style.top
                plugin.lastDialogPosition = { left, top }
            }
        });
    });
    // 配置观察选项
    let config = { attributes: true, attributeFilter: ['style'] };
    // 开始观察
    observer.observe(container, config);
    const app = initVueApp('/plugins/themeEditor/source/UI/components/app.vue', 'aaa', { plugin: plugin }, Constants.devPath, { elements: blockElements })
    app.mount(dialog.element.querySelector(".styleEditor"))
    plugin.styleDialog = dialog
}
