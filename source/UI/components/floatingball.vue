<template>
  <div class="floating-ball"
    :style="`position:fixed;left:${position.x - 25}px;top:${position.y - 25}px;pointer-events: auto;`">
    <CircleButtonGroupAutoCompute @mouseleave="showMenu = false" v-if="showMenu" @mouseup="handleCircleButtonGroupMouseUp"
      :buttons="buttons" :origin="{ x: 0, y: 0 }" :position="{ x: position.x - 500, y: position.y - 500 }"
      :innerRadius="100" :outerRadius="500" v-show="!dragging" />

    <CircleButtonGroupAutoCompute @mouseleave="showToolsMenu = false" v-if="showToolsMenu"
      @mouseup="handleCircleButtonGroupMouseUp" :buttons="toolButtons" :origin="{ x: 0, y: 0 }"
      :position="{ x: position.x - 600, y: position.y - 600 }" :innerRadius="200" :outerRadius="600" v-show="!dragging" />
    <div class="floating-ball-cursor" 
    @mousedown.left="handleMouseDown" 
    @mouseup="handleMouseUp" 
    @mousemove="drag"
    @mouseover="showMenu=true"
      @mousedown.right="showToolsMenu = !showToolsMenu"
      :style="`position:fixed;left:${position.x - 25}px;top:${position.y - 25}px`">
    </div>
  </div>
</template>
  
<script>
import CircleButtonGroupAutoCompute from './common/CircleButtonGroupCanvas.vue';
import RadialSliderCanvas from './common/RadialSliderCanvas.vue';
import _chroma from '../../../static/chroma-js.js';
import eventBus from 'eventBus';
const chroma = _chroma.default
let keys = Object.keys(chroma.brewer);
let groupSize = Math.ceil(keys.length / 12);
export default {
  components: {
    CircleButtonGroupAutoCompute,
    RadialSliderCanvas
  },
  data() {
    return {
      currentColorScale:'OrRd',
      showToolsMenu: false,
      showMenu: false,
      dragging: false,
      position: { x: 300, y: 300 },
      toolButtons: Array.from({ length: 12 }, (_, i) =>
        keys.slice(i * groupSize, (i + 1) * groupSize).map(item => {
          // 创建一个颜色比例尺
          let colors = chroma.scale(item).colors(5); // 生成5个颜色
          return {
            //      label: item,
            fill: 'red',
            click: () => { 
              this.currentColorScale=item;
              this.showToolsMenu=false;
              setTimeout(()=>{this.showMenu=true},300) 
            },
            //shape: 'circle',
            // 创建一个径向渐变
            fillRadialGradientColorStops: [0, colors[0], 0.25, colors[1], 0.5, colors[2], 0.75, colors[3], 1, colors[4]],
            //      image:"https://img.jkbaby.cn/uploadimg/image/20210817/20210817151800_24414.jpg"
          };
        })
      ),
     
      dragTimeout: null,

    }
  },
  computed:{

    buttons(){return Array.from({ length: 12 }, (_, groupIndex) => {
        // 创建一个颜色比例尺
        console.log(this.currentColorScale)
        let colorScale = chroma.scale(this.currentColorScale).colors(12);
        let groupSize = 12
        return Array.from({ length: groupSize }, (_, buttonIndex) => {
          let color = colorScale[groupIndex];
          if (buttonIndex !== 0) {
            // 降低颜色的纯度
            let luminance = buttonIndex / groupSize;
            color = chroma(color).luminance(luminance).hex()
          }
          return {
            label: ``,
            color: color,
            click: () => eventBus.emit('css-props-change', { color }),
            contextmenu: () => eventBus.emit('css-props-change', { backgroundColor: color })
          };
        });
      })
    },
  },
  methods: {
    handleMouseDown(event) {
      if (event.target.closest('.floating-ball')) {
        this.dragTimeout = setTimeout(() => {
          this.dragStart(event);
        }, 500); // 500 毫秒后开始拖拽
      }
    },
    handleMouseUp() {
      if (!this.dragging) {
        this.dragTimeout && clearTimeout(this.dragTimeout); // 如果还没有开始拖拽，就清除 setTimeout
        this.showMenu = true; // 显示环形菜单
      } else {
        this.dragEnd();
      }
    },
    handleCircleButtonGroupMouseUp() {
      setTimeout(() => this.showMenu = false, 100) // 短暂延时后隐藏环形菜单

    },
    dragStart(event) {
      if (event.target.closest('.floating-ball')) {
        this.dragging = true;
        this.position = { x: event.clientX, y: event.clientY };
        window.addEventListener('mousemove', this.drag)
        window.addEventListener('selectstart', this.preventSelect);
      }
    },
    drag(event) {
      if (!this.dragging) return;
      const ball = this.$el;
      const dx = event.clientX - this.position.x;
      const dy = event.clientY - this.position.y;

      const left = parseInt(ball.style.left || 0);
      const top = parseInt(ball.style.top || 0);
      this.position = { x: this.position.x + dx, y: this.position.y + dy };

    },
    dragEnd() {
      this.dragging = false;
      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('selectstart', this.preventSelect);
    },
    preventSelect(event) {
      event.preventDefault();
    }
  }
}
</script>
  
<style scoped>
.floating-ball {
  position: fixed;
  cursor: move;
  z-index: 300;
  pointer-events: auto;
}
.floating-ball-cursor {
  background: radial-gradient(circle at 50% 50%, #FF9A8C 0%, #FF6A88 50%, #FF99AC 100%),
    radial-gradient(circle at 30% 30%, #FF6A88 0%, #FF9A8C 50%, #FF99AC 100%);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  ;
  pointer-events: auto;
  z-index: 700;
  pointer-events: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
#floating-ball-root {
  z-index: 300;
  pointer-events: auto;
}
</style>