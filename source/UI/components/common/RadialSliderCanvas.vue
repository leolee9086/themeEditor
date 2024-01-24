<template>
    <div ref="container" class="container"></div>
  </template>
  
  <script>
import _Konva from '../../../../static/konva.js'
const Konva = _Konva.default
  export default {
    name: 'SectorSlider',
    data() {
      return {
        stage: null,
        layer: null,
        slider: null,
        angle: 0,
        radius: 100,
        thickness: 20,
      };
    },
    mounted() {
  this.stage = new Konva.Stage({
    container: this.$refs.container,
    width: this.radius * 2,
    height: this.radius * 2,
  });
  this.layer = new Konva.Layer();
  this.stage.add(this.layer);

  const track = new Konva.Arc({
    x: this.radius,
    y: this.radius,
    innerRadius: this.radius - this.thickness,
    outerRadius: this.radius,
    angle: 360,
    fill: '#ddd',
  });
  this.layer.add(track);

  this.slider = new Konva.Line({
    points: [this.radius, this.radius, this.radius, 0],
    stroke: '#f00',
    strokeWidth: 5,
    lineCap: 'round',
  });
  this.layer.add(this.slider);

  let isDragging = false;

  this.slider.on('mousedown', () => {
    isDragging = true;
  });

  this.stage.on('mousemove', (e) => {
    if (!isDragging) return;
    const pos = this.stage.getPointerPosition();
    const dx = pos.x - this.radius;
    const dy = pos.y - this.radius;
    this.angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    if (this.angle < 0) this.angle += 360;
    this.slider.rotation(this.angle);
    this.layer.draw();
  });

  this.stage.on('mouseup', () => {
    isDragging = false;
  });

  this.layer.draw();
},
  };
  </script>
  
  <style scoped>
  .container {
    width: 200px;
    height: 200px;
  }
  </style>