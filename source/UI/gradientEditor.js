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
            title: plugin.i18n.渐变工具箱,
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
                                pickr && pickr.destroyAndRemove();
                            } catch (e) {

                            }
                            pickr = undefined;
                        }
                    )
                } catch (e) {
                    console.warn(e)
                }
            },
            width: '521px',
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
    <span data-type="save-gradient" class="block__icon block__icon--show b3-tooltips b3-tooltips__sw" aria-label="保存渐变">
        <svg><use xlink:href="#iconThemeEditorSave"></use></svg>
    </span>  
    <span data-type="copy-gradient" class="block__icon block__icon--show b3-tooltips b3-tooltips__sw" aria-label="保存渐变">
    <svg class="b3-menu__icon " style=""><use xlink:href="#iconCopy"></use></svg>
</span>  

</span>
    
    `)
    dialog.element.querySelector('[data-type="copy-gradient"]').addEventListener('click', async () => {
        let gradient= dialog.element.querySelector('.preview').getAttribute('gradient')
        navigator.clipboard.writeText(gradient)


    })

    dialog.element.querySelector('[data-type="save-gradient"]').addEventListener('click', async () => {
        let Dialog;
        Dialog = new clientApi.Dialog({
            title: "输入渐变名,留空取消",
            content: `<div class="fn__flex"><input class="fn__flex-1 b3-text-field  b3-filter" placeholder="输文件名,其实安全上下文内那个+号可以右键上传"></div>`,
            width: "400px",
            height: "96px",
            destroyCallback: async () => {
                let name = Dialog.element.querySelector("input").value;
                if(name){
                    plugin.eventBus.emit('save-gradient',
                    {
                        id: Lute.NewNodeID(),
                        name: name,
                        css: dialog.element.querySelector('.preview').getAttribute('gradient')
                    }
                    )

                }
            },
        });
        
    })
  /*  dialog.element.querySelector('[data-type="save-gradient"]').addEventListener('contextmenu', async () => {
        let Dialog;
        Dialog = new clientApi.Dialog({
            title: "输入渐变名,留空取消",
            content: `<div class="fn__flex"><input class="fn__flex-1 b3-text-field  b3-filter" placeholder="输文件名,其实安全上下文内那个+号可以右键上传"></div>`,
            width: "400px",
            height: "96px",
            destroyCallback: async () => {
                let name = Dialog.element.querySelector("input").value;
                if(name){
                    plugin.eventBus.emit('save-gradient',
                    {
                        id: Lute.NewNodeID(),
                        name: name,
                        css: dialog.element.querySelector('.preview').getAttribute('lines')
                    }
                    )

                }
            },
        });
    })*/
    let container = dialog.element.querySelector(".b3-dialog__container");
    container.style.position = "absolute"
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
    const app = initVueApp('/plugins/themeEditor/source/UI/components/cc-gradient-setter.vue', 'aaa', { plugin: plugin }, Constants.devPath, {})
    app.mount(dialog.element.querySelector(".styleEditor"))
}
