<template>
    <div>
      <select class="b3-select fn__flex-center" v-model="keywordX" @change="updatePosition">
        <option value="">Custom</option>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      <CssSizeInputter v-if="!keywordX" v-model="positionX" @input="updatePosition" />
      <select class="b3-select fn__flex-center" v-model="keywordY" @change="updatePosition">
        <option value="">Custom</option>
        <option value="top">Top</option>
        <option value="center">Center</option>
        <option value="bottom">Bottom</option>
      </select>
      <CssSizeInputter v-if="!keywordY" v-model="positionY" @input="updatePosition" />
    </div>
  </template>
  
  <script>
  import { nextTick } from 'vue';
  import CssSizeInputter from '../../common/CssSizeInputter.vue';
  
  export default {
    components: { CssSizeInputter },
    props: ['modelValue'],
    data() {
      return {
        keywordX: this.isKeyword(this.modelValue.split(' ')[0]) ? this.modelValue.split(' ')[0] : '',
        keywordY: this.isKeyword(this.modelValue.split(' ')[1]) ? this.modelValue.split(' ')[1] : '',
        positionX: this.isKeyword(this.modelValue.split(' ')[0]) ? '' : this.modelValue.split(' ')[0],
        positionY: this.isKeyword(this.modelValue.split(' ')[1]) ? '' : this.modelValue.split(' ')[1],
      };
    },
    methods: {
      isKeyword(value) {
        return ['left', 'center', 'right', 'top', 'bottom'].includes(value);
      },
      updatePosition() {
        nextTick(() => {
          this.$emit('update:modelValue', `${this.keywordX || this.positionX} ${this.keywordY || this.positionY}`);
        });
      },
    },
  };
  </script>