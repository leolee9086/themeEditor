<template>
    <div class="border-editor-grid">
      <!-- Top Left Radius -->
      <div class="cell">
        <input type="text" v-model="border.top.left.radius.$raw" placeholder="Top Left Radius">
      </div>
  
      <!-- Top Border -->
      <div class="cell">
        <input type="text" v-model="border.top.width.$raw" placeholder="Top Border Width">
        <input type="color" v-model="border.top.color.$raw" placeholder="Top Border Color">
      </div>
  
      <!-- Top Right Radius -->
      <div class="cell">
        <input type="text" v-model="border.top.right.radius.$raw" placeholder="Top Right Radius">
      </div>
  
      <!-- Left Border -->
      <div class="cell">
        <input type="text" v-model="border.left.width.$raw" placeholder="Left Border Width">
        <input type="color" v-model="border.left.color.$raw" placeholder="Left Border Color">
      </div>
  
      <!-- Center: Border Image -->
      <div class="cell">
        <input type="url" v-model="border.image.source.$raw" placeholder="Border Image Source">
        <input type="text" v-model="border.image.slice.$raw" placeholder="Border Image Slice">
        <input type="text" v-model="border.image.width.$raw" placeholder="Border Image Width">
        <input type="text" v-model="border.image.outset.$raw" placeholder="Border Image Outset">
        <select v-model="border.image.repeat.$raw">
          <!-- options -->
        </select>
      </div>
  
      <!-- Right Border -->
      <div class="cell">
        <input type="text" v-model="border.right.width.$raw" placeholder="Right Border Width">
        <input type="color" v-model="border.right.color.$raw" placeholder="Right Border Color">
      </div>
  
      <!-- Bottom Left Radius -->
      <div class="cell">
        <input type="text" v-model="border.bottom.left.radius.$raw" placeholder="Bottom Left Radius">
      </div>
  
      <!-- Bottom Border -->
      <div class="cell">
        <input type="text" v-model="border.bottom.width.$raw" placeholder="Bottom Border Width">
        <input type="color" v-model="border.bottom.color.$raw" placeholder="Bottom Border Color">
      </div>
  
      <!-- Bottom Right Radius -->
      <div class="cell">
        <input type="text" v-model="border.bottom.right.radius.$raw" placeholder="Bottom Right Radius">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['border'],
  }
  </script>
  
  <style scoped>
  .border-editor-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  .cell {
    padding: 10px;
  }
  </style>