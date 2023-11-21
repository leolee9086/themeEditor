<template>
        <button class="editor-button" v-on:click="fontSize = (Number(fontSize) || 0) - 1; handleChange()">
            <strong>A</strong>
            <sup>-</sup>
        </button>
        <button class="editor-button" v-on:click="fontSize = (Number(fontSize) || 0) + 1; handleChange()">
            <strong>A</strong>
            <sub>+</sub>
        </button>
        <select 
        class="b3-select fn__block size50" 
        v-model="fontSize" 
        @change="handleChange"
        >
            <option value=12>12px</option>
            <option value=13>13px</option>
            <option value=14>14px</option>
            <option value=15>15px</option>
            <option value=16>16px</option>
            <option value=19>19px</option>
            <option value=22>22px</option>
            <option value=24>24px</option>
            <option value=29>29px</option>
            <option value=32>32px</option>
            <option value=40>40px</option>
            <option value=48>48px</option>
        </select>
</template>

<script>
import eventBus from "eventBus"
export default {
    props: ["targets"],
    data() {
        return {
            fontSize: 15
        }
    },
    methods: {
        handleChange() {
            eventBus.emit('css-props-change', { fontSize: this.fontSize + 'px' })
        }
    }
}
</script>
<style scoped>
    button{
        width:26px;
        height:26px
    }
</style>
