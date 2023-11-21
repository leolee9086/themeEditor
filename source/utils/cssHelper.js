function getUnit(value) {
    if (value === 0) return "";
    const units = [
        "px",
        "rem",
        "em",
        "vw",
        "vh",
        "%",
        "cm",
        "mm",
        "in",
        "pt",
        "pc",
        "ex",
        "ch",
    ];
    for (let i = 0; i < units.length; i++) {
        if (String(value).endsWith(units[i])) {
            return units[i];
        }
    }
    return "";
}
export function isColor(value) {
    let namedColors = new Set([
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkgrey",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkslategrey",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dimgrey",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
    ]);
    if (
        value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ||
        value.match(
            /^rgb\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)$/
        ) ||
        value.match(
            /^rgba\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*([01]{1}|[0-9]{1,2}\.[0-9]{1,2}|100)\s*\)$/
        ) ||
        value.match(
            /^hsl\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*\)$/
        ) ||
        value.match(
            /^hsla\s*\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*,\s*([01]{1}|[0-9]{1,2}\.[0-9]{1,2}|100)\s*\)$/
        ) ||
        namedColors.has(value.toLowerCase())
    ) {
        return "color";
    } else if (value.startsWith("#")) {
        try {
            CSSStyleValue.parse("color", value);
            return "color";
        } catch (e) { }
    }
}
export function testselector(selector) {
  if (selector === ":root") {
    return;
  }
  let tempstyle = window.document.createElement("style");
  tempstyle.innerHTML =
    selector + "{border:dashed 2px blue;background-color:yellow}";
  tempstyle.setAttribute("id", "tempstyle");
  document.head.appendChild(tempstyle);
  setTimeout(() => {
    tempstyle.remove();
  }, 1000);
}
