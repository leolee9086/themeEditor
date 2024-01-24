import { plugin } from "../asyncModules.js";
export const consoleError = (...args) => {
    console.error(...args);
    let textLines = args.map((item) => {
      return `<div>${Lute.EscapeHTMLStr(item.toString())}</div>`;
    });
    plugin.dock面板元素.querySelector(
      ".config__tab-container"
    ).innerHTML = `
      <div style="color:var(--b3-card-error-color);background-color:var(--b3-card-error-background)">
        ${textLines}
      <div>
    `;
  }
