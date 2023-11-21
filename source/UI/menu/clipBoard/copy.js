import { cssproperties } from "../../utils/cssproperties.js";
// 定义所有的字体样式


// 创建菜单项
const menuItems =()=>{
    return cssproperties.map(group => {
        return {
            label: `复制${group.name}(计算值)`,
            click: () => {
                console.log(group)
            },
            submenu:group.props.map(
                prop=>{
                    return{
                        label: `复制${prop.value}(计算值)`,
                        click: () => {
                            console.log(prop.value)
                        },
                    }
                }
            )
        };
    });
} 

// 输出菜单项
export { menuItems as copyFontMenu }