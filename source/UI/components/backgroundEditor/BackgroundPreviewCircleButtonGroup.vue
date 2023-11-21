<template>
  <div>
    <circle-button-container :mainGroup="mainGroup" :buttons="buttons" />
  </div>
</template>

<script>
import CircleButtonContainer from '../common/circle-button-container.vue';
export default {
  components: {
    CircleButtonContainer
  },
  props: ['background', 'index', 'backgrounds'],
  computed: {
    mainGroup() {
      return [
        {
          label: 'Up',
          action: this.moveUp,
          disabled: this.index === 0
        },
        {
          label: 'Down',
          action: this.moveDown,
          disabled: this.index === this.backgrounds.length - 1
        }
      ];
    },
    buttons() {
      return []; // Other buttons around the circle
    }
  },
  methods: {
    moveUp() {
      this.$emit('move-up', this.index);
    },
    moveDown() {
      this.$emit('move-down', this.index);
    }
  }
}
</script>