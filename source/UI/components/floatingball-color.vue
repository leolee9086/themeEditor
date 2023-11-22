<template>
  <div class="floating-ball"
    :style="`position:fixed;left:${position.x - 25}px;top:${position.y - 25}px;pointer-events: auto;z-index:${zindex}`">
    <CircleButtonGroupAutoCompute @mouseleave="showMenu = false" v-if="(!mouseLeaved) && showMenu"
      @mouseup="handleCircleButtonGroupMouseUp" :buttons="buttons" :origin="{ x: 0, y: 0 }"
      :position="{ x: position.x - 500, y: position.y - 500 }" :innerRadius="100" :outerRadius="500" v-show="!dragging" />
    <CircleButtonGroupAutoCompute @mouseleave="showToolsMenu = false" v-if="(!mouseLeaved) && showToolsMenu"
      @mouseup="handleCircleButtonGroupMouseUp" :buttons="toolButtons" :origin="{ x: 0, y: 0 }"
      :position="{ x: position.x - 600, y: position.y - 600 }" :innerRadius="200" :outerRadius="600" v-show="!dragging" />
    <div class="floating-ball-cursor" ref='cursor' @mousedown.left="handleMouseDown" @mouseup="handleMouseUp"
      @mousemove="drag" @mouseover="handlemouseover" @dblclick="handleDoubleClick" @mouseleave="handleMouseLeave"
      @click="handleClick" @contextmenu.prevent="handleRightClick" :style=cursorStyle>
      <svg style="max-width:66%;max-height:66%;">
        <use xlink:href="#iconThemeEditor"></use>
      </svg>
    </div>
  </div>
</template>
  
<script>
import CircleButtonGroupAutoCompute from './common/CircleButtonGroupCanvas.vue';
import RadialSliderCanvas from './common/RadialSliderCanvas.vue';
import _chroma from '../../../static/chroma-js.js';
import eventBus from 'eventBus';
import {计算zindex} from '../utils/zindex.js'

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
      isMounted:false,
      currentColor: '',
      currentBackground: "",
      currentBackgroundColor: "",
      lastRightClickTime: 0,
      isDoubleClick: false,
      doubleClickTimeout: null,
      mouseoverTimeout: null,
      mouseLeaved: true,
      currentColorScale: 'OrRd',
      showToolsMenu: false,
      showMenu: false,
      dragging: false,
      position: { x: 300, y: 300 },
      toolButtons: Array.from({ length: 12 }, (_, i) => {
        return keys.slice(i * groupSize, (i + 1) * groupSize).map(item => {
          // 创建一个颜色比例尺
          let colors = chroma.scale(item).colors(5); // 生成5个颜色
          return {
            //      label: item,
            fill: colors[0],
            click: (event) => {
              if (event.evt.button === 0) {
                this.currentColorScale = item;
                this.showToolsMenu = false;
                setTimeout(() => { this.showMenu = true }, 300)

              }
            },
            // shape: 'circle',
            // 创建一个径向渐变
            contextmenu: () => {
              // 创建一个颜色渐变
              let gradient = chroma.scale(item).mode('lch').colors(5);
              // 将渐变转换为 CSS 渐变
              let cssGradient = `linear-gradient(${gradient[0]}, ${gradient[1]}, ${gradient[2]}, ${gradient[3]}, ${gradient[4]})`;              // 发出事件
              this.currentBackground = cssGradient
              eventBus.emit('css-props-change', { background: cssGradient });
            },
            fillRadialGradientColorStops: [0, colors[0], 0.25, colors[1], 0.5, colors[2], 0.75, colors[3], 1, colors[4]],
            //      image:"https://img.jkbaby.cn/uploadimg/image/20210817/20210817151800_24414.jpg"
          };
        }).sort((a, b) => {
          const colorA = a.fill;
          const colorB = b.fill;
          return chroma.distance(colorA, colorB);
        });
      }
      ),
      dragTimeout: null,
    }
  },
  mounted(){
    this.isMounted=true
  },
  computed: {
    zindex(){
      if(!this.isMounted){
        return 4
      }
      this.$el.parentElement.style.zIndex=计算zindex('.layout__resize')
      return this.$el.parentElement.style.zIndex
    },
    cursorStyle() {
      return `position:fixed;
      left:${this.position.x - 25}px;
      top:${this.position.y - 25}px;
      color:${this.currentColor};
      background:${this.currentBackground};
      background-color:${this.currentBackgroundColor}`
    },
    buttons() {
      return Array.from({ length: 12 }, (_, groupIndex) => {
        // 创建一个颜色比例尺
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
            click: (event) => {
              if (event.evt.button === 0) {

                this.currentColor = color

                eventBus.emit('css-props-change', { color });
              }
            },
            contextmenu: (event) => {
              event.evt.preventDefault();
              this.currentBackground = ""

              this.currentBackgroundColor = color
              eventBus.emit('css-props-change', { backgroundColor: color })
            }
          };
        });
      })
    },
  },
  methods: {
    handlemouseover(e) {
      this.mouseLeaved = false;

      if(e.target===this.$refs.cursor){
        e.stopPropagation()

        return
      }
     /* if (this.mouseLeaved === false) {

        return
      }*/
      this.mouseoverTimeout =this.mouseoverTimeout||  setTimeout(() => {
        if(!this.mouseLeaved){
              this.showMenu = true;
        }
        clearTimeout(this.mouseoverTimeout);
        this.mouseoverTimeout=null
      }, 500);
    },

    handleMouseLeave(e) {
      // 检查 mouseleave 事件的相关目标
      const related = e.relatedTarget;
      // 如果相关目标是元素本身或其子元素，那么不隐藏菜单
      if (this.$el!==e.currentTarget) {
        return;
      }
      clearTimeout(this.mouseoverTimeout);
      this.mouseoverTimeout = null
      this.mouseLeaved = true;
      this.showMenu = false;
      this.showToolsMenu = false
    },
    handleClick() {
      eventBus.emit('css-props-change', { backgroundColor: this.$refs.cursor.style.backgroundColor })
      eventBus.emit('css-props-change', { background: this.$refs.cursor.style.background })
      eventBus.emit('css-props-change', { color: this.$refs.cursor.style.color })
    },
    handleRightClick() {
      const now = Date.now();
      const timeDiff = now - this.lastRightClickTime;
      this.lastRightClickTime = now;
      if (timeDiff < 500) { // 500ms 内的连续右键点击会被认为是右键双击
        this.isDoubleClick = true;
        // 如果已经存在一个定时器，先清除它
        if (this.doubleClickTimeout) {
          clearTimeout(this.doubleClickTimeout);
        }
        // 设置一个新的定时器，在500ms后重置 isDoubleClick 状态
        this.doubleClickTimeout = setTimeout(() => {
          this.isDoubleClick = false;
        }, 500);
      } else {
        this.isDoubleClick = false;
      }
      // 如果不是双击事件，执行单击事件的逻辑
      if (!this.isDoubleClick) {
        this.showToolsMenu = !this.showToolsMenu;
      }
    },

    handleDoubleClick() {
      eventBus.emit('dialog-open-backgroundEditor', {});
    },
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
      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('selectstart', this.preventSelect);
      setTimeout(() => { this.dragging = false; }, 200)
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
  pointer-events: auto;
}

.floating-ball-cursor {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  ;
  pointer-events: auto;
  pointer-events: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--b3-theme-secondary)
}

#floating-ball-root {
  pointer-events: auto;
}
</style>