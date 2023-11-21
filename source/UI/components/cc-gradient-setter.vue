<template>
    <div id="root" ref="root" style="position:relative" @mouseover="聚焦 = true">
        <div class="preview" ref="preview" @mouseup="添加节点值($event)" @mousemove="编辑节点值($event)" @mouseover="聚焦 = true"
            @mouseleave="聚焦 = false">
            <div v-for="(i, percent) in 颜色值序列 " v-on:mousedown="暂时删除节点(percent)" :percent="percent" :style="
                `width:6px;
                                left:${位置序列[percent]};`" class="node-back-ground">
            </div>
            <ccKnob v-if="编辑角度" :size="100" v-model="渐变角度" @mouseover="聚焦 = true"
            :style="`position:relative;left:${宽度 - 30}px`">
            </ccKnob>
        </div>
    </div>
    <div class="gradient-start-point" v-if="聚焦" :style="gradientStartPointStyle()"></div>
    <div class="gradient-start-point" v-if="聚焦" :style="gradientEndPointStyle()"></div>
    <div class="gradient-start-point" v-if="聚焦" :style="计算映射点样式()"></div>
    <div class="gradient-line" v-if="聚焦" ref="gradientLine" :style="gradientLineStyle()">
        <div :style="
            `height:28px;
                        width:0.5px;
                        position:absolute;
                        left:${位置序列[percent]};
                        top:-14px;
                        border:solid 1px`" v-for="(i, percent) in 颜色值序列 " :ref="percent" :class="percent">
            <div :style="`width:10px;
                                height:10px;
                                position:absolute;
                                background-color:${颜色值序列[percent]};
                                top:9px;
                                left:-5.5px;
                                border:solid 1px;
                                border-radius:100%
                                `">
            </div>
        </div>
        <div v-if="正在编辑" :style="`height:100%;
                        width:1px;
                        position:absolute;
                        left:${临时位置};
                        top:0;
                        border:solid 1px`" ref="tempnode" class="tempnode" @mouseup="固定临时位置()">
            <div :style="`width:10px;
                                    height:10px;
                                    position:absolute;
                                    background-color:${临时颜色};
                                    top:37px;
                                    left:-5.5px;
                                    border:solid 1px;
                                    border-radius:100%
                                `">
            </div>
        </div>
    </div>
</template>
<script>
import ccKnob from "./cc-knob.vue"
import {计算元素渐变线,计算事件在线上的最近点} from "../utils/gradientProcessor.js"
import {isColorDark} from "../utils/colorProcessor.js"
export default {
    name: "cc-gradient-setter",
    props: ["value", "宽度", "自定义颜色数组"],
    model: { event: "change", prop: "value" },
    components: { ccKnob },
    mounted() {
        this.isMounted = true
        this.$refs.preview.style.backgroundImage = "linear-gradient(" + this.渐变角度 + "deg" + this.渐变定义 + ")"
        this.$refs.preview.style.width = `${this.宽度 - 50}px`
    },
    data() {
        return {
            渐变角度: 90,
            颜色值序列: {},
            当前百分比: 0,
            显示颜色面板: false,
            isMounted: false,
            改变节点位置: false,
            临时百分比: "",
            临时颜色: "",
            临时位置: "",
            正在编辑: false,
            聚焦: false,
            编辑角度: true,
            当前映射点坐标: {}
        }
    },
    computed: {
        渐变定义() {
            if (!this.isMounted) {
                return "";
            }
            let 颜色渐变字符串 = "";
            let 线条渐变字符串 = "";
            let arry = [];
            for (let 节点 in this.颜色值序列) {
                arry.push({ "index": parseFloat(节点.replace("%", "")), "value": 节点 });
            }
            if (this.临时百分比) {
                arry.push({ "index": parseFloat(this.临时百分比.replace("%", "")), "value": this.临时百分比 });
            }
            arry.sort((x, y) => x.index - y.index);
            arry.forEach((el, index) => {
                let color = this.颜色值序列[el["value"]] || this.临时颜色;
                let lineColor = isColorDark(color) ? 'white' : 'black'; // 判断颜色是否深色
                颜色渐变字符串 += `, ${color} ${el["value"]}`;
                let currentPercent = parseFloat(el["value"]);
                let lineStart = currentPercent - 0.1;
                let lineEnd = currentPercent + 0.1;

                线条渐变字符串 += `, transparent ${lineStart}%, ${lineColor} ${currentPercent}%, transparent ${lineEnd}%`;

            });
            let 角度字符串 = this.渐变角度 + "deg";
            颜色渐变字符串 = "linear-gradient(" + 角度字符串 + 颜色渐变字符串 + ")";
            线条渐变字符串 = "linear-gradient(" + 角度字符串 + 线条渐变字符串 + ")";
            return 线条渐变字符串 + ", " + 颜色渐变字符串;
        },
        位置序列() {
            if (!this.isMounted) {
                return { "0%": 0, "100%": 600 }
            }
            let obj = {}
            for (let 百分比 in this.颜色值序列) {
                let el = this.$refs.gradientLine
                obj[百分比] = el.offsetWidth * parseFloat(百分比) / 100 - 1.5 + "px"
            }
            return obj
        },

    },
    watch: {
        临时百分比(val) {
            if (this.临时百分比) {
                let el = this.$refs.gradientLine
                this.临时位置 = el.offsetWidth * parseFloat(val) / 100 - 1.5 + "px"
            }
        },
        渐变定义: {
            handler(val) {
                this.$refs.preview.style.backgroundImage = val
                this.应用(val)
            }
        }
    },
    methods: {
        计算映射点(event) {
            let gradientLine = this.计算渐变线();
            return 计算事件在线上的最近点(event,gradientLine)
        },
        计算映射点样式() {
            return {
                left: `${this.当前映射点坐标.x}px`,
                top: `${this.当前映射点坐标.y}px`,
            };
        },
        gradientLineStyle() {
            let gradientLine = this.计算渐变线();
            return {
                left: `${gradientLine.center.x}px`,
                top: `${gradientLine.center.y}px`,
                width: `${gradientLine.length}px`,
                transform: `translate(-50%, -50%) rotate(${this.渐变角度 + 270}deg)`
            };
        },
        gradientStartPointStyle() {
            let gradientLine = this.计算渐变线();
            return {
                left: `${gradientLine.start.x}px`,
                top: `${gradientLine.start.y}px`,
                transform: 'translate(-50%, -50%)'
            };
        },
        gradientEndPointStyle() {
            let gradientLine = this.计算渐变线();
            return {
                left: `${gradientLine.end.x}px`,
                top: `${gradientLine.end.y}px`,
                transform: 'translate(-50%, -50%)'
            };
        },
        固定临时位置() {
            this.颜色值序列[this.临时百分比] = this.临时颜色
            this.颜色值序列 = JSON.parse(JSON.stringify(this.颜色值序列))
            this.临时颜色 = ""
            this.临时百分比 = ""
            this.临时位置 = ""
            this.正在编辑 = false
        },
        应用: async function (val) {
            this.$emit("change", val)
        },
        暂时删除节点(percent) {
            if (percent == this.临时百分比) { return }
            this.临时百分比 = percent
            this.临时颜色 = this.颜色值序列[percent] + ""
            delete (this.颜色值序列[percent])
            this.正在编辑 = true
            this.颜色值序列 = JSON.parse(JSON.stringify(this.颜色值序列))
        },
        编辑节点值(event) {
            this.当前映射点坐标.x = this.计算映射点(event).x
            this.当前映射点坐标.y = this.计算映射点(event).y
            if (!this.临时颜色) { return }
            this.临时百分比 = Math.round(event.offsetX / event.target.offsetWidth * 10000) / 100 + "%"
        },
        删除节点(percent) {
            delete (this.颜色值序列[percent])
            this.颜色值序列 = JSON.parse(JSON.stringify(this.颜色值序列))
        },
        添加节点值(event) {
            if (event.target.getAttribute("class") == "node-back-ground") { return }
            //this.当前百分比 =( Math.round(event.offsetX / event.target.offsetWidth * 10000)-100 )/ 100
            this.当前百分比 = Math.round(this.计算映射点(event).percentage)
            if (!this.颜色值序列[this.当前百分比 + "%"]) {
                //  this.$set(this.颜色值序列,this.当前百分比+"%","red")
                this.颜色值序列[this.当前百分比 + "%"] = '#' + Math.floor(Math.random() * 16777215).toString(16); if (this.临时颜色) {
                    this.颜色值序列[this.当前百分比 + "%"] = this.临时颜色 + ""
                    this.临时颜色 = ""
                }
            }
            this.颜色值序列 = JSON.parse(JSON.stringify(this.颜色值序列))
        },
        计算渐变线() {
            if (!this.isMounted) {
                return {
                    length: 0,
                    center: { x: 0, y: 0 },
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                };

            }
            return 计算元素渐变线(this.$refs.preview,this.渐变角度)
        }
    }
}
</script>
<style scoped>
#root {
    background-color: var(--b3-theme-background)
}

.node-back-ground {
    position: absolute;
    top: 0;
    z-index: 999;
}

.node-back-ground:hover {
    background-color: rgba(211, 214, 29);
    z-index: 999;
}

.preview,
.root {
    width: 100%;
    height: 200px;
    border: solid 1px;
    border-radius: 5px
}

.gradient-start-point,
.gradient-end-point {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    position: fixed;
}

.gradient-line {
    position: fixed;
    height: 2px;
    /* 调整这个值来改变线的粗细 */
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
    /* 这是一个示例的渐变，你可以根据需要修改 */
}
</style>