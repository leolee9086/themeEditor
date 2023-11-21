export const 添加事件监听 = (path, eventHandlers) => {
    // Konva路径元素支持的事件集合
    const supportedEvents = new Set([
      'click',
      'dblclick',
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mousemove',
      'mouseenter',
      'mouseleave',
      'contextmenu',
      'touchstart',
      'touchend',
      'touchmove',
      'dragstart',
      'dragmove',
      'dragend',
      // 添加其他支持的事件...
    ]);
  
    if (!path || typeof eventHandlers !== 'object') {
      throw new Error('Invalid arguments');
    }
  
    for (const event in eventHandlers) {
        if (supportedEvents.has(event) && eventHandlers[event] && typeof eventHandlers[event] === 'function') {
          path.on(event, eventHandlers[event]);
        }
      }
  };