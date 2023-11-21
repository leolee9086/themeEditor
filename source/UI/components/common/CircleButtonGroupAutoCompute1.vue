<template>
  <svg class="circle-button-container" :viewBox="`${0} ${0} ${size*2} ${size*2}`"
    :style="`pointer-events:none;width:${size}px;height:${size}px`">
    <g  class="main-group" v-for="(button, index) in buttonsWithCenter" :key="index"
      v-show="buttons" @click.prevent @mousedown.prevent :style="`pointer-events:auto;`">
      <path class="circle-button main" @click.prevent="button.action"  @mousedown.prevent :d="button.path" stroke='black'
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
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    innerRadius = outerRadius;
    outerRadius *= goldenRatio;
    return { innerRadius, outerRadius };
  },

  convertButtons() {
  if (!Array.isArray(this.buttons[0])) {
    let fib = [0, 1, 1]; // 添加第二个1到斐波那契数列
    let i = 2; // 从索引2开始
    while (fib[i] < this.buttons.length) {
      fib.push(fib[i] + fib[i - 1]);
      i++;
    }
    let result = [];
    for (let j = 2; j < fib.length; j++) { // 从索引2开始分割
      result.push(this.buttons.slice(fib[j - 1], fib[j]));
    }
    return result;
  }
  
  return this.buttons;
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
    let innerRadius = this.innerRadius;
    let outerRadius = this.outerRadius;

    const buttons = this.convertButtons();
    let results= buttons.map((buttonGroup, groupIndex) => {

      const total = buttonGroup.length * (groupIndex + 1);
      let radius = this.calculateRadius(groupIndex, innerRadius, outerRadius);
      innerRadius = radius.innerRadius;
      outerRadius = radius.outerRadius;      
      const centers = this.calculateCenters(total, innerRadius, outerRadius);
      return buttonGroup.map((button, index) => this.createButtonObject(button, index, total, innerRadius, outerRadius, centers));
    }).flat();
    console.log(results)
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