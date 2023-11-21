<template>
    <div class="styEditorButton b3-tooltips b3-tooltips__e" aria-label="字距">
        字距
        <input class="b3-text-field fn__flex-center fn__size3em" type="number" v-model="letterSpacing" @change="handleChange">
    </div>
</template>

<script>
import eventBus from "eventBus"
export default {
    props:["targets"],
    data() {
        return {
            letterSpacing: 0
        }
    },
    methods: {
        handleChange() {
            eventBus.emit("css-props-change",{letterSpacing:this.letterSpacing + 'px'})
           
        }
    }
}
</script>

<style>
.fn__size10{
    max-width:60px
}
</style>