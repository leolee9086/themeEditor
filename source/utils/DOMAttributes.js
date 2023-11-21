
export function batchSetAttribute(element, attributes) {
    Object.getOwnPropertyNames(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }
  