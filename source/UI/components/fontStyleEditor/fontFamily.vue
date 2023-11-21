<template>
    <div style="width:100%;max-width:12em" class="styEditorButton b3-tooltips b3-tooltips__e fn__flex">
        <select
            class="b3-select fn__flex-center"
            v-model="fontFamily.value"
            :style="'width:100%;max-width:10em;'+genFontFamilyStyle(fontFamily.value)"
            ref='selector'
            @change="handleChange"
          >
            <option
              v-for="item in plugin.系统字体列表"
              :key="item"
              :label="item"
              :value="item"
              :style="'float:left;'+genFontFamilyStyle(item)"
            >
              <span >{{ item }}</span>
            </option>
          </select>
    </div>
</template>
<script setup>
    import eventBus from "eventBus"
    import {plugin} from "runtime"
    import {ref,reactive} from "vue"

    const selector = ref()
    const fontFamily=ref({value:""})
    
    const handleChange=()=>{
                selector.value.style.fontFamily=fontFamily.value
                eventBus.emit('css-props-change',{fontFamily:`"${fontFamily.value.value}"`}) 
    }
    const genFontFamilyStyle=(fontFamily)=>{
        return `font-family:"${fontFamily}"`
    }
 
</script>
<style>

</style>