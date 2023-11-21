<template>
  <svg class="circle-button-container" viewBox="0 0 200 200" :style="`pointer-events: none;width:${size/2}px;height:${size/2}px`">
    <g style="pointer-events: all;" class="main-group" v-for="(button, index) in buttonsWithCenter" :key="index" v-show="mainGroup">
      <path  class="circle-button main" @click="button.action"
            :d="getMainButtonPath(index)" stroke='black' :style='`fill:${button.color}`'>
      </path>
      <path
        v-if="button.label"
        :id="`path-${uid(index)}-${index}`"
        :d="getTextPath(index)"
        fill="none"
      />
      <text style="pointer-events: none;  user-select: none;" dy=".35em" font-family="Verdana" font-size="20" fill="black" stroke="black" stroke-width="1px" font-weight="bolder">
        <textPath 
        :href="`#path-${uid(index)}-${index}`" 
        :startOffset="calculateStartOffset(button.label, getTextPath(index), 20) + 'px'"        >
          {{ button.label }}
        </textPath>
      </text>
    </g>
  </svg>
</template>
<script>
import { 计算单个扇形路径,计算圆弧路径 } from '../../utils/svgProcessor.js';
import { 等分计算单环扇形中心点集 } from '../../utils/geometryProcessor.js';

export default {
  props: [ 'mainGroup', 'size', 'innerRadius', 'outerRadius'],
  methods: {
    uid(index){
      return Date.now()+index
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

    getMainButtonPath(index) {
      const total = this.mainGroup.length;
      const innerRadius = this.innerRadius || 0;
      const outerRadius = this.outerRadius || 80;
      return 计算单个扇形路径(total, innerRadius, outerRadius, index,this.size? this.size/2:100,this.size? this.size/2:100);
    },
    getTextPath(index) {
      const total = this.mainGroup.length;
  const anglePerButton = 360 / total;
  const startAngle = (index) * anglePerButton;
  const endAngle = (index+1) * anglePerButton;
  const innerRadius = (this.innerRadius || 0) + ((this.outerRadius || 80) - (this.innerRadius || 0)) / 2;
  const centerX = this.size ? this.size / 2 : 100;
  const centerY = this.size ? this.size / 2 : 100;
  return 计算圆弧路径(centerX, centerY, innerRadius, startAngle, endAngle);
    },
  },
  computed: {
    buttonsWithCenter() {
      const total = this.mainGroup.length;
      const innerRadius = this.innerRadius || 0;
      const outerRadius = this.outerRadius || 80;
      const centerX =this.size? this.size/2:100;
      const centerY = this.size? this.size/2:100;
      const centers = 等分计算单环扇形中心点集(total, innerRadius, outerRadius, 0, centerX, centerY);
      return this.mainGroup.map((button, index) => ({
        ...button,
        center: centers[index]
      }));
    }
  },
};
</script>

<style scoped>
.circle-button-container {
  width: 100%;
  height: 100%;
  position:absolute
}

.circle-button {
  cursor: pointer;
}


</style>