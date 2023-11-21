import { plugin } from "../asyncModules.js";
export const 监听当前主题变化=()=>{
    let 当前主题元素 = () => {
        return window.parent.document.getElementById("themeStyle")
          ? window.parent.document.getElementById("themeStyle")
          : window.parent.document.getElementById("themeDefaultStyle");
      };
  
      let watcher = new MutationObserver((mutations) => {
        if (当前主题元素() && !this.当前主题元素) {
            plugin.当前主题元素 = 当前主题元素();
        }
        if (当前主题元素() && 当前主题元素() !== plugin.当前主题元素) {
            plugin.初始化();
        }
        plugin.当前主题元素 = 当前主题元素();
      });
      watcher.observe(document.head, { childList: true, subtree: true });
  
}