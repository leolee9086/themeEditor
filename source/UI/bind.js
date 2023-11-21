import { plugin } from "../asyncModules.js";
import { 获取当前主题文件夹URL } from "../utils/theme.js";
import path from "../polyfills/path.js"
export async function 绑定主题配置选择() {
    let selector = plugin.dock面板元素.querySelector(".configFileTheme");
    selector.innerHTML = "";
    let 主题配置文件数组 = await plugin.获取当前主题配置文件数组();
    if (主题配置文件数组 && 主题配置文件数组[0]) {
        for (let i = 0, length = 主题配置文件数组.length; i < length; i++) {
            selector.innerHTML += `<option value='${i}'>${主题配置文件数组[i]}</option>`;
        }
    } else {
        selector.innerHTML += `<option value='-1'>当前主题没有提供配置文件</option>`;
    }
    selector.onchange = async () => {
        plugin.lastValues.lastThemeConfigFileName =
            主题配置文件数组[selector.value];
        plugin.lastValues.lastThemeConfigFilePath = path.join(
            "conf",
            获取当前主题文件夹URL(),
            this.lastValues.lastThemeConfigFilePath
        );
        await plugin.保存();
        await plugin.初始化();
    };
}
export async function 绑定公共配置选择() {
    let selector = plugin.dock面板元素.querySelector(".configFileCommon");
    selector.innerHTML = "";
    let 公共配置文件数组 = await plugin.获取当前公共配置文件数组();
    if (公共配置文件数组) {
        for (let i = 0, length = 公共配置文件数组.length; i < length; i++) {
            if (公共配置文件数组[i] == plugin.lastValues.lastCommonfigFileName) {
                selector.innerHTML += `<option value='${i}' selected>${公共配置文件数组[i]}</option>`;
                selector.value = i;
            } else {
                selector.innerHTML += `<option value='${i}'>${公共配置文件数组[i]}</option>`;
            }
        }
    } else {
        selector.innerHTML += `<option value='-1'>当前没有公共配置文件,正在重新生成</option>`;
        await plugin.复制默认公共配置文件();
    }
    selector.onchange = async () => {
        plugin.lastValues.lastCommonfigFileName = 公共配置文件数组[selector.value];
        plugin.lastValues.lastCommonfigFilePath = path.join(
            plugin.dataPath,
            "commonConfigs",
            plugin.lastValues.lastCommonfigFileName
        );
        await plugin.保存();
        await plugin.初始化();
    };
}
