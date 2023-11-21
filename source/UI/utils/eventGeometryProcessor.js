import { 计算二维向量角度 } from './geometryProcessor.js';

export const 计算事件相对元素角度 = (event, element, origin = 'center') => {
    const rect = element.getBoundingClientRect();
    let originX, originY;
  
    if (typeof origin === 'string') {
      switch (origin) {
        case 'topLeft':
          originX = rect.left;
          originY = rect.top;
          break;
        case 'topRight':
          originX = rect.right;
          originY = rect.top;
          break;
        case 'bottomLeft':
          originX = rect.left;
          originY = rect.bottom;
          break;
        case 'bottomRight':
          originX = rect.right;
          originY = rect.bottom;
          break;
        case 'center':
        default:
          originX = rect.left + rect.width / 2;
          originY = rect.top + rect.height / 2;
          break;
      }
    } else if (Array.isArray(origin) && origin.length === 2) {
      originX = rect.left + origin[0];
      originY = rect.top + origin[1];
    } else {
      throw new Error('Invalid origin');
    }
  
    const point = [event.clientX, event.clientY];
    const center = [originX, originY];
    const angle = 计算二维向量角度(point, center);
    return angle;
  }
  export const 计算事件相对元素位置 = (event, element, origin = 'center') => {
    const rect = element.getBoundingClientRect();
    let originX, originY;
    if (typeof origin === 'string') {
      switch (origin) {
        case 'topLeft':
          originX = rect.left;
          originY = rect.top;
          break;
        case 'topRight':
          originX = rect.right;
          originY = rect.top;
          break;
        case 'bottomLeft':
          originX = rect.left;
          originY = rect.bottom;
          break;
        case 'bottomRight':
          originX = rect.right;
          originY = rect.bottom;
          break;
        case 'center':
        default:
          originX = rect.left + rect.width / 2;
          originY = rect.top + rect.height / 2;
          break;
      }
    } else if (Array.isArray(origin) && origin.length === 2) {
      originX = rect.left + origin[0];
      originY = rect.top + origin[1];
    } else {
      throw new Error('Invalid origin');
    }
    const relativeX = event.clientX - originX;
    const relativeY = event.clientY - originY;
    return { x: relativeX, y: relativeY };
  }
  export const 计算事件相对元素距离 = (event, element, origin = 'center') => {
    const relativePosition = 计算事件相对元素位置(event, element, origin);
    const distance = Math.sqrt(Math.pow(relativePosition.x, 2) + Math.pow(relativePosition.y, 2));
    return distance;
  }