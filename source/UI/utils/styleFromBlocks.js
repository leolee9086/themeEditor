import kernelApi from '../../polyfills/kernelApi.js'
import * as postcss from '../../../static/postcss.bundle.mjs'
import { 分解属性名 } from './cssParser.js'
function handleBackgroundImage(value) {
    // Parse the background-image property value with postcss
    let root = postcss.parse(`background-image: ${value}`);
    // Initialize an array to hold the images
    let images = [];
    // Walk through the declarations in the root
    root.walkDecls(decl => {
        // Split the declaration value into parts
        let parts = postcss.list.comma(decl.value);
        // Iterate over the parts
        parts.forEach(part => {
            let type;
            if (part.startsWith('url(')) {
                type = 'url';
            } else if (part.startsWith('linear-gradient(')) {
                type = 'linear-gradient';
            } else if (part.startsWith('radial-gradient(')) {
                type = 'radial-gradient';
            } else if (part.startsWith('repeating-linear-gradient(')) {
                type = 'repeating-linear-gradient';
            } else if (part.startsWith('repeating-radial-gradient(')) {
                type = 'repeating-radial-gradient';
            } else if (part.startsWith('image(')) {
                type = 'image';
            } else {
                type = 'unknown';
            }
            images.push({
                type: type,
                image: part
            });
        });
    });
    // Return the images array
    return images;
}

function handleBackgroundColor(value) {
    return {
        type: 'color',
        color: value
    };
}

function handleBackgroundPosition(value) {
    return { position: value };
}

function handleBackgroundSize(value) {
    return { size: value };
}

function handleBackgroundRepeat(value) {
    return { repeat: value };
}

function handleBackground(value) {
    // Parse the background property value with postcss
    let root = postcss.parse(`background: ${value}`);

    // Initialize an array to hold the backgrounds
    let backgrounds = [];

    // Walk through the declarations in the root
    root.walkDecls(decl => {
        // Initialize an object to hold the current background
        let currentBackground = {};

        // Split the declaration value into parts
        let parts = postcss.list.space(decl.value);

        // Iterate over the parts
        parts.forEach(part => {
            if (part.startsWith('url(') || part.startsWith('linear-gradient(')) {
                currentBackground.type = part.startsWith('url(') ? 'image' : 'gradient';
                currentBackground.image = part;
            } else if (part === 'no-repeat' || part === 'repeat') {
                currentBackground.repeat = part;
            } else if (part.includes('center') || part.includes('top') || part.includes('bottom') || part.includes('left') || part.includes('right')) {
                currentBackground.position = part;
            } else if (part.includes('cover') || part.includes('contain')) {
                currentBackground.size = part;
            } else {
                currentBackground.type = 'color';
                currentBackground.color = part;
            }
        });

        // Add the current background to the backgrounds array
        backgrounds.push(currentBackground);
    });

    // Return the backgrounds array
    return backgrounds;
}

function normalizeBackgroundProperties(css) {
    let root = postcss.parse(css);
    let backgrounds = [];

    root.walkDecls(decl => {
        if (decl.prop === 'background' || decl.prop.startsWith('background-')) {
            if (decl.prop === 'background') {
                backgrounds.push(...handleBackground(decl.value));
            } else if (decl.prop === 'background-color') {
                backgrounds.push(handleBackgroundColor(decl.value));
            } else if (decl.prop === 'background-image') {
                backgrounds.push(handleBackgroundImage(decl.value));
            } else if (decl.prop === 'background-position') {
                Object.assign(backgrounds[backgrounds.length - 1], handleBackgroundPosition(decl.value));
            } else if (decl.prop === 'background-size') {
                Object.assign(backgrounds[backgrounds.length - 1], handleBackgroundSize(decl.value));
            } else if (decl.prop === 'background-repeat') {
                Object.assign(backgrounds[backgrounds.length - 1], handleBackgroundRepeat(decl.value));
            }
        }
    });

    return backgrounds.map(background => completeBackgroundProperties(background));
}

function getAllProperties(computedStyle) {
    const properties = {};

    // 获取所有的属性名
    const keys = Object.keys(computedStyle);

    // 遍历所有的属性名
    for (let key of keys) {
        // 如果属性名以数字开头，跳过
        if (!isNaN(parseInt(key[0]))) {
            continue;
        }

        // 获取属性值
        const value = computedStyle[key];

        // 将属性名和属性值添加到结果对象中
        properties[key] = value;
    }

    return properties;
}
function normalizeComputedProperties(css) {
    // 创建一个临时元素
    const tempElement = document.createElement('div');
    // 将CSS样式应用到临时元素上
    tempElement.style.cssText = css;
    // 将临时元素添加到DOM中（注意：这个元素实际上不会被渲染）
    document.body.appendChild(tempElement);
    // 获取计算后的样式
    const computedStyle = getComputedStyle(tempElement);
    // 从计算后的样式中提取背景相关的属性
    const backgrounds = getAllProperties(computedStyle)
    // 从DOM中移除临时元素
    document.body.removeChild(tempElement);
    // 返回背景相关的属性
    return 分组属性(backgrounds)
}
function 分组属性(computedStyle) {
    const 分组结果 = {};
    for (let 属性 in computedStyle) {
        if (computedStyle.hasOwnProperty(属性)) {
            let 子属性 = 分解属性名(属性);
            if (子属性) {
                let 当前属性对象 = 分组结果;
                for (let i = 0; i < 子属性.length; i++) {
                    let 部分小写 = 子属性[i].toLowerCase();
                    if (i === 子属性.length - 1) {
                        当前属性对象[部分小写] = { $raw: computedStyle[属性] };
                    } else {
                        if (!当前属性对象[部分小写]) {
                            当前属性对象[部分小写] = {};
                        }
                        当前属性对象 = 当前属性对象[部分小写];
                    }
                }
            } else {
                分组结果[属性] = { $raw: computedStyle[属性] };
            }
        }
    }
    return 分组结果;
}




let css = `
    background-color: red;
    background-image: url("assets/色轮1 1-20230929013032-3v30qw6.png"), linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background: url("image1.png") no-repeat center / cover, url("image2.png") repeat-x left top / contain, linear-gradient(to right, red, orange) no-repeat right bottom / 50% 50%;
    background: url("image1.png") no-repeat center / cover, rgba(255, 0, 0, 0.5), url("image2.png") repeat-x left top / contain, linear-gradient(to right, red, orange) no-repeat right bottom / 50% 50%, rgba(0, 255, 0, 0.5);
    background: url("image1.png") no-repeat center / cover, rgba(255, 0, 0, 0.5), url("image2.png") repeat-x left top / contain, linear-gradient(to right, red, orange) no-repeat right bottom / 50% 50%, rgba(0, 255, 0, 0.5), radial-gradient(circle, yellow, green);
    background: url("image1.png"), rgba(255, 0, 0, 0.5), url("image2.png"), linear-gradient(to right, red, orange), rgba(0, 255, 0, 0.5), radial-gradient(circle, yellow, green);
    background-position: center, left top, right bottom;
    background-size: cover, contain, 50% 50%;
    background-repeat: no-repeat, repeat-x, no-repeat;
  `;

/*let styleSql = `select * from attributes where name = 'style' limit 102400`
let styles = kernelApi.sql.sync({ stmt: styleSql })
Promise.all(styles.map(style => normalizeBackgroundProperties(style.value)))
    .then(normalizedStyles => {
        console.log(normalizedStyles);
    })
    .catch(error => {
        console.error(error);
    })*/
function decomposeBackgroundLayers(background) {
    // Parse the background property value with postcss
    let root = postcss.parse(`background: ${background}`);

    // Initialize an array to hold the layers
    let layers = [];

    // Walk through the declarations in the root
    root.walkDecls(decl => {
        // Split the declaration value into parts by comma
        let parts = postcss.list.comma(decl.value);

        // Iterate over the parts
        parts.forEach(part => {
            layers.push(part.trim());
        });
    });
    // Return the layers array
    return layers;
}
export function parseBackgroundLayer(css) {
    const normalizedStyle = normalizeComputedProperties(css);
    console.log(normalizedStyle)
    let layers = decomposeBackgroundLayers(normalizedStyle.background.$raw)
    let pasredLayers
    if (layers.length > 1) {
        pasredLayers = layers.map(layer =>{ console.log(layer) ;return parseBackgroundLayer(`background:${layer}`)})
    }
    return {
        type: normalizedStyle.background.image.$raw.startsWith('url') ? 'image' : 'gradient',
        image: normalizedStyle.background.image.$raw,
        position: normalizedStyle.background.position.$raw,
        positionX: normalizedStyle.background.position.x.$raw,
        positionY: normalizedStyle.background.position.y.$raw,
        size: normalizedStyle.background.size.$raw,
        repeat: normalizedStyle.background.repeat.$raw,
        repeatX: normalizedStyle.background.repeat.x.$raw,
        repeatY: normalizedStyle.background.repeat.y.$raw,
        attachment: normalizedStyle.background.attachment.$raw,
        origin: normalizedStyle.background.origin.$raw,
        clip: normalizedStyle.background.clip.$raw,
        $raw: normalizedStyle.background.$raw,
        layers: pasredLayers
    };
}
