import { plugin, clientApi } from "../asyncModules.js";
import { batchSetAttribute } from "../utils/DOMAttributes.js";

export class FormItem {
    constructor(Item, container, cb, destroyCb) {
      this.cb = cb;
      this.destroyCb = destroyCb ? destroyCb : () => {};
      this.container = container;
      this.element = document.createElement("label");
      this.element.setAttribute("class", "fn__flex b3-label");
      this.element.innerHTML = `
          <div class="fn__flex-1">
          <span class="b3-label__name">${Item.name}</span>
          <div class="b3-label__text">${Item.label}</div>
      </div>
      <span class="fn__space"></span>
          `;
      this.inputter = new FormIpputer(Item, this);
      this.element.appendChild(this.inputter.element);
      container.appendChild(this.element);
    }
    destroy() {
      if (this.pickrs) {
        this.pickrs.forEach((pickr) => {
          pickr.destroy();
          pickr = undefined;
        });
        this.pickrs = undefined;
        this.destroyCb();
      }
    }
  }
  
  /*UI元素*/
export  class FormIpputer {
    constructor(options, formItem) {
      this.options = options;
      this.formItem = formItem;
      this.element = this.buildElement(options);
    }
    buildElement(options) {
      let element = document.createElement("input");
      switch (options.type) {
        case "boolean":
          batchSetAttribute(element, {
            class: "b3-switch fn__flex-center",
            type: "checkbox",
            value: options.value || options.default,
          });
          element.addEventListener("change", () => {
            options.value = element.checked;
            this.formItem.cb.bind(this.formItem)(options);
          });
          break;
        case "string":
          element = document.createElement("textarea");
          element.value = options.value || options.default || "";
          batchSetAttribute(element, {
            class: "b3-text-field fn__flex-center fn__size200",
            value: options.value || options.default || "",
          });
          element.addEventListener("change", () => {
            options.value = element.value;
            this.formItem.cb.bind(this.formItem)(options);
          });
          break;
        case "number":
          element = document.createElement("span");
          batchSetAttribute(element, {
            class: "b3-tooltips b3-tooltips__w",
            "aria-label": options.value || options.default || 0,
          });
          element.innerHTML = "<input></input>";
          batchSetAttribute(element.querySelector("input"), {
            class: "b3-slider ",
            value: options.value || options.default || 0,
            style: "box-sizing: border-box",
            type: "range",
          });
          element.querySelector("input").max= options.max || 100,
          element.querySelector("input").min= options.min || 1,
          element.querySelector("input").step=options.step||1,
  
          element.querySelector("input").addEventListener("mousemove", () => {
            element.setAttribute(
              "aria-label",
              element.querySelector("input").value+ (options.unit || "px")
            );
            options.value =
            element.querySelector("input").value + (options.unit || "px");
  
            this.formItem.cb.bind(this.formItem)(options);
          });
          element.querySelector("input").addEventListener("change", () => {
            options.value =
              element.querySelector("input").value + (options.unit || "px");
            this.formItem.cb.bind(this.formItem)(options);
          });
          break;
        case "select":
          let isFont = options.subtype == "fonts";
  
          element = document.createElement("select");
          if (options.options) {
            options.options.forEach((item, index) => {
              element.innerHTML += `
                <option 
                value="${item.value || item}"
                ${isFont ? `style="font-family:${item.value || item || ""}"` : ""}
                >${item.label || item.value || item}</option>
                `;
            });
          }
          batchSetAttribute(element, {
            class: "b3-select fn__flex-center fn__size200",
          });
          if (options.multiple) {
            let values = [];
            element.innerHTML += `
            <option value="" style='display:none' class='realValue'></option>
            `;
            let realValueOption = element.querySelector(".realValue");
            element.addEventListener("input", (e) => {
              element
                .querySelectorAll(`[value="${element.value}"]`)
                .forEach((option) => {
                  if (values.includes(option.value)) {
                    values.splice(values.indexOf(option.value), 1);
                    option.style.backgroundColor = "";
                  } else {
                    values.push(option.value);
                    option.style.backgroundColor =
                      "var(--b3-card-info-background)";
                    option.style.color = "var(--b3-card-info-color)";
                  }
                  realValueOption.value = values.join(",");
                  realValueOption.text = realValueOption.value;
                  element.options[element.options.length - 1].selected = true;
                  element.value = realValueOption.value;
                  options.value = element.value;
                  this.formItem.cb.bind(this.formItem)(options);
                });
            });
          } else {
            element.addEventListener("change", () => {
              options.value = element.value;
              this.formItem.cb.bind(this.formItem)(options);
            });
          }
          break;
        case "color":
          element = document.createElement("div");
          this.formItem.container.appendChild(this.formItem.element);
          this.formItem.element.appendChild(element);
          let themeEditorColorPlate = document.getElementById(
            "themeEditorColorPlate"
          );
          if (!themeEditorColorPlate) {
            themeEditorColorPlate = document.createElement("div");
            themeEditorColorPlate.setAttribute("id", "themeEditorColorPlate");
            document.body.appendChild(themeEditorColorPlate);
          }
          let pickr = new plugin.Pickr({
            container: themeEditorColorPlate,
            el: element,
            theme: "classic",
            default: options.value || options.default || "blue",
            comparison: false,
            components: {
              preview: true,
              opacity: true,
              hue: true,
              interaction: {
                input: true,
              },
            },
          });
          if (!this.formItem.pickrs) {
            this.formItem.pickrs = [];
          }
          this.formItem.pickrs.push(pickr);
  
          pickr.on("change", async (color, source, instance) => {
            options.value = color.toRGBA().toString();
            element.value = options.value;
            const event = new Event("change", {
              bubbles: true,
              cancelable: false,
            });
  
            element.dispatchEvent(event);
            this.formItem.cb.bind(this.formItem)(options);
          });
  
          break;
        default:
          if (options.render) {
            element = options.render(options, this.formItem);
            element.addEventListener("change", () => {
              options.value = element.value;
              this.formItem.cb.bind(this.formItem)(options);
            });
          } else {
            element = document.createElement("textarea");
            element.value = options.value || options.default || "";
            batchSetAttribute(element, {
              class: "b3-text-field fn__flex-center fn__size200",
              value: options.value || options.default || "",
            });
            element.addEventListener("change", () => {
              options.value = element.value;
              this.formItem.cb.bind(this.formItem)(options);
            });
          }
      }
      if (element.tagName == "TEXTAREA") {
        batchSetAttribute(this.formItem.element, {
          class: "fn__flex-column b3-label",
          style: "min-height:0 !important",
        });
        batchSetAttribute(element, {
          style: "max-width:100% !important;width:100%;min-width:100%",
        });
  
        this.formItem.element.innerHTML += '<div class="fn__hr"></div>';
      }
      if (!options.subtype == "@import") {
        element.addEventListener("change", () => {
          try {
            let name = options.name;
            if (options.as) {
              //console.log(options.as);
              name = options.as;
            }
            CSSStyleValue.parse(name, element.value);
            this.formItem.element.style.backgroundColor = "";
            this.formItem.element
              .querySelectorAll(".item-error-container")
              .forEach((el) => {
                el.remove();
              });
          } catch (e) {
            this.formItem.element.style.backgroundColor =
              "var(--b3-card-error-background)";
            if (!this.formItem.element.querySelector(".item-error-container")) {
              this.formItem.element
                .querySelector(".b3-label__text")
                .insertAdjacentHTML(
                  "beforeend",
                  `<div class="item-error-container">${e}</div>`
                );
            } else {
              this.formItem.element.querySelector(
                ".item-error-container"
              ).innerText = e;
            }
          }
        });
      }
  
      return element;
    }
  }
  