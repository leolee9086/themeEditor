import { clientApi, kernelApi } from "../asyncModules.js"
export const selectAssets = async () => {
    return new Promise((resolve, reject) => {
        const dialog = new clientApi.Dialog(
            {
                title: `选择资源文件`,
                content: `
            <div id='assetsSelectorPannel'>
                <div class="b3-cards" style='margin-right:0'>
                </div>
                <button id="confirmButton">确定</button>

            </div>
            `
            }
        )
        //先用同步逻辑实现,之后再改进
        const assets = kernelApi.sql.sync({
        stmt: `
        select * 
        from assets 
        where path like '%.jpg' or path like '%.jpeg' or path like '%.png' or path like '%.gif' or path like '%.bmp' or path like '%.tiff' or path like '%.webp'
        order by updated desc 
        limit 64 offset 0        `
        })
        let cardsHTML = ``
        for  (let assetInfo of assets) {
            if (assetInfo.path) {
                cardsHTML = cardsHTML + `
        <div data-href="${assetInfo.path}" style="height:148px;width:148px">
            <img src="/${assetInfo.path}"></img>
        </div>
        `
            }
        }
        let cardsContainer = dialog.element.querySelector("#assetsSelectorPannel>.b3-cards")
        cardsContainer.insertAdjacentHTML('beforeEnd', cardsHTML)
        cardsContainer.addEventListener('click',(e)=>{
            
            if(e.target.getAttribute('src')){
                dialog.destroy()
                resolve(e.target.getAttribute('src'))
            }
        })
    })
}