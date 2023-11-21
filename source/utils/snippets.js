import { plugin ,kernelApi,clientApi} from "../asyncModules.js";
import { 获取当前主题文件夹URL } from "./theme.js";
export  async function 生成css代码片段(标记字符串, css内容, 类型, 名称) {
    let 现有代码片段 = await kernelApi.getSnippet({ type: "all", enabled: 2 });
    let id = Lute.NewNodeID() + "themeEditor";
    let 存在元素索引 = 现有代码片段.snippets.findIndex((item) =>
      item.content.startsWith(`/*${标记字符串}*/`)
    );
    let 判断主题函数内容 = `if(获取当前主题文件夹URL()==\`${获取当前主题文件夹URL()}\`)`;
    类型 == "common" ? (判断主题函数内容 = "if(true)") : null;
    let 代码片段内容 = `/*${标记字符串}*/
      ${生成元素.toString()}
      ${获取当前主题文件夹URL.toString()}
  
      ${判断主题函数内容}{
        
      
      document.head.appendChild(
        生成元素(
          "style",
          {
            id: \`${Lute.EscapeHTMLStr(标记字符串)}\`,
            "data-provider":'${类型}'
          },
          \`${css内容}\`
        )
      )
        }
    `;
    if (存在元素索引 >= 0) {
      // 如果元素已存在，则替换元素value
      现有代码片段.snippets[存在元素索引].content =
        `/*${标记字符串}*/\n` + 代码片段内容;
      现有代码片段.snippets[存在元素索引].name = 名称;
      id = 现有代码片段.snippets[存在元素索引].id;
      if (现有代码片段.snippets[存在元素索引].enabled) {
        await kernelApi.setSnippet(现有代码片段);
        window.location.reload();
      } else {
        现有代码片段.snippets[存在元素索引].enabled = true;
        await kernelApi.setSnippet(现有代码片段);
        document.head.appendChild(
          生成元素(
            "script",
            {
              id: `snippetJS${id}`,
              type: "text/javascript",
            },
            代码片段内容
          )
        );
      }
    } else {
      // 否则添加新元素
      现有代码片段.snippets.push({
        id: id,
        content: 代码片段内容,
        name: 名称,
        type: "js",
        enabled: true,
      });
      await kernelApi.setSnippet(现有代码片段);
      document.head.appendChild(
        生成元素(
          "script",
          {
            id: `snippetJS${id}`,
            type: "text/javascript",
          },
          代码片段内容
        )
      );
    }
  }
  function 生成元素(标签, 属性对象, 内容) {
    let 元素 = document.createElement(标签);
    Object.getOwnPropertyNames(属性对象).forEach((属性名) =>
      元素.setAttribute(属性名, 属性对象[属性名])
    );
    元素.innerHTML = 内容;
    return 元素;
  }
 export async function 移除代码片段(标记字符串) {
    let 现有代码片段 = await kernelApi.getSnippet({ type: "all", enabled: 2 });
    let 存在元素索引 = 现有代码片段.snippets.findIndex((item) =>
      item.content.startsWith(`/*${标记字符串}*/`)
    );
    if (存在元素索引 >= 0) {
      现有代码片段.snippets.splice(存在元素索引, 1);
      await kernelApi.setSnippet(现有代码片段);
      window.location.reload();
    }
  }
  