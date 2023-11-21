export const 转置二维数组 = (数组) => {
  // 找到最长子数组的长度
  const 最大组大小 = Math.max(...数组.map(组 => 组.length));

  // 初始化结果数组
  let 结果 = Array.from({ length: 最大组大小 }, () => []);

  // 填充结果数组
  for (let 组 of 数组) {
    for (let i = 0; i < 组.length; i++) {
      结果[i].push(组[i]);
    }
  }

  return 结果;
}