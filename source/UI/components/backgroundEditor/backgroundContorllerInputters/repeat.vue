<template>
       <select :value="modelValue" @input="updateValue">
        <option value="repeat repeat">Repeat Both</option>
        <option value="repeat no-repeat">Repeat X</option>
        <option value="no-repeat repeat">Repeat Y</option>
        <option value="no-repeat no-repeat">No Repeat</option>
        <option value="repeat space">Repeat X / Space Y</option>
        <option value="space repeat">Space X / Repeat Y</option>
        <option value="space space">Space Both</option>
        <option value="repeat round">Repeat X / Round Y</option>
        <option value="round repeat">Round X / Repeat Y</option>
        <option value="round round">Round Both</option>
        <option value="space round">Space X / Round Y</option>
        <option value="round space">Round X / Space Y</option>
        <option value="no-repeat space">No Repeat X / Space Y</option>
        <option value="space no-repeat">Space X / No Repeat Y</option>
        <option value="no-repeat round">No Repeat X / Round Y</option>
        <option value="round no-repeat">Round X / No Repeat Y</option>
    </select>

</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

// Define the props
const props = defineProps({
  modelValue: String
});

// Define the emits
const emit = defineEmits(['update:modelValue']);

// Method to update the value
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>