<template>
  <div class="styEditorButton  fn__flex">
    <select class="b3-select fn__flex-center" id="font-weight" v-model="selectedWeight">
      <option v-for="weight in weights" :key="weight" :value="weight">
        {{ weight }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: 'normal'
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      selectedWeight: this.modelValue,
      weights: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
    }
  },
  watch: {
    selectedWeight(newWeight) {
      this.$emit('update:modelValue', newWeight);
      this.$emit('change', newWeight);
    },
    modelValue(newVal) {
      this.selectedWeight = newVal;
    }
  }
}
</script>