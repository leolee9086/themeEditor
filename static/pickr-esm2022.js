/* esm.sh - esbuild bundle(@simonwep/pickr@1.8.2) es2022 production */
var _t=Object.create;var X=Object.defineProperty;var wt=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var Ct=Object.getPrototypeOf,$t=Object.prototype.hasOwnProperty;var kt=(b,f)=>()=>(f||b((f={exports:{}}).exports,f),f.exports),St=(b,f)=>{for(var g in f)X(b,g,{get:f[g],enumerable:!0})},I=(b,f,g,O)=>{if(f&&typeof f=="object"||typeof f=="function")for(let v of At(f))!$t.call(b,v)&&v!==g&&X(b,v,{get:()=>f[v],enumerable:!(O=wt(f,v))||O.enumerable});return b},S=(b,f,g)=>(I(b,f,"default"),g&&I(g,f,"default")),et=(b,f,g)=>(g=b!=null?_t(Ct(b)):{},I(f||!b||!b.__esModule?X(g,"default",{value:b,enumerable:!0}):g,b));var K=kt((F,G)=>{(function(b,f){typeof F=="object"&&typeof G=="object"?G.exports=f():typeof define=="function"&&define.amd?define([],f):typeof F=="object"?F.Pickr=f():b.Pickr=f()})(self,function(){return(()=>{"use strict";var b={d:(l,t)=>{for(var e in t)b.o(t,e)&&!b.o(l,e)&&Object.defineProperty(l,e,{enumerable:!0,get:t[e]})},o:(l,t)=>Object.prototype.hasOwnProperty.call(l,t),r:l=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(l,"__esModule",{value:!0})}},f={};b.d(f,{default:()=>w});var g={};function O(l,t,e,n,s={}){t instanceof HTMLCollection||t instanceof NodeList?t=Array.from(t):Array.isArray(t)||(t=[t]),Array.isArray(e)||(e=[e]);for(let o of t)for(let i of e)o[l](i,n,{capture:!1,...s});return Array.prototype.slice.call(arguments,1)}b.r(g),b.d(g,{adjustableInputNumbers:()=>Z,createElementFromString:()=>N,createFromTemplate:()=>W,eventPath:()=>Y,off:()=>A,on:()=>v,resolveElement:()=>q});let v=O.bind(null,"addEventListener"),A=O.bind(null,"removeEventListener");function N(l){let t=document.createElement("div");return t.innerHTML=l.trim(),t.firstElementChild}function W(l){let t=(n,s)=>{let o=n.getAttribute(s);return n.removeAttribute(s),o},e=(n,s={})=>{let o=t(n,":obj"),i=t(n,":ref"),r=o?s[o]={}:s;i&&(s[i]=n);for(let c of Array.from(n.children)){let a=t(c,":arr"),p=e(c,a?{}:r);a&&(r[a]||(r[a]=[])).push(Object.keys(p).length?p:c)}return s};return e(N(l))}function Y(l){let t=l.path||l.composedPath&&l.composedPath();if(t)return t;let e=l.target.parentElement;for(t=[l.target,e];e=e.parentElement;)t.push(e);return t.push(document,window),t}function q(l){return l instanceof Element?l:typeof l=="string"?l.split(/>>/g).reduce((t,e,n,s)=>(t=t.querySelector(e),n<s.length-1?t.shadowRoot:t),document):null}function Z(l,t=e=>e){function e(n){let s=[.001,.01,.1][Number(n.shiftKey||2*n.ctrlKey)]*(n.deltaY<0?1:-1),o=0,i=l.selectionStart;l.value=l.value.replace(/[\d.]+/g,(r,c)=>c<=i&&c+r.length>=i?(i=c,t(Number(r),s,o)):(o++,r)),l.focus(),l.setSelectionRange(i,i),n.preventDefault(),l.dispatchEvent(new Event("input"))}v(l,"focus",()=>v(window,"wheel",e,{passive:!1})),v(l,"blur",()=>A(window,"wheel",e))}let{min:E,max:nt,floor:it,round:st}=Math;function T(l,t,e){t/=100,e/=100;let n=it(l=l/360*6),s=l-n,o=e*(1-t),i=e*(1-s*t),r=e*(1-(1-s)*t),c=n%6;return[255*[e,i,o,o,r,e][c],255*[r,e,e,i,o,o][c],255*[o,o,r,e,e,i][c]]}function rt(l,t,e){let n=(2-(t/=100))*(e/=100)/2;return n!==0&&(t=n===1?0:n<.5?t*e/(2*n):t*e/(2-2*n)),[l,100*t,100*n]}function M(l,t,e){let n=E(l/=255,t/=255,e/=255),s=nt(l,t,e),o=s-n,i,r;if(o===0)i=r=0;else{r=o/s;let c=((s-l)/6+o/2)/o,a=((s-t)/6+o/2)/o,p=((s-e)/6+o/2)/o;l===s?i=p-a:t===s?i=1/3+c-p:e===s&&(i=2/3+a-c),i<0?i+=1:i>1&&(i-=1)}return[360*i,100*r,100*s]}function at(l,t,e,n){return t/=100,e/=100,[...M(255*(1-E(1,(l/=100)*(1-(n/=100))+n)),255*(1-E(1,t*(1-n)+n)),255*(1-E(1,e*(1-n)+n)))]}function lt(l,t,e){t/=100;let n=2*(t*=(e/=100)<.5?e:1-e)/(e+t)*100,s=100*(e+t);return[l,isNaN(n)?0:n,s]}function ct(l){return M(...l.match(/.{2}/g).map(t=>parseInt(t,16)))}function pt(l){l=l.match(/^[a-zA-Z]+$/)?function(s){if(s.toLowerCase()==="black")return"#000";let o=document.createElement("canvas").getContext("2d");return o.fillStyle=s,o.fillStyle==="#000"?null:o.fillStyle}(l):l;let t={cmyk:/^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,rgba:/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsla:/^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsva:/^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},e=s=>s.map(o=>/^(|\d+)\.\d+|\d+$/.test(o)?Number(o):void 0),n;t:for(let s in t){if(!(n=t[s].exec(l)))continue;let o=i=>!!n[2]==(typeof i=="number");switch(s){case"cmyk":{let[,i,r,c,a]=e(n);if(i>100||r>100||c>100||a>100)break t;return{values:at(i,r,c,a),type:s}}case"rgba":{let[,,,i,r,c,a]=e(n);if(i>255||r>255||c>255||a<0||a>1||!o(a))break t;return{values:[...M(i,r,c),a],a,type:s}}case"hexa":{let[,i]=n;i.length!==4&&i.length!==3||(i=i.split("").map(a=>a+a).join(""));let r=i.substring(0,6),c=i.substring(6);return c=c?parseInt(c,16)/255:void 0,{values:[...ct(r),c],a:c,type:s}}case"hsla":{let[,,,i,r,c,a]=e(n);if(i>360||r>100||c>100||a<0||a>1||!o(a))break t;return{values:[...lt(i,r,c),a],a,type:s}}case"hsva":{let[,,,i,r,c,a]=e(n);if(i>360||r>100||c>100||a<0||a>1||!o(a))break t;return{values:[i,r,c,a],a,type:s}}}}return{values:null,type:null}}function L(l=0,t=0,e=0,n=1){let s=(i,r)=>(c=-1)=>r(~c?i.map(a=>Number(a.toFixed(c))):i),o={h:l,s:t,v:e,a:n,toHSVA(){let i=[o.h,o.s,o.v,o.a];return i.toString=s(i,r=>`hsva(${r[0]}, ${r[1]}%, ${r[2]}%, ${o.a})`),i},toHSLA(){let i=[...rt(o.h,o.s,o.v),o.a];return i.toString=s(i,r=>`hsla(${r[0]}, ${r[1]}%, ${r[2]}%, ${o.a})`),i},toRGBA(){let i=[...T(o.h,o.s,o.v),o.a];return i.toString=s(i,r=>`rgba(${r[0]}, ${r[1]}, ${r[2]}, ${o.a})`),i},toCMYK(){let i=function(r,c,a){let p=T(r,c,a),u=p[0]/255,m=p[1]/255,h=p[2]/255,d=E(1-u,1-m,1-h);return[100*(d===1?0:(1-u-d)/(1-d)),100*(d===1?0:(1-m-d)/(1-d)),100*(d===1?0:(1-h-d)/(1-d)),100*d]}(o.h,o.s,o.v);return i.toString=s(i,r=>`cmyk(${r[0]}%, ${r[1]}%, ${r[2]}%, ${r[3]}%)`),i},toHEXA(){let i=function(c,a,p){return T(c,a,p).map(u=>st(u).toString(16).padStart(2,"0"))}(o.h,o.s,o.v),r=o.a>=1?"":Number((255*o.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return r&&i.push(r),i.toString=()=>`#${i.join("").toUpperCase()}`,i},clone:()=>L(o.h,o.s,o.v,o.a)};return o}let j=l=>Math.max(Math.min(l,1),0);function U(l){let t={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},l),_keyboard(o){let{options:i}=t,{type:r,key:c}=o;if(document.activeElement===i.wrapper){let{lock:a}=t.options,p=c==="ArrowUp",u=c==="ArrowRight",m=c==="ArrowDown",h=c==="ArrowLeft";if(r==="keydown"&&(p||u||m||h)){let d=0,y=0;a==="v"?d=p||u?1:-1:a==="h"?d=p||u?-1:1:(y=p?-1:m?1:0,d=h?-1:u?1:0),t.update(j(t.cache.x+.01*d),j(t.cache.y+.01*y)),o.preventDefault()}else c.startsWith("Arrow")&&(t.options.onstop(),o.preventDefault())}},_tapstart(o){v(document,["mouseup","touchend","touchcancel"],t._tapstop),v(document,["mousemove","touchmove"],t._tapmove),o.cancelable&&o.preventDefault(),t._tapmove(o)},_tapmove(o){let{options:i,cache:r}=t,{lock:c,element:a,wrapper:p}=i,u=p.getBoundingClientRect(),m=0,h=0;if(o){let C=o&&o.touches&&o.touches[0];m=o?(C||o).clientX:0,h=o?(C||o).clientY:0,m<u.left?m=u.left:m>u.left+u.width&&(m=u.left+u.width),h<u.top?h=u.top:h>u.top+u.height&&(h=u.top+u.height),m-=u.left,h-=u.top}else r&&(m=r.x*u.width,h=r.y*u.height);c!=="h"&&(a.style.left=`calc(${m/u.width*100}% - ${a.offsetWidth/2}px)`),c!=="v"&&(a.style.top=`calc(${h/u.height*100}% - ${a.offsetHeight/2}px)`),t.cache={x:m/u.width,y:h/u.height};let d=j(m/u.width),y=j(h/u.height);switch(c){case"v":return i.onchange(d);case"h":return i.onchange(y);default:return i.onchange(d,y)}},_tapstop(){t.options.onstop(),A(document,["mouseup","touchend","touchcancel"],t._tapstop),A(document,["mousemove","touchmove"],t._tapmove)},trigger(){t._tapmove()},update(o=0,i=0){let{left:r,top:c,width:a,height:p}=t.options.wrapper.getBoundingClientRect();t.options.lock==="h"&&(i=o),t._tapmove({clientX:r+a*o,clientY:c+p*i})},destroy(){let{options:o,_tapstart:i,_keyboard:r}=t;A(document,["keydown","keyup"],r),A([o.wrapper,o.element],"mousedown",i),A([o.wrapper,o.element],"touchstart",i,{passive:!1})}},{options:e,_tapstart:n,_keyboard:s}=t;return v([e.wrapper,e.element],"mousedown",n),v([e.wrapper,e.element],"touchstart",n,{passive:!1}),v(document,["keydown","keyup"],s),t}function ut(l={}){l=Object.assign({onchange:()=>0,className:"",elements:[]},l);let t=v(l.elements,"click",e=>{l.elements.forEach(n=>n.classList[e.target===n?"add":"remove"](l.className)),l.onchange(e),e.stopPropagation()});return{destroy:()=>A(...t)}}let ht={variantFlipOrder:{start:"sme",middle:"mse",end:"ems"},positionFlipOrder:{top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},position:"bottom",margin:8},dt=(l,t,e)=>{let{container:n,margin:s,position:o,variantFlipOrder:i,positionFlipOrder:r}={container:document.documentElement.getBoundingClientRect(),...ht,...e},{left:c,top:a}=t.style;t.style.left="0",t.style.top="0";let p=l.getBoundingClientRect(),u=t.getBoundingClientRect(),m={t:p.top-u.height-s,b:p.bottom+s,r:p.right+s,l:p.left-u.width-s},h={vs:p.left,vm:p.left+p.width/2+-u.width/2,ve:p.left+p.width-u.width,hs:p.top,hm:p.bottom-p.height/2-u.height/2,he:p.bottom-u.height},[d,y="middle"]=o.split("-"),C=r[d],P=i[y],{top:$,left:D,bottom:B,right:x}=n;for(let H of C){let R=H==="t"||H==="b",V=m[H],[J,Q]=R?["top","left"]:["left","top"],[mt,ft]=R?[u.height,u.width]:[u.width,u.height],[vt,bt]=R?[B,x]:[x,B],[yt,gt]=R?[$,D]:[D,$];if(!(V<yt||V+mt>vt))for(let tt of P){let z=h[(R?"v":"h")+tt];if(!(z<gt||z+ft>bt))return t.style[Q]=z-u[Q]+"px",t.style[J]=V-u[J]+"px",H+tt}}return t.style.left=c,t.style.top=a,null};function _(l,t,e){return t in l?Object.defineProperty(l,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):l[t]=e,l}class w{constructor(t){_(this,"_initializingActive",!0),_(this,"_recalc",!0),_(this,"_nanopop",null),_(this,"_root",null),_(this,"_color",L()),_(this,"_lastColor",L()),_(this,"_swatchColors",[]),_(this,"_setupAnimationFrame",null),_(this,"_eventListener",{init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]}),this.options=t=Object.assign({...w.DEFAULT_OPTIONS},t);let{swatches:e,components:n,theme:s,sliders:o,lockOpacity:i,padding:r}=t;["nano","monolith"].includes(s)&&!o&&(t.sliders="h"),n.interaction||(n.interaction={});let{preview:c,opacity:a,hue:p,palette:u}=n;n.opacity=!i&&a,n.palette=u||c||a||p,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),e&&e.length&&e.forEach(y=>this.addSwatch(y));let{button:m,app:h}=this._root;this._nanopop=((y,C,P)=>{let $=typeof y!="object"||y instanceof HTMLElement?{reference:y,popper:C,...P}:y;return{update(D=$){let{reference:B,popper:x}=Object.assign($,D);if(!x||!B)throw new Error("Popper- or reference-element missing.");return dt(B,x,$)}}})(m,h,{margin:r}),m.setAttribute("role","button"),m.setAttribute("aria-label",this._t("btn:toggle"));let d=this;this._setupAnimationFrame=requestAnimationFrame(function y(){if(!h.offsetWidth)return requestAnimationFrame(y);d.setColor(t.default),d._rePositioningPicker(),t.defaultRepresentation&&(d._representation=t.defaultRepresentation,d.setColorRepresentation(d._representation)),t.showAlways&&d.show(),d._initializingActive=!1,d._emit("init")})}_preBuild(){let{options:t}=this;for(let e of["el","container"])t[e]=q(t[e]);this._root=(e=>{let{components:n,useAsButton:s,inline:o,appClass:i,theme:r,lockOpacity:c}=e.options,a=h=>h?"":'style="display:none" hidden',p=h=>e._t(h),u=W(`
      <div :ref="root" class="pickr">

        ${s?"":'<button type="button" :ref="button" class="pcr-button"></button>'}

        <div :ref="app" class="pcr-app ${i||""}" data-theme="${r}" ${o?'style="position: unset"':""} aria-label="${p("ui:dialog")}" role="window">
          <div class="pcr-selection" ${a(n.palette)}>
            <div :obj="preview" class="pcr-color-preview" ${a(n.preview)}>
              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${p("btn:last-color")}"></button>
              <div :ref="currentColor" class="pcr-current-color"></div>
            </div>

            <div :obj="palette" class="pcr-color-palette">
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${p("aria:palette")}" role="listbox"></div>
            </div>

            <div :obj="hue" class="pcr-color-chooser" ${a(n.hue)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${p("aria:hue")}" role="slider"></div>
            </div>

            <div :obj="opacity" class="pcr-color-opacity" ${a(n.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${p("aria:opacity")}" role="slider"></div>
            </div>
          </div>

          <div class="pcr-swatches ${n.palette?"":"pcr-last"}" :ref="swatches"></div>

          <div :obj="interaction" class="pcr-interaction" ${a(Object.keys(n.interaction).length)}>
            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${a(n.interaction.input)} aria-label="${p("aria:input")}">

            <input :arr="options" class="pcr-type" data-type="HEXA" value="${c?"HEX":"HEXA"}" type="button" ${a(n.interaction.hex)}>
            <input :arr="options" class="pcr-type" data-type="RGBA" value="${c?"RGB":"RGBA"}" type="button" ${a(n.interaction.rgba)}>
            <input :arr="options" class="pcr-type" data-type="HSLA" value="${c?"HSL":"HSLA"}" type="button" ${a(n.interaction.hsla)}>
            <input :arr="options" class="pcr-type" data-type="HSVA" value="${c?"HSV":"HSVA"}" type="button" ${a(n.interaction.hsva)}>
            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${a(n.interaction.cmyk)}>

            <input :ref="save" class="pcr-save" value="${p("btn:save")}" type="button" ${a(n.interaction.save)} aria-label="${p("aria:btn:save")}">
            <input :ref="cancel" class="pcr-cancel" value="${p("btn:cancel")}" type="button" ${a(n.interaction.cancel)} aria-label="${p("aria:btn:cancel")}">
            <input :ref="clear" class="pcr-clear" value="${p("btn:clear")}" type="button" ${a(n.interaction.clear)} aria-label="${p("aria:btn:clear")}">
          </div>
        </div>
      </div>
    `),m=u.interaction;return m.options.find(h=>!h.hidden&&!h.classList.add("active")),m.type=()=>m.options.find(h=>h.classList.contains("active")),u})(this),t.useAsButton&&(this._root.button=t.el),t.container.appendChild(this._root.root)}_finalBuild(){let t=this.options,e=this._root;if(t.container.removeChild(e.root),t.inline){let n=t.el.parentElement;t.el.nextSibling?n.insertBefore(e.app,t.el.nextSibling):n.appendChild(e.app)}else t.container.appendChild(e.app);t.useAsButton?t.inline&&t.el.remove():t.el.parentNode.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),this.hide()}_buildComponents(){let t=this,e=this.options.components,n=(t.options.sliders||"v").repeat(2),[s,o]=n.match(/^[vh]+$/g)?n:[],i=()=>this._color||(this._color=this._lastColor.clone()),r={palette:U({element:t._root.palette.picker,wrapper:t._root.palette.palette,onstop:()=>t._emit("changestop","slider",t),onchange(c,a){if(!e.palette)return;let p=i(),{_root:u,options:m}=t,{lastColor:h,currentColor:d}=u.preview;t._recalc&&(p.s=100*c,p.v=100-100*a,p.v<0&&(p.v=0),t._updateOutput("slider"));let y=p.toRGBA().toString(0);this.element.style.background=y,this.wrapper.style.background=`
                        linear-gradient(to top, rgba(0, 0, 0, ${p.a}), transparent),
                        linear-gradient(to left, hsla(${p.h}, 100%, 50%, ${p.a}), rgba(255, 255, 255, ${p.a}))
                    `,m.comparison?m.useAsButton||t._lastColor||h.style.setProperty("--pcr-color",y):(u.button.style.setProperty("--pcr-color",y),u.button.classList.remove("clear"));let C=p.toHEXA().toString();for(let{el:P,color:$}of t._swatchColors)P.classList[C===$.toHEXA().toString()?"add":"remove"]("pcr-active");d.style.setProperty("--pcr-color",y)}}),hue:U({lock:o==="v"?"h":"v",element:t._root.hue.picker,wrapper:t._root.hue.slider,onstop:()=>t._emit("changestop","slider",t),onchange(c){if(!e.hue||!e.palette)return;let a=i();t._recalc&&(a.h=360*c),this.element.style.backgroundColor=`hsl(${a.h}, 100%, 50%)`,r.palette.trigger()}}),opacity:U({lock:s==="v"?"h":"v",element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onstop:()=>t._emit("changestop","slider",t),onchange(c){if(!e.opacity||!e.palette)return;let a=i();t._recalc&&(a.a=Math.round(100*c)/100),this.element.style.background=`rgba(0, 0, 0, ${a.a})`,r.palette.trigger()}}),selectable:ut({elements:t._root.interaction.options,className:"active",onchange(c){t._representation=c.target.getAttribute("data-type").toUpperCase(),t._recalc&&t._updateOutput("swatch")}})};this._components=r}_bindEvents(){let{_root:t,options:e}=this,n=[v(t.interaction.clear,"click",()=>this._clearColor()),v([t.interaction.cancel,t.preview.lastColor],"click",()=>{this.setHSVA(...(this._lastColor||this._color).toHSVA(),!0),this._emit("cancel")}),v(t.interaction.save,"click",()=>{!this.applyColor()&&!e.showAlways&&this.hide()}),v(t.interaction.result,["keyup","input"],s=>{this.setColor(s.target.value,!0)&&!this._initializingActive&&(this._emit("change",this._color,"input",this),this._emit("changestop","input",this)),s.stopImmediatePropagation()}),v(t.interaction.result,["focus","blur"],s=>{this._recalc=s.type==="blur",this._recalc&&this._updateOutput(null)}),v([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],()=>this._recalc=!0,{passive:!0})];if(!e.showAlways){let s=e.closeWithKey;n.push(v(t.button,"click",()=>this.isOpen()?this.hide():this.show()),v(document,"keyup",o=>this.isOpen()&&(o.key===s||o.code===s)&&this.hide()),v(document,["touchstart","mousedown"],o=>{this.isOpen()&&!Y(o).some(i=>i===t.app||i===t.button)&&this.hide()},{capture:!0}))}if(e.adjustableNumbers){let s={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};Z(t.interaction.result,(o,i,r)=>{let c=s[this.getColorRepresentation().toLowerCase()];if(c){let a=c[r],p=o+(a>=100?1e3*i:i);return p<=0?0:Number((p<a?p:a).toPrecision(3))}return o})}if(e.autoReposition&&!e.inline){let s=null,o=this;n.push(v(window,["scroll","resize"],()=>{o.isOpen()&&(e.closeOnScroll&&o.hide(),s===null?(s=setTimeout(()=>s=null,100),requestAnimationFrame(function i(){o._rePositioningPicker(),s!==null&&requestAnimationFrame(i)})):(clearTimeout(s),s=setTimeout(()=>s=null,100)))},{capture:!0}))}this._eventBindings=n}_rePositioningPicker(){let{options:t}=this;if(!t.inline&&!this._nanopop.update({container:document.body.getBoundingClientRect(),position:t.position})){let e=this._root.app,n=e.getBoundingClientRect();e.style.top=(window.innerHeight-n.height)/2+"px",e.style.left=(window.innerWidth-n.width)/2+"px"}}_updateOutput(t){let{_root:e,_color:n,options:s}=this;if(e.interaction.type()){let o=`to${e.interaction.type().getAttribute("data-type")}`;e.interaction.result.value=typeof n[o]=="function"?n[o]().toString(s.outputPrecision):""}!this._initializingActive&&this._recalc&&this._emit("change",n,t,this)}_clearColor(t=!1){let{_root:e,options:n}=this;n.useAsButton||e.button.style.setProperty("--pcr-color","rgba(0, 0, 0, 0.15)"),e.button.classList.add("clear"),n.showAlways||this.hide(),this._lastColor=null,this._initializingActive||t||(this._emit("save",null),this._emit("clear"))}_parseLocalColor(t){let{values:e,type:n,a:s}=pt(t),{lockOpacity:o}=this.options,i=s!==void 0&&s!==1;return e&&e.length===3&&(e[3]=void 0),{values:!e||o&&i?null:e,type:n}}_t(t){return this.options.i18n[t]||w.I18N_DEFAULTS[t]}_emit(t,...e){this._eventListener[t].forEach(n=>n(...e,this))}on(t,e){return this._eventListener[t].push(e),this}off(t,e){let n=this._eventListener[t]||[],s=n.indexOf(e);return~s&&n.splice(s,1),this}addSwatch(t){let{values:e}=this._parseLocalColor(t);if(e){let{_swatchColors:n,_root:s}=this,o=L(...e),i=N(`<button type="button" style="--pcr-color: ${o.toRGBA().toString(0)}" aria-label="${this._t("btn:swatch")}"/>`);return s.swatches.appendChild(i),n.push({el:i,color:o}),this._eventBindings.push(v(i,"click",()=>{this.setHSVA(...o.toHSVA(),!0),this._emit("swatchselect",o),this._emit("change",o,"swatch",this)})),!0}return!1}removeSwatch(t){let e=this._swatchColors[t];if(e){let{el:n}=e;return this._root.swatches.removeChild(n),this._swatchColors.splice(t,1),!0}return!1}applyColor(t=!1){let{preview:e,button:n}=this._root,s=this._color.toRGBA().toString(0);return e.lastColor.style.setProperty("--pcr-color",s),this.options.useAsButton||n.style.setProperty("--pcr-color",s),n.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this._emit("save",this._color),this}destroy(){cancelAnimationFrame(this._setupAnimationFrame),this._eventBindings.forEach(t=>A(...t)),Object.keys(this._components).forEach(t=>this._components[t].destroy())}destroyAndRemove(){this.destroy();let{root:t,app:e}=this._root;t.parentElement&&t.parentElement.removeChild(t),e.parentElement.removeChild(e),Object.keys(this).forEach(n=>this[n]=null)}hide(){return!!this.isOpen()&&(this._root.app.classList.remove("visible"),this._emit("hide"),!0)}show(){return!this.options.disabled&&!this.isOpen()&&(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this._color),this)}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(t=360,e=0,n=0,s=1,o=!1){let i=this._recalc;if(this._recalc=!1,t<0||t>360||e<0||e>100||n<0||n>100||s<0||s>1)return!1;this._color=L(t,e,n,s);let{hue:r,opacity:c,palette:a}=this._components;return r.update(t/360),c.update(s),a.update(e/100,1-n/100),o||this.applyColor(),i&&this._updateOutput(),this._recalc=i,!0}setColor(t,e=!1){if(t===null)return this._clearColor(e),!0;let{values:n,type:s}=this._parseLocalColor(t);if(n){let o=s.toUpperCase(),{options:i}=this._root.interaction,r=i.find(c=>c.getAttribute("data-type")===o);if(r&&!r.hidden)for(let c of i)c.classList[c===r?"add":"remove"]("active");return!!this.setHSVA(...n,e)&&this.setColorRepresentation(o)}return!1}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find(e=>e.getAttribute("data-type").startsWith(t)&&!e.click())}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}return _(w,"utils",g),_(w,"version","1.8.2"),_(w,"I18N_DEFAULTS",{"ui:dialog":"color picker dialog","btn:toggle":"toggle color picker dialog","btn:swatch":"color swatch","btn:last-color":"use previous color","btn:save":"Save","btn:cancel":"Cancel","btn:clear":"Clear","aria:btn:save":"save and close","aria:btn:cancel":"cancel and close","aria:btn:clear":"clear and close","aria:input":"color input field","aria:palette":"color selection area","aria:hue":"hue selection slider","aria:opacity":"selection slider"}),_(w,"DEFAULT_OPTIONS",{appClass:null,theme:"classic",useAsButton:!1,padding:8,disabled:!1,comparison:!0,closeOnScroll:!1,outputPrecision:0,lockOpacity:!1,autoReposition:!0,container:"body",components:{interaction:{}},i18n:{},swatches:null,inline:!1,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:!0,showAlways:!1,closeWithKey:"Escape"}),_(w,"create",l=>new w(l)),f=f.default})()})});var k={};St(k,{default:()=>Lt});var Ot=et(K());S(k,et(K()));var{default:ot,...Et}=Ot,Lt=ot!==void 0?ot:Et;export{Lt as default};
/*! Bundled license information:

@simonwep/pickr/dist/pickr.min.js:
  (*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr *)
*/
//# sourceMappingURL=pickr.js.map