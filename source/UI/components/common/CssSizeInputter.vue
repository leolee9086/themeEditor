<template>
  <div>
    <input type="number" class="b3-text-field fn__flex-center fn__size3em" v-model="numericValue" min="0">
    <select v-model="unit" class="b3-select fn__flex-center" :style="'width:100%;max-width:5em;'">
      <option value="px">px</option>
      <option value="%">%</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
      <option value="vw">vw</option>
      <option value="vh">vh</option>
      <option value="vmin">vmin</option>
      <option value="vmax">vmax</option>
      <option value="cm">cm</option>
      <option value="mm">mm</option>
      <option value="in">in</option>
      <option value="pt">pt</option>
      <option value="pc">pc</option>
      <option value="ex">ex</option>
      <option value="ch">ch</option>
      <option value="Q">Q</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['modelValue', 'defaultUnit', 'defaultValue'],
  computed: {
    numericValue: {
      get() {
        return parseFloat(this.modelValue) || this.defaultValue || 0;
      },
      set(value) {
        if (!isNaN(value) && value >= 0) {
          this.$emit('update:modelValue', `${value}${this.unit}`);
        }
      }
    },
    unit: {
      get() {
        return (this.modelValue && this.modelValue.replace(/[0-9.]/g, '')) || this.defaultUnit || 'px';
      },
      set(value) {
        this.$emit('update:modelValue', `${this.numericValue}${value}`);
      }
    }
  }
}
</script>