//获取当前配置的工具函数
export function 获取当前主题文件夹URL() {
  let currentThemeURL = (
    window.parent.document.getElementById("themeStyle")
      ? window.parent.document.getElementById("themeStyle")
      : window.parent.document.getElementById("themeDefaultStyle")
  ).getAttribute("href");
  currentThemeURL = currentThemeURL
    .split("/")
    .slice(0, currentThemeURL.split("/").length - 1)
    .join("/");
  return currentThemeURL;
}
export function 获取当前主题元数据路径() {
  return 获取当前主题文件夹URL() + "/theme.json";
}

