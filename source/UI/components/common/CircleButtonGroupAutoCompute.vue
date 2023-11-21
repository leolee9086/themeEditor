<template>
  <svg class="circle-button-container" :viewBox="`${0} ${0} ${size*2} ${size*2}`"
    :style="`pointer-events:auto;width:${size}px;height:${size}px`"       @mouseleave="$emit('mouseoutTotal')">
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

  },
  computed: {
    buttonsWithCenter() {
  let 内半径 = this.innerRadius;
  let 外半径 = this.outerRadius;
  const 按钮 = this.convertButtons();
  let 结果 = 按钮.map((按钮组, 组索引) => {
    const 总数 = Array.isArray(this.buttons[0]) ? this.buttons.length : 6;
    let 半径 = this.calculateRadius(组索引, 内半径, 外半径);
    内半径 = 半径.innerRadius;
    外半径 = 半径.outerRadius;      
    const 中心 = this.calculateCenters(总数, 内半径, 外半径);
    return 按钮组.map((按钮, 索引) => this.createButtonObject(按钮, 索引, 总数, 内半径, 外半径, 中心));
  }).flat();
  console.log(结果);
  return 结果;
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