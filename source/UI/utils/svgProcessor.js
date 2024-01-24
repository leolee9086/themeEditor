export const 计算扇形路径集 = (总数, 内径, 外径, 起始角度) => {
    let 扇形路径集 = [];
    for (let index = 0; index < 总数; index++) {
        const path = 计算单个扇形路径(总数, 内径, 外径, index, 起始角度);
        扇形路径集.push(path);
    }
    return 扇形路径集;
}
export const 计算单个扇形路径 = (总数, 内径, 外径, index, centerX, centerY) => {
    const startAngle = (2 * Math.PI / 总数) * index;
    const endAngle = (2 * Math.PI / 总数) * (index + 1);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
    const path = [
        `M ${centerX + 内径 * Math.cos(startAngle)} ${centerY + 内径 * Math.sin(startAngle)}`, // Move to the start of the inner arc
        `A ${内径} ${内径} 0 ${largeArcFlag} 1 ${centerX + 内径 * Math.cos(endAngle)} ${centerY + 内径 * Math.sin(endAngle)}`, // Inner arc
        `L ${centerX + 外径 * Math.cos(endAngle)} ${centerY + 外径 * Math.sin(endAngle)}`, // Line to the start of the outer arc
        `A ${外径} ${外径} 0 ${largeArcFlag} 0 ${centerX + 外径 * Math.cos(startAngle)} ${centerY + 外径 * Math.sin(startAngle)}`, // Outer arc
        `Z` // Close the path
    ];
    return path.join(' ');
}
export const 计算圆形路径 = (半径, centerX, centerY) => {
    const path = [
        `M ${centerX - 半径} ${centerY}`, // Move to the start point of the circle
        `a ${半径} ${半径} 0 1 0 ${2 * 半径} 0`, // Draw the first half of the circle
        `a ${半径} ${半径} 0 1 0 ${-2 * 半径} 0`, // Draw the second half of the circle
    ];
    return path.join(' ');
}
export const 计算圆弧路径 = (cx, cy, r, startAngle, endAngle) => {
    const startX = cx + r * Math.cos(startAngle * Math.PI / 180);
    const startY = cy + r * Math.sin(startAngle * Math.PI / 180);
    const endX = cx + r * Math.cos(endAngle * Math.PI / 180);
    const endY = cy + r * Math.sin(endAngle * Math.PI / 180);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", startX, startY,
        "A", r, r, 0, largeArcFlag, 1, endX, endY
    ].join(" ");
    return d;
}