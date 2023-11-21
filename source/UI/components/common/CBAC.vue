<template>
    <svg class="circle-button-container" :viewBox="`${0} ${0} ${size*2} ${size*2}`"
      :style="`pointer-events:auto;width:${size}px;height:${size}px; transform: rotate(${currentAngle}deg);transform-origin:${size/4}px ${size/4}px`"       
      @mouseleave="$emit('mouseoutTotal')"
      @mousedown="rotateStart"
      @mousemove="rotate"
      @mouseup="rotateEnd"
      @click="handleClick">
      <g  class="main-group" v-for="(button, index) in buttonsWithCenter" :key="index"
        v-show="buttons" @click.prevent @mousedown.prevent @mouseover.prevent  @mouseleave.prevent :style="`pointer-events:auto;`">
        <path class="circle-button main" 
    @click.prevent="button.action"  
    @mousedown.prevent 
    @mouseover.prevent="button.mouseover&&button.mouseover" 
    @mouseout.prevent="button.mouseout&&button.mouseout" 
    @click.right.prevent="button.rightClick" 
    :d="button.path" 
    stroke='black'
    :style='`fill:${button.color}`'>
  </path>
        <path v-if="button.label" :id="`path-${uid(index)}-${index}`" :d="button.textPath" fill="none" />
        <text style="pointer-events: none;  user-select: none;" dy=".35em" font-family="Verdana" font-size="20" fill="black"
          stroke="black" stroke-width="1px" font-weight="bolder">
          <textPath :href="`#path-${uid(index)}-${index}`"
            :startOffset="calculateStartOffset(button.label, button.textPath, 20) + 'px'">
            {{ button.label }}
          </textPath>
        </text>
      </g>
    </svg>
  </template>
  
  <script>
  import { 计算单个扇形路径, 计算扇形中心点集, 计算圆弧路径 } from '../../utils/svgProcessor.js';
  
  export default {
    props: ['buttons', 'size', 'innerRadius', 'outerRadius','origin'],
    data() {
      return {
        rotating: false,
        startAngle: 0,
        currentAngle: 0,
      };
    },
    methods: {
      uid(index) {
        return Date.now() + index
      },
      getTextLength(text, fontSize) {
        // 创建一个临时的SVG元素来计算文本长度
        let tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tempText.setAttribute("font-size", fontSize);
        tempText.textContent = text;
        tempSvg.appendChild(tempText);
        document.body.appendChild(tempSvg);
        let length = tempText.getComputedTextLength();
        document.body.removeChild(tempSvg);
        return length;
      },
      getPathLength(path) {
        // 创建一个新的SVG路径元素来计算路径长度
        let tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tempPath.setAttribute("d", path);
        let length = tempPath.getTotalLength();
        return length;
      },
      calculateStartOffset(text, path, fontSize) {
        let textLength = this.getTextLength(text, fontSize);
        let pathLength = this.getPathLength(path);
        let startOffset = (pathLength - textLength) / 2; // 计算startOffset值
        return startOffset;
      },
      getMainButtonPath(index, total, innerRadius, outerRadius) {
        return 计算单个扇形路径(total, innerRadius, outerRadius, index,this.size/2, this.size/2);
      },
      getTextPath(index, total, innerRadius, outerRadius) {
        const anglePerButton = 360 / total;
        const startAngle = index * anglePerButton;
        const endAngle = (index + 1) * anglePerButton;
        return 计算圆弧路径(this.size/2,this.size/2, innerRadius+(outerRadius-innerRadius)/2, startAngle, endAngle);
      },
      calculateRadius(groupIndex, innerRadius, outerRadius) {
        if(this.goldenRatio){
          const goldenRatio = (1 + Math.sqrt(5)) / 2;
          innerRadius = outerRadius;
          outerRadius *= goldenRatio;
          return { innerRadius, outerRadius };
        }else{
          const increment = 100; // 你可以根据需要调整这个值
          innerRadius = outerRadius;
          outerRadius += increment;
          return { innerRadius, outerRadius };
        }
      },
      convertButtons() {
        let array
        let result =[]
        if (!Array.isArray(this.buttons[0])) {
          array=[this.buttons]
        }else{
          array=this.buttons
        }
        let lengths=array.map(group => group.length)
        let maxGroupSize = Math.max(...lengths);
        for (let i = 0; i < maxGroupSize; i++) {
          result[i] = [];
        }
        for (let group of array) {
          for (let i = 0; i < group.length; i++) {
            result[i].push(group[i]);
          }
        }
        return result;
      },
      calculateCenters(total, innerRadius, outerRadius) {
        return 计算扇形中心点集(total, innerRadius, outerRadius, 0, (innerRadius + outerRadius) / 2, (innerRadius + outerRadius) / 2);
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
        }
      }
      return newButton;
    },
    rotateStart(event) {
      this.rotating = true;
      this.startAngle = this.calculateAngle(event);
    },
    async rotate(event) {
      if (!this.rotating) return;
      const currentAngle = this.calculateAngle(event);
      const deltaAngle = currentAngle - this.startAngle;
     this.currentAngle += deltaAngle;
      
      this.startAngle = currentAngle;
    },
    rotateEnd() {
      this.rotating = false;
    },
    calculateAngle(event) {
      const rect = this.$el.getBoundingClientRect();
      const centerX = rect.left + this.size/4
      const centerY = rect.top + this.size/4
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      return angle;
    },
    handleClick(event) {
      if (this.rotating) {
        event.stopPropagation();
      }
    },
  },
  computed: {
    buttonsWithCenter() {
      let innerRadius = this.innerRadius;
      let outerRadius = this.outerRadius;
      const buttons = this.convertButtons();
      let results= buttons.map((buttonGroup, groupIndex) => {
        const total = Array.isArray(this.buttons[0])?this.buttons.length:6
        let radius = this.calculateRadius(groupIndex, innerRadius, outerRadius);
        innerRadius = radius.innerRadius;
        outerRadius = radius.outerRadius;      
        const centers = this.calculateCenters(total, innerRadius, outerRadius);
        return buttonGroup.map((button, index) => this.createButtonObject(button, index, total, innerRadius, outerRadius, centers));
      }).flat();
      return results
    },
  },
};
</script>

<style scoped>
.circle-button-container {
  width: 100%;
  height: 100%;
  position: absolute
}

.circle-button {
  cursor: pointer;
}
</style>