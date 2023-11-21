<template>
    <div class="controls fn__flex fn__flex-column">
      <template  
      v-for="(background, index) in backgrounds"         
      :key="'BackgroundControl'+index">
        <BackgroundControl
          :background="background"
          :index="index"
          :backgrounds="backgrounds"
          @move-up="moveUp"
          @move-down="moveDown"
          @delete="delete"
          @add="add"
        />
        <div class="cc-toolbar__divider__vertical"></div>
      </template>

    </div>
  </template>
  <script>
  import BackgroundControl from './BackgroundControl.vue';
  export default {
    components: {
      BackgroundControl
    },
    props: ['backgrounds'],
    methods: {
    moveUp(index) {
      if (index > 0) {
        const temp = this.backgrounds[index];
        this.backgrounds.splice(index, 1);
        this.backgrounds.splice(index - 1, 0, temp);
      }
    },
    moveDown(index) {
      if (index < this.backgrounds.length - 1) {
        const temp = this.backgrounds[index];
        this.backgrounds.splice(index, 1);
        this.backgrounds.splice(index + 1, 0, temp);
      }
    },
    delete(index){
      this.backgrounds.splice(index, 1);
    },
    add(index){
      const temp = this.backgrounds[index];
      this.backgrounds.splice(index + 1, 0, JSON.parse(JSON.stringify(temp)));

    }
    }
  }
  </script>