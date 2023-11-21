function validateGradient(gradient) {
    // 检查类型字段
    if (!gradient.type || (gradient.type !== 'linear' && gradient.type !== 'radial')) {
      return false;
    }
    // 检查重复渐变字段
    if (typeof gradient.repeating !== 'boolean') {
      return false;
    }
    // 检查角度字段
    if (gradient.type === 'linear' && typeof gradient.angle !== 'string') {
      return false;
    }
    // 检查形状和大小字段
    if (gradient.type === 'radial') {
      if (typeof gradient.shape !== 'string' || typeof gradient.size !== 'string') {
        return false;
      }
      // 检查位置字段
      if (!gradient.position || typeof gradient.position.x !== 'string' || typeof gradient.position.y !== 'string') {
        return false;
      }
    }
    // 检查颜色停止点数组
    if (!Array.isArray(gradient.colorStops) || gradient.colorStops.length === 0) {
      return false;
    }
    for (let colorStop of gradient.colorStops) {
      if (typeof colorStop.color !== 'string' || typeof colorStop.position !== 'string') {
        return false;
      }
    }
    // 如果所有字段都通过了检查，返回true
    return true;
  }