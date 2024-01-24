import { plugin } from "./asyncModules.js";
export const 初始化设置css=()=>{
    document.head.querySelectorAll(".themeEditorStyle").forEach((oldStyle) => {
        oldStyle.remove();
      });
      document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style id="themeEditorStyle-theme" class="themeEditorStyle" data-provider="theme"></style>
  
      <style id="themeEditorStyle-common" class="themeEditorStyle" data-provider="common"></style>
      `
      );
      let themeEditorStyles = document.head.querySelectorAll(".themeEditorStyle");
      themeEditorStyles.forEach((themeEditorStyle) => {
        themeEditorStyle.textContent = "";
        if (themeEditorStyle.dataset.provider == "common") {
          themeEditorStyle.textContent = plugin.lastValues.commonCustomCss;
        } else {
          themeEditorStyle.textContent = plugin.lastValues.themesCustomCss;
        }
        document.head.appendChild(themeEditorStyle);
      });
}
初始化设置css()
