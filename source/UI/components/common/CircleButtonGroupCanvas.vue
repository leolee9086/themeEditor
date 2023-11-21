<template>
  <div :style="`
            pointer-events:auto;
            z-index:500;
            border-radius:50%;
            overflow:hidden;clip-path: circle(50% at 50% 50%);
            position:fixed;
                      left:${(position && position.x) || 0 - 500}px;
            top:${(position && position.y) || 0 - 500}px;
                      `
  ">
    <div ref="container" style="pointer-events:auto;z-index:500;border-radius:50%;overflow:hidden"> </div>
  </div>
</template>
<script>
import _Konva from '../../../../static/konva.js'
const Konva = _Konva.default
import { 计算单个扇形路径, 计算圆弧路径, 计算圆形路径 } from '../../utils/svgProcessor.js';
import { 等分计算单环扇形中心点集, 计算二维向量角度 } from '../../utils/geometryProcessor.js';
import { 计算事件相对元素角度, 计算事件相对元素距离 } from '../../utils/eventGeometryProcessor.js';
import { 转置二维数组 } from '../../utils/matrixProcessor.js';
import { 添加事件监听 } from '../../utils/KonvaHelper/button.js';
export default {
  props: ['buttons', 'innerRadius', 'outerRadius', 'origin', 'position'],
  data() {
    return {
      stage: null,
      rotating: false,
      startAngle: 0,
      currentAngle: 0,
      layer: null,
      rotationSpeed: 1,
      lastRotationTime: null,
      maxVisibleRings: 1,
      anim: null,
      rotationTimeout: null,
    };
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: this.outerRadius * 2,
      height: this.outerRadius * 2,
    });
    this.stage.on('mousedown', (e) => this.rotateStart(e));
    this.stage.on('mousemove', (e) => this.rotateOnDrag(e));
    this.stage.on('mousemove', (e) => this.showRings(e));
    this.stage.on('mouseup', (e) => this.rotateEnd(e));
    this.stage.on('click', (e) => this.handleClick(e));
    this.layer = new Konva.Layer({
      //layer是一个正方形,为了让按钮圆环的旋转中心能够与元素的中心点对齐,所以需要这样的一步操作
      offsetX: this.outerRadius / 2,
      offsetY: this.outerRadius / 2,
      x: this.outerRadius,
      y: this.outerRadius,
    });
    this.stage.add(this.layer);
    this.drawButtons();
  },
  methods: {
    showRings(event) {
      const distance = 计算事件相对元素距离(event.evt, this.$el, 'center');
      let maxVisibleRings = Math.floor(distance / ((this.outerRadius - this.innerRadius) / this.maxGroupSize));
      if (this.maxVisibleRings !== maxVisibleRings) {
        this.maxVisibleRings = maxVisibleRings;
        this.layer.destroyChildren(); // 清空层上的所有元素
        this.drawButtons();
      }
    },
    创建按钮图形(button) {
      let that = this
      if (button.shape === "circle") {
        let shape = new Konva.Path({
          data: 计算圆形路径((button.outerRadius - button.innerRadius) / 2, button.center.x, button.center.y),
          fill: button.color,
          fillRadialGradientStartPoint: { x: button.center.x, y: button.center.y },
          fillPatternRepeat: 'no-repeat',
          fillPatternOffset: { x: this.outerRadius / 2, y: this.outerRadius / 2 },
          fillPatternX: button.center.x,
          fillPatternY: button.center.y,
          fillPatternScale: { x: 0.15, y: 0.15 },
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: { x: button.center.x, y: button.center.y },
          fillRadialGradientEndRadius: (button.outerRadius - button.innerRadius) / 2,
          fillRadialGradientColorStops: button.fillRadialGradientColorStops,

          // 初始位置设为圆心
        });
        let image = button.image
        if (image) {
          let imageObj = new Image();
          imageObj.onload = function () {
            shape.fillPatternImage(imageObj);
          };
          imageObj.src = image

        }
        return shape
      }
      let r = (button.outerRadius + button.innerRadius) / 2; // 半径
      let theta = Math.atan2(button.center.y - this.outerRadius / 2, button.center.x - this.outerRadius / 2); // 角度

      let directionVector = {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
      };
      let newStartPoint = {
        x: button.center.x - directionVector.x,
        y: button.center.y - directionVector.y
      };
      return new Konva.Path({
        data: button.path,
        fill: button.color,
        fillRadialGradientStartPoint: newStartPoint,
        fillRadialGradientStartRadius: button.innerRadius,
        fillRadialGradientEndPoint: newStartPoint,
        fillRadialGradientEndRadius: button.outerRadius,
        fillRadialGradientColorStops: button.fillRadialGradientColorStops,
      });
    },
    drawButtons() {
      let anims = []
      this.stage.on('wheel', (e) => this.rotate(e));
      let cunrrentAnimeIndex = 0
      this.buttonsWithCenter.forEach((button, index) => {
        if (index >= this.maxVisibleRings * this.buttons.length) return;
        if (index >= (this.maxVisibleRings - 1) * this.buttons.length) {
          const path = this.创建按钮图形(button)
          path.x(0 - button.center.x + this.outerRadius / 2)
          path.y(0 - button.center.y + this.outerRadius / 2)
          path.opacity(0)
          添加事件监听(path, button)          // 目标位置
          const targetX = 0;
          const targetY = 0;
          // 移动速度
          const initialTotalDistance = Math.sqrt(path.x() + path.y());
          let _cunrrentAnimeIndex = cunrrentAnimeIndex + 0
          const anim = new Konva.Animation((frame) => {
            // 计算元素应该移动的距离
            const dx = targetX - path.x();
            const dy = targetY - path.y();
            // 计算元素应该移动的方向
            const directionX = dx > 0 ? 1 : -1;
            const directionY = dy > 0 ? 1 : -1;
            const totalDistance = Math.sqrt(dx * dx + dy * dy);
            // 计算当前的进度（0 到 1 之间）
            const progress = Math.min(1, totalDistance / initialTotalDistance);
            path.opacity(progress)

            const speed = 500
            // 更新元素的位置
            const newX = path.x() + directionX * speed * frame.timeDiff / 1000;
            const newY = path.y() + directionY * speed * frame.timeDiff / 1000;
            path.position({
              x: newX,
              y: newY
            });            // 计算透明度
            path.opacity(Math.abs((path.x() + 0.1) / targetX))
            // 如果元素的位置接近或等于目标位置，停止动画
            if (Math.abs(targetX - newX) < speed && Math.abs(targetY - newY) < speed) {
              path.x(targetX);
              path.y(targetY);
              path.opacity(1)
              anims[_cunrrentAnimeIndex + 1] && anims[_cunrrentAnimeIndex + 1].start()
              anim.stop();
            }
          }, this.layer);
          cunrrentAnimeIndex += 1
          this.layer.add(path);
          // 开始动画
          anims[anims.length - 1] && (anims[anims.length - 1]._next = anim)
          anims.push(anim)
        } else {
          const path = this.创建按钮图形(button)
          添加事件监听(path, button)          // 目标位置
          this.layer.add(path);
        }
        if (button.label) {
          const textPath = new Konva.TextPath({
            text: button.label,
            fontSize: 20,
            fontFamily: 'Verdana',
            fill: 'black',
            stroke: 'black',
            strokeWidth: 1,
            fontStyle: 'bold',
            data: button.textPath,
          });

          this.layer.add(textPath);
        }
      });
      anims[0] ? anims[0].start() : null
      this.layer.draw();
    },
    rotateStart(event) {
      this.rotationTimer = setTimeout(() => {
        this.rotating = true;
        this.startAngle = 计算事件相对元素角度(event.evt, this.$el, 'center');
        this.isDraging = true
      }, 200); // 1秒后开始旋转    
    },
    rotateOnDrag(event) {
      if (!this.rotating) return;
      const currentAngle = 计算事件相对元素角度(event.evt, this.$el, 'center');
      const deltaAngle = currentAngle - (this.startAngle || 0);
      this.currentAngle += deltaAngle;
      this.layer.rotation(this.currentAngle || deltaAngle);
      this.startAngle = currentAngle;
    },
    rotate(event) {
      this.rotating = true;
      const delta = event.evt.deltaY;
      const direction = delta > 0 ? 1 : -1;
      // 如果滚轮的方向改变了，就更新动画的方向并重置速度
      if (this.rotationDirection !== direction) {
        this.rotationDirection = direction;
        this.rotationSpeed = 1;
      }
      if (!this.anim) {
        this.rotationStartTime = Date.now();
        this.anim = new Konva.Animation((frame) => {
          // 计算自动画开始以来的时间（以秒为单位）
          const elapsedTime = (Date.now() - this.rotationStartTime) / 1000;
          // 让速度因子在动画开始时为 1，然后每秒增加 0.1
          this.rotationSpeed = 1 + elapsedTime * 1;
          const angleDiff = this.rotationDirection * frame.timeDiff * 100 * this.rotationSpeed / 1000;
          this.currentAngle += angleDiff;
          this.layer.rotation(this.currentAngle);
        }, this.layer);
        this.anim.start();
      }
      // 如果已经有一个等待停止动画的 setTimeout，就清除它
      if (this.rotationTimeout) {
        clearTimeout(this.rotationTimeout);
      }
      // 创建一个新的 setTimeout 来在半秒后停止动画
      this.rotationTimeout = setTimeout(() => {
        this.anim.stop();
        this.anim = null;
        !this.isDraging ? this.rotating = false : null;
        this.rotationSpeed = 1;
      }, 500);
    },
    rotateEnd(e) {
      clearTimeout(this.rotationTimer);
      this.isDraging = false
      if (this.rotating) {
        this.rotating = false;
        e.evt.stopPropagation()
      } else {
        // 触发点击事件
      }
    },
    getMainButtonPath(index, total, innerRadius, outerRadius) {
      return 计算单个扇形路径(total, innerRadius, outerRadius, index, this.outerRadius / 2, this.outerRadius / 2);

    },
    getTextPath(index, total, innerRadius, outerRadius) {
      const anglePerButton = 360 / total;
      const startAngle = index * anglePerButton;
      const endAngle = (index + 1) * anglePerButton;
      return 计算圆弧路径(this.outerRadius / 2, this.outerRadius / 2, innerRadius + (outerRadius - innerRadius) / 2, startAngle, endAngle);
    },
    calculateRadius(groupIndex, innerRadius = 0, outerRadius) {
      if (this.goldenRatio) {
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        innerRadius = outerRadius;
        outerRadius *= goldenRatio;
        return { innerRadius, outerRadius };
      } else {
        const increment = (this.outerRadius - this.innerRadius) / this.maxGroupSize; // 你可以根据需要调整这个值
        innerRadius = (groupIndex - 1) * increment + this.innerRadius;
        outerRadius = groupIndex * increment + this.innerRadius;
        console.log(outerRadius, this.outerRadius)
        return { innerRadius, outerRadius };
      }
    },
    convertButtons() {
      let array;
      if (!Array.isArray(this.buttons[0])) {
        array = [this.buttons];
      } else {
        array = this.buttons;
      }
      let result = 转置二维数组(array);
      this.maxGroupSize = result.length;
      return result;
    },
    createButtonObject(button, index, total, innerRadius, outerRadius, centers) {
      let newButton = {};
      newButton.center = centers[index];
      newButton.path = this.getMainButtonPath(index, total, innerRadius, outerRadius);
      newButton.textPath = this.getTextPath(index, total, innerRadius, outerRadius);
      // Copy properties from the original button to the new button
      for (let key in button) {
        if (button.hasOwnProperty(key)) {
          newButton[key] = button[key];
          newButton.innerRadius = innerRadius
          newButton.outerRadius = outerRadius

        }
      }
      return newButton;
    },
    handleClick(event) {
      if (this.rotating) {
        event.stopPropagation && event.stopPropagation();
      }
    },
  },
  computed: {
    buttonsWithCenter() {
      let innerRadius = 0;
      let outerRadius = this.innerRadius;
      const buttons = this.convertButtons();
      let results = buttons.map((buttonGroup, groupIndex) => {
        const total = Array.isArray(this.buttons[0]) ? this.buttons.length : 6
        let radius = this.calculateRadius(groupIndex, innerRadius, outerRadius);
        innerRadius = radius.innerRadius;
        outerRadius = radius.outerRadius;
        const centers = 等分计算单环扇形中心点集(total, innerRadius, outerRadius, 0, this.outerRadius / 2, this.outerRadius / 2);
        return buttonGroup.map((button, index) => this.createButtonObject(button, index, total, innerRadius, outerRadius, centers));
      }).flat();
      return results
    },

  },

};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
}

canvas {
  border-radius: 50% !important;
}
</style>