<template>
  <div class="fn__flex fn__flex-column">
    <CircleButtonGroup 
    :buttons="mainGroup" 
    :mainGroup="mainGroup" 
    :size="200" 
    :innerRadius=60
    :outerRadius=100
    />
  </div>
</template>
  
  <script>
  import CircleButtonGroup from '../common/CircleButtonGroup.vue';
  export default {
    components: {
  CircleButtonGroup
},
data() {
  return {
    selectedType: '',
    backgroundTypes: ['color', 'image', 'gradient'],
    selectedGradient: '',
    gradients: ['linear', 'radial'],
    mainGroup: [
      { label: '纯色', action: () => {this.selectedType = 'color';this.onTypeChange()} ,          color: '#ff0000',
},
      { label: '图片', action: () => {this.selectedType = 'image';this.onTypeChange()} ,          color: '#ff0000',
},
      { label: '附件图片', action: () => {this.selectedType = 'image';this.onTypeChange()} ,          color: '#ff0000',
},
      { label: '渐变', action: () => {this.selectedType = 'gradient';this.onTypeChange()} ,          color: '#ff0000',
},
    ]
  }
},
    methods: {
      onTypeChange() {
        this.$emit('type-change', this.selectedType);
      },
      onGradientChange() {
        this.$emit('gradient-change', this.selectedGradient);
      }
    },
    watch: {
      selectedType(newType) {
        if (newType !== 'gradient') {
          this.selectedGradient = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  select {
    margin: 0.5em 0;
    padding: 0.5em;
  }
  </style>