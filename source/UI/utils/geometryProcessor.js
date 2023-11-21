export const 相对线计算点的垂点=(点,线)=>{
    let {x,y}= 点
    let dx = 线.end.x - 线.start.x;
    let dy = 线.end.y - 线.start.y;
    let t = ((x - 线.start.x) * dx + (y - 线.start.y) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t)); // 限制t在0和1之间，确保映射点在渐变线上
    return {
        x: 线.start.x + t * dx,
        y: 线.start.y + t * dy,
        percentage: t * 100 // 返回百分比
    };
}
export const 等分计算单环扇形中心点集 = (总数, 内径, 外径, 起始角度, 圆心X坐标, 圆心y坐标) => {
    let 扇形中心点集 = [];
    for (let index = 0; index < 总数; index++) {
        const startAngle = 起始角度 + (2 * Math.PI / 总数) * index;
        const endAngle = 起始角度 + (2 * Math.PI / 总数) * (index + 1);
        const 中心点 = 计算扇形中心点(内径, 外径, startAngle, endAngle, 圆心X坐标, 圆心y坐标);
        扇形中心点集.push(中心点);
    }
    return 扇形中心点集;
}
export const 计算扇形中心点 = (内径, 外径, 起始角度, 结束角度, centerX, centerY) => {
    // 计算扇形的中心角度
    const 中心角度 = (起始角度 + 结束角度) / 2;
    // 计算扇形的半径，即内径和外径的平均值
    const 扇形半径 = (内径 + 外径) / 2;
    // 计算扇形中心点的坐标
    const x = centerX + 扇形半径 * Math.cos(中心角度);
    const y = centerY + 扇形半径 * Math.sin(中心角度);
    // 将中心角度转换为度数
    const 旋转角度 = 中心角度 * (180 / Math.PI);
    return { x, y, 旋转角度 };
}
export const 等分计算时钟中心点集 = (等分数量, 环数, 内径, 外径, 起始角度, 圆心X坐标, 圆心y坐标) => {
    let 所有环的扇形中心点集 = [];
    let 每环半径增量 = (外径 - 内径) / 环数;
    for (let i = 0; i < 环数; i++) {
      let 当前环内径 = 内径 + i * 每环半径增量;
      let 当前环外径 = 内径 + (i + 1) * 每环半径增量;
      let 当前环的扇形中心点集 = 等分计算单环扇形中心点集(等分数量, 当前环内径, 当前环外径, 起始角度, 圆心X坐标, 圆心y坐标);
      所有环的扇形中心点集.push(...当前环的扇形中心点集);
    }
    return 所有环的扇形中心点集;
}
export const 计算二维向量象限 = (二维向量, 原点坐标=[0,0]) => {
    // 计算向量相对于原点的位置
    let 相对位置 = {
      x: 二维向量[0] - 原点坐标[0],
      y: 二维向量[1] - 原点坐标[1]
    };
    // 根据相对位置确定象限
    if (相对位置.x > 0 && 相对位置.y >= 0) {
      return 1;  // 第一象限
    } else if (相对位置.x <= 0 && 相对位置.y > 0) {
      return 2;  // 第二象限
    } else if (相对位置.x < 0 && 相对位置.y <= 0) {
      return 3;  // 第三象限
    } else if (相对位置.x >= 0 && 相对位置.y < 0) {
      return 4;  // 第四象限
    } else {
      return 0;  // 原点
    }
}
export const 计算二维向量角度 = (二维向量, 原点坐标 = [0, 0]) => {
  const dx = 二维向量[0] - 原点坐标[0];
  const dy = 二维向量[1] - 原点坐标[1];
  const radian = Math.atan2(dy, dx);
  const degree = radian * (180 / Math.PI);
  return degree < 0 ? degree + 360 : degree; // 如果角度小于0，转换为0-360度
};