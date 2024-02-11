<template>
  <div class="fn__flex">
    <BackgroundPreviewSmall :background="background" :index="index" :backgrounds="backgrounds" @move-up="moveUp"
      @move-down="moveDown">
      <template v-slot:custom-content>
        <CircleButtonGroup :size="200" :mainGroup="mainGroup" :buttons="mainGroup" :innerRadius=0 :outerRadius=50 />
        <BackgroundTypeSelector :size="200" @type-change="onTypeChange" @gradient-change="onGradientChange" />
      </template>
    </BackgroundPreviewSmall>
    <div class="cc-toolbar__divider"></div>
    <BackGroundControlIterms 
    :background="background"
    @imagePathChange="($event)=>background.image =$event"
    ></BackGroundControlIterms>
    <div class="fn__flex fn__flex-column" v-if="selectedType === 'multi'">
      <input  type="text" v-model="background.background" placeholder="css">

    </div>
  </div>
</template>
  
<script>
import BackgroundTypeSelector from './BackgroundTypeSelector.vue';
import BackgroundPreviewSmall from './BackgroundPreviewSmall.vue'
import CircleButtonGroup from '../common/CircleButtonGroup.vue';
import BackGroundControlIterms from './BackGroundControlIterms.vue'
export default {
  components: {
    BackgroundTypeSelector, 
    BackgroundPreviewSmall, 
    CircleButtonGroup,
    BackGroundControlIterms
  },
  props: ['background', 'index', 'backgrounds'],
  data() {
    return {
      selectedType: '',
      selectedGradient: ''
    }
  },
  methods: {
    moveUp() {
      this.$emit('move-up', this.index);
    },
    moveDown() {
      this.$emit('move-down', this.index);
    },
    onTypeChange(type) {
      console.log(type)
      this.selectedType = type;
    },
    onGradientChange(gradient) {
      this.selectedGradient = gradient;
    }
  },
  computed: {
    mainGroup() {
      return [
      
        {
          label: '下',
          action: () => this.$emit('move-down', this.index),
          disabled: this.index === 0,
          color: '#ff0000',

        },
        {
          label: '-',
          action: () => this.$emit('delete', this.index),
          color: '#ff0000',

        },    
         {
          label: '+',
          action: () => this.$emit('add', this.index),
          color: '#ff0000',

        },
        {
          label: '上',
          action: () => this.$emit('move-up', this.index),
          disabled: this.index === this.backgrounds.length - 1,
          color: '#ff0000',

        },
      ];
    }
  }

}
</script>