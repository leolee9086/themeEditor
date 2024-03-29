</template>
<input type="text" class="gradient-input" />
<div class="test-element"></div>

<svg class="gradient-overlay" width="100%" height="100%">
  <defs>
    <marker id="extending-line-end" markerWidth="50" markerHeight="1"
            orient="auto" markerUnits="userSpaceOnUse" refX="0" refY="0">
      <line class="support-line" x1="0" y1="0" x2="50" y2="0" />
    </marker>
    <marker id="extending-line-start" markerWidth="50" markerHeight="1"
            orient="auto" markerUnits="userSpaceOnUse" refX="50" refY="0">
      <line class="support-line" x1="0" y1="0" x2="50" y2="0" />
    </marker>
  </defs>
  <rect class="gradient-box" />
  <line class="gradient-line extend-line" />
  <line class="angle-0-line support-line" />
  <line class="start-edge support-line extend-line" />
  <line class="end-edge support-line extend-line" />
  <circle class="start-point gradient-line-point" r="2" />
  <circle class="center-point gradient-line-point" r="2" />
  <circle class="end-point gradient-line-point" r="2" />
  <path class="angle-arc" />
</svg>
<template>
<script setup>
import {ref} from "vue"
const SVG_NS = "http://www.w3.org/2000/svg";
const ANGLE_KEYWORDS = {
  "to top": () => 0,
  "to top right": ({width, height}) => {
    return Math.acos((width/2) / (Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2));
  },
  "to right": () => Math.PI/2,
  "to bottom right": bounds => Math.PI - ANGLE_KEYWORDS["to top right"](bounds),
  "to bottom": () => Math.PI,
  "to bottom left": bounds => Math.PI + ANGLE_KEYWORDS["to top right"](bounds),
  "to left": () => 3*Math.PI/2,
  "to top left": bounds => (2*Math.PI) - ANGLE_KEYWORDS["to top right"](bounds)
};
const ANGLE_REGEX = /^-?[0-9.]+deg$/;
const COLOR_REGEX = /^\([0-9., ]+\)/;
const ARC_RADIUS = 50;

let testElement = document.querySelector(".test-element");
let svg = document.querySelector(".gradient-overlay");
let box = document.querySelector(".gradient-box");
let line = document.querySelector(".gradient-line");
let angleArc = document.querySelector(".angle-arc");
let centerLine = document.querySelector(".angle-0-line");
let startEdge = document.querySelector(".start-edge");
let endEdge = document.querySelector(".end-edge");
let startPoint = document.querySelector(".start-point");
let centerPoint = document.querySelector(".center-point");
let endPoint = document.querySelector(".end-point");
let input = document.querySelector(".gradient-input");
input.value = document.styleSheets[0].cssRules[4]
              .style.getPropertyValue("background-image");

function deleteStops() {
  let stops = document.querySelectorAll(".color-stop, .color-stop-label");
  [].slice.apply(stops).forEach(stop => {
    stop.remove();
  });
}

function renderStop(color, position, angle, index) {
  let stop = document.createElementNS(SVG_NS, "circle");
  stop.classList.add("color-stop");
  stop.setAttribute("r", 4);
  stop.setAttribute("cx", position.x);
  stop.setAttribute("cy", position.y);
  svg.appendChild(stop);

  let label = document.createElement("div");
  label.classList.add("color-stop-label");
  label.style.background = color;
  label.style.top = position.y + "px";
  label.style.left = position.x + "px";
  document.body.appendChild(label);

  angle = angle * 180 / Math.PI;
  if (index % 2 === 0) {
    angle -= 90;
  } else {
    angle += 90;
  }
  label.style.webkitTransform = "translateX(-10px) translateY(10px) rotate(" + angle + "deg)";
  label.style.transform = "translateX(-10px) translateY(10px) rotate(" + angle + "deg)";
}

function getColorStopPosition(angle, gradientLine, percentagePosition) {
  let yDiff = Math.sin(angle-Math.PI/2) *
              (gradientLine.length * percentagePosition/100);
  let xDiff = Math.cos(angle-Math.PI/2) *
              (gradientLine.length * percentagePosition/100);
  return {
    x: gradientLine.start.x + xDiff,
    y: gradientLine.start.y + yDiff
  };
}

function renderGradientLine(quad, {angle, stops, gradientLine}) {
  deleteStops();

  // Display the gradient box
  box.setAttribute("x", quad.p1.x);
  box.setAttribute("y", quad.p1.y);
  box.setAttribute("width", quad.bounds.width);
  box.setAttribute("height", quad.bounds.height);

  // Display the gradient line
  line.setAttribute("x1", gradientLine.start.x);
  line.setAttribute("y1", gradientLine.start.y);
  line.setAttribute("x2", gradientLine.end.x);
  line.setAttribute("y2", gradientLine.end.y);

  // Display the start point
  startPoint.setAttribute("cx", gradientLine.start.x);
  startPoint.setAttribute("cy", gradientLine.start.y);

  // Display the center point
  centerPoint.setAttribute("cx", gradientLine.center.x);
  centerPoint.setAttribute("cy", gradientLine.center.y);

  // Display the end point
  endPoint.setAttribute("cx", gradientLine.end.x);
  endPoint.setAttribute("cy", gradientLine.end.y);

  // Display the center line
  centerLine.setAttribute("x1", gradientLine.center.x);
  centerLine.setAttribute("y1", gradientLine.center.y);
  centerLine.setAttribute("x2", gradientLine.center.x);
  centerLine.setAttribute("y2", gradientLine.center.y - ARC_RADIUS - 10);

  // Display the angle arc
  angle = angle % (Math.PI*2);
  if (angle < 0) {
    angle = (Math.PI*2) + angle;
  }

  let arcX = gradientLine.center.x + Math.cos(angle-Math.PI/2) * ARC_RADIUS;
  let arcY = gradientLine.center.y + Math.sin(angle-Math.PI/2) * ARC_RADIUS;
  let largeArc = angle > Math.PI ? 1 : 0;
  let path = ["M", gradientLine.center.x, ",", gradientLine.center.y, " ",
              "m", "0,-", ARC_RADIUS, " ",
              "A", ARC_RADIUS, ",", ARC_RADIUS, " 0 ", largeArc, " 1 ", arcX, ",", arcY];
  angleArc.setAttribute("d", path.join(""));

  // Display the two perpendicular lines
  let point1, point2;
  if (angle <= Math.PI/2) {
    point1 = quad.p4;
    point2 = quad.p2;
  } else if (angle <= Math.PI) {
    point1 = quad.p1;
    point2 = quad.p3;
  } else if (angle <= 3*Math.PI/2) {
    point1 = quad.p2;
    point2 = quad.p4;
  } else {
    point1 = quad.p3;
    point2 = quad.p1;
  }

  startEdge.setAttribute("x1", gradientLine.start.x);
  startEdge.setAttribute("y1", gradientLine.start.y);
  startEdge.setAttribute("x2", point1.x);
  startEdge.setAttribute("y2", point1.y);
  endEdge.setAttribute("x1", gradientLine.end.x);
  endEdge.setAttribute("y1", gradientLine.end.y);
  endEdge.setAttribute("x2", point2.x);
  endEdge.setAttribute("y2", point2.y);

  for (let i = 0; i < stops.length; i ++) {
    let {color, position} = stops[i];
    renderStop(color, getColorStopPosition(angle, gradientLine, position), angle, i);
  }
}

function parseGradientPart(part, gradientBoxBounds) {
  // All parts have a useless trailing character, either ) or ,
  part = part.trim();
  part = part.substring(0, part.length - 1);

  // Check if the part is an angle, a signed float with 'deg' suffix or any of
  // the accepted keywords.
  if (Object.keys(ANGLE_KEYWORDS).indexOf(part) !== -1){
    return {
      type: "angle",
      angle: ANGLE_KEYWORDS[part](gradientBoxBounds)
    };
  } else if (part.match(ANGLE_REGEX)) {
    return {
      type: "angle",
      angle: parseFloat(part) * Math.PI / 180
    };
  } else {
    // Otherwise, it's a color stop. Color stops may or may not have a position.
    // Positions may be in px or %. Colors are a list of 3 or 4 numbers between
    // parens, and are either rgb or rgba.
    let color = part.match(COLOR_REGEX)[0];
    let rgbPrefix = color.split(",").length === 3 ? "rgb" : "rgba";
    let position = part.substring(color.length).trim();

    return {
      type: "stop",
      position,
      color: rgbPrefix + color
    };
  }

  return part;
}

function getGradientLine(angle, gradientBoxBounds) {
  let gradientLineLength = Math.abs(gradientBoxBounds.width * Math.sin(angle)) +
                           Math.abs(gradientBoxBounds.height * Math.cos(angle));
  let center = {
    x: gradientBoxBounds.x + gradientBoxBounds.width/2,
    y: gradientBoxBounds.y + gradientBoxBounds.height/2
  };

  let yDiff = Math.sin(angle-Math.PI/2) * gradientLineLength/2;
  let xDiff = Math.cos(angle-Math.PI/2) * gradientLineLength/2;

  return {
    length: gradientLineLength,
    center: center,
    start: {
      x: center.x - xDiff,
      y: center.y - yDiff
    },
    end: {
      x: center.x + xDiff,
      y: center.y + yDiff
    }
  };
}

function resolvePosition(positionString, gradientLine) {
  positionString = positionString + "";
  let isPx = positionString.endsWith("px");
  let value = parseFloat(positionString);

  return isPx ? value * 100 / gradientLine.length : value;
}

function parseGradient(parsedBackgroundImage, gradientBoxBounds) {
  // The computed-style gives us some facility to parse the gradient, but not
  // much. Color stops that don't have a defined position still don't have a
  // position in the computed-style. Angle keywords aren't replaced with degrees.
  // Position units can be mixed (% and px). So we need to parse the angle and
  // stops ourselves.
  let gradient = parsedBackgroundImage.value;

  // TODO: use the tokens in parsedBackgroundImage to only care about the actual
  // value between ( and ), and then add a new tokenizer function that will
  // tokenize this value correctly (right now, it's failing with transparent)

  let index = gradient.indexOf("linear-gradient");
  if (index === -1) {
    return;
  }

  // Removing the linear-gradient( part. Remaining is the angle and color stops.
  gradient = gradient.substring(index + 16);

  // Computed colors are always rgb or rgba, and positions, if present, are
  // found after colors, so splitting by this will give us a nice array with
  // the angle first (if present) and stops.
  let parts = [];
  while (true) {
    let rgbIndex = gradient.indexOf("rgb(");
    let rgbaIndex = gradient.indexOf("rgba(");
    let transparentIndex = gradient.indexOf("transparent");
    if (rgbIndex === -1 && rgbaIndex === -1 && transparentIndex === -1) {
      parts.push(parseGradientPart(gradient, gradientBoxBounds));
      break;
    }

    let index = Math.min.apply(null,
      [rgbIndex, rgbaIndex, transparentIndex].filter(i => i >= 0));
    let colorLength = rgbIndex === index ? 3 : rgbaIndex === index ? 4 : 11;

    let part = gradient.substring(0, index);
    if (part.trim()) {
      parts.push(parseGradientPart(gradient.substring(0, index), gradientBoxBounds));
    }
    gradient = gradient.substring(index + (rgbIndex === index ? 3 : 4));
  }

  // An angle is not mandatory. If missing, defaults ot "to bottom".
  let angle = ANGLE_KEYWORDS["to bottom"]();
  if (parts[0].type === "angle") {
    angle = parts[0].angle;
    parts.splice(0, 1);
  }

  // Get the gradient line data.
  let gradientLine = getGradientLine(angle, gradientBoxBounds);

  // Post-process the color stops to calculate the missing positions.
  // When a position is missing, it's typically between the previous and next.
  // But there are edge cases. The gradient line extends infinitely in either
  // directions, and so if the first position is missing but the second is -50
  // then first is also -50.

  // Given a stop index, get the position of the next stop. If there is no next
  // stop, return either 100 (for 100%) or the provided last position if it is
  // more than 100.
  let nextPos = (i, lastPos) => {
    if (parts[i+1]) {
      // If there's a next stop, get its position, or go to the next one if it
      // doesn't have one.
      let pos = resolvePosition(parts[i+1].position, gradientLine);
      return pos ? {nextIndex: i+1, next: pos} : nextPos(i+1, lastPos);
    } else {
      // Otherwise, this is the last stop.
      return {nextIndex: i, next: Math.max(lastPos||0, 100)};
    }
  }

  // The last defined position we found.
  let lastPos;

  let stops = [];
  for (let i = 0; i < parts.length; i++) {
    let stop = parts[i];
    let position;

    // If a position is already defined, use this one, except if there was
    // previous, greater, position.
    if (stop.position !== "") {
      position = resolvePosition(stop.position, gradientLine);
      if (typeof lastPos !== "undefined" && lastPos >= position) {
        position = lastPos;
      }
    }

    // Otherwise, distribute the value according to the number of stops until
    // the next defined value.
    else {
      let {nextIndex, next} = nextPos(i, lastPos);

      // If this is the first stop and the next is greater than 0, then this is
      // 0.
      if (i === 0 && next > 0) {
        position = 0;
      }

      // If this is the first stop and the next is lower than 0, then clamp it
      // to the next value.
      if (i === 0 && next <= 0) {
        position = next;
      }

      // If this is the last stop and the previous is lower than 100, then this
      // is 100.
      else if (i === parts.length - 1 && lastPos < 100) {
        position = 100;
      }

      // If this is the last stop and the previous was greater than 100, then
      // clamp it to the previous value.
      else if (i === parts.length - 1 && lastPos >= 100) {
        position = lastPos;
      }

      else {
        if (typeof lastPos === "undefined") {
          position = Math.min(0, next);
        } else {
          position = lastPos + ((next - lastPos) / (nextIndex - i + 1));
        }
      }
    }

    stops.push({
      color: stop.color,
      position: position
    });

    lastPos = position;
  }

  return {angle, stops, gradientLine};
}

/**
 * Parses the value of a background-image CSS property.
 * Note that this only works with computed properties! Do not attempt to use with
 * authored styles as it doesn't handle malformed syntax at all (may fail
 * unexpectedly or create an infinite loop).
 * @param {String} backgroundImage The computed background-image value.
 * @return {Array} An array of background image objects: {type, value, tokens}
 */
function parseBackgroundImage(backgroundImage) {
  let images = [];
  let tokens = tokenizeBackgroundImage(backgroundImage);
  for (let i = 0; i < tokens.length; i += 5) {
    images.push({
      type: tokens[i].value,
      value: tokens[i].value + tokens[i+1].value + tokens[i+2].value + tokens[i+3].value,
      tokens: tokens.slice(i, i+4)
    });
  }
  return images;
}

/**
 * Tokenizes the value of a background-image CSS property.
 * Note that this only works with computed properties! Do not attempt to use with
 * authored styles as it doesn't handle malformed syntax at all (may fail
 * unexpectedly or create an infinite loop).
 * @param {String} backgroundImage The computed background-image value.
 * @return {Array} An array of tokens: {type, value, startIndex, endIndex}
 */
function tokenizeBackgroundImage(backgroundImage) {
  // A CSS <image> may be a <uri>, a <gradient>, or a part of the page, defined by
  // the element() function.
  // "linear-gradient(50deg, rgba(0, 0, 0, 0.6), transparent), repeating-linear-gradient(to right, transparent 0px, transparent 100px, rgb(0, 0, 0) 100px, rgb(0, 0, 0) 200px, transparent 200px), -moz-element(#angle-range), url("https://dl.dropboxusercontent.com/u/714210/grid.png")"

  let imageTypes = [
    "repeating-linear-gradient", "linear-gradient",
    "repeating-radial-gradient", "radial-gradient",
    "url", "-moz-element"
  ];

  // Expect one of the image types at startIndex, return the type and endIndex.
  let eatType = startIndex => {
    for (let type of imageTypes) {
      if (backgroundImage.substring(startIndex).startsWith(type)) {
        return {
          endIndex: startIndex + type.length,
          value: type
        };
      }
    }
  };

  // Expect an <image> value at startIndex, looks for the next ) character.
  let eatValue = startIndex => {
    let nbOpen = 0;
    let i = startIndex;
    while (true) {
      if (backgroundImage[i] === "(") {
        nbOpen ++;
      } else if (backgroundImage[i] === ")") {
        nbOpen --;
        if (nbOpen === -1) {
          return {
            endIndex: i,
            value: backgroundImage.substring(startIndex, i)
          }
        }
      }
      i ++;
    }
  };

  let tokens = [];
  let lastToken = null;
  let i = 0;

  while (i < backgroundImage.length) {
    let char = backgroundImage[i];

    if (!lastToken) {
      // Progress to end of function name.
      let {endIndex, value} = eatType(i);
      tokens.push({
        type: "function",
        value,
        startIndex: i,
        endIndex
      });
      i = endIndex;
      lastToken = "function";
    } else if (lastToken === "function" && char === "(") {
      // Just saw a function, eat the (.
      lastToken = "(";
      tokens.push({
        type: "(",
        value: "(",
        startIndex: i,
        endIndex: i+1
      });
      i ++;
    } else if (lastToken === "(") {
      // Just opened a ( after a function, progress to end of value.
      let {endIndex, value} = eatValue(i);
      tokens.push({
        type: "value",
        value,
        startIndex: i,
        endIndex
      });
      i = endIndex;
      lastToken = "value";
    } else if (lastToken === "value" && char === ")") {
      // Just saw a closing ). Eat it.
      lastToken = ")";
      tokens.push({
        type: ")",
        value: ")",
        startIndex: i,
        endIndex: i+1
      });
      i ++;
    } else if (lastToken === ")" && char === ",") {
      // Multiple background separator, go back to start.
      lastToken = null;
      tokens.push({
        type: ",",
        value: ",",
        startIndex: i,
        endIndex: i+1
      });
      i += 2;
    } else {
      i ++;
    }
  }

  return tokens;
}

function getBoxQuad(element) {
  let quad;
  if (element.getBoxQuads) {
    return element.getBoxQuads()[0];
  } else {
    return {
      p1: {
        x: element.offsetLeft,
        y: element.offsetTop
      },
      p2: {
        x: element.offsetLeft + element.offsetWidth,
        y: element.offsetTop
      },
      p3: {
        x: element.offsetLeft + element.offsetWidth,
        y: element.offsetTop + element.offsetHeight
      },
      p4: {
        x: element.offsetLeft,
        y: element.offsetTop + element.offsetHeight
      },
      bounds: {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
      }
    };
  }
}

function previewGradient(element, index) {
  let backgroundImages = getComputedStyle(element).backgroundImage;
  let parsedImages = parseBackgroundImage(backgroundImages);
  let gradient = parsedImages[index];

  let quad = getBoxQuad(element);

  renderGradientLine(quad, parseGradient(gradient, quad.bounds));
}

function isNumber(string) {
  return parseInt(string) + "" === string || string === "-" || string === ".";
}

function isCloseToNumber(string, index) {
  return (string[index - 1] && isNumber(string[index - 1])) ||
    (string[index] && isNumber(string[index]));
}

function getNumberRange(string, index) {
  if (isCloseToNumber(string, index)) {
    let start, end;
    index --;
    while (string[index]) {
      if (isNumber(string[index])) {
        index --;
      } else {
        start = index + 1;
        break;
      }
    }
    index ++;
    while (string[index]) {
      if (isNumber(string[index])) {
        index ++;
      } else {
        end = index;
        break;
      }
    }
    return {start: start, end: end};
  } else {
    return false;
  }
}

function increaseValue(input, isUp, isShift, isCtrl) {
  let selectionStartBefore = input.selectionStart;
  let nbRange = getNumberRange(input.value, selectionStartBefore);
  if (nbRange) {
    let delta = isUp === false ? -1 : 1;
    if (isShift) {
      delta *= 10;
    } else if (isCtrl) {
      delta /= 10;
    }
    let value = parseFloat(input.value.substring(nbRange.start, nbRange.end));
    value += delta;
    value = Math.round(value * 10) / 10;
    input.value = input.value.slice(0, nbRange.start) + value + input.value.slice(nbRange.end);
    setTimeout(function () {
      input.setSelectionRange(nbRange.start, nbRange.start);
    }, 0);
  }
}

input.addEventListener("keydown", e => {
  if (e.keyCode !== 38 && e.keyCode !== 40) {
    return;
  }

  increaseValue(input, e.keyCode === 38, e.shiftKey, e.ctrlKey);
  e.preventDefault();

  testElement.style.backgroundImage = input.value;
  previewGradient(testElement, 0);
});

input.addEventListener("keyup", e => {
  let value = input.value;
  testElement.style.backgroundImage = value;
  previewGradient(testElement, 0);
});

addEventListener("resize", e => {
  previewGradient(testElement, 0);
});

previewGradient(testElement, 0);

// TESTS

const TEST_DATA = [
  {input: [undefined, undefined],
   output: [0, 100]},
  {input: [undefined, undefined, undefined],
   output: [0, 50, 100]},
  {input: [undefined, undefined, undefined, undefined, undefined],
   output: [0, 25, 50, 75, 100]},
  {input: [-10, 100],
   output: [-10, 100]},
  {input: [-10, -20],
   output: [-10, -10]},
  {input: [110, 100],
   output: [110, 110]},
  {input: [50, undefined, 100],
   output: [50, 75, 100]},
  {input: [100, 50, 75, undefined],
   output: [100, 100, 100, 100]},
  {input: [undefined, undefined, undefined, -20],
   output: [-20, -20, -20, -20]},
  {input: [10, 20, 30, -20],
   output: [10, 20, 30, 30]},
  {input: [10, undefined, 20],
   output: [10, 15, 20]},
  {input: [75, 20, 30],
   output: [75, 75, 75]},
  {input: [75, 20, undefined],
   output: [75, 75, 100]},
  {input: [60, 20, undefined, undefined],
   output: [60, 60, 80, 100]},
];

for (let {input, output} of TEST_DATA) {
  let inputStr = "linear-gradient(rgb(0,0,0)";
  for (let i = 0; i < input.length; i ++) {
    let stop = input[i];
    if (stop) {
      inputStr += " " + stop + "%";
    }
    if (i < input.length - 1) {
      inputStr += ", rgb(0,0,0)";
    }
  }
  inputStr += ")";

  console.log("Testing " + inputStr);

  let {stops} = parseGradient({value: inputStr}, {
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });

  if (stops.length !== output.length) {
    console.error("Unexpected number of stops. Expected " + output.length + ". Got " + stops.length);
  }

  for (let i = 0; i < stops.length; i ++) {
    let stop = stops[i];
    let expected = output[i];
    if (stop.position !== expected) {
      console.error("Unexpected stop " + i + " position. Expected " + expected + ". Got " + stop.position);
    }
  }
}

</script>
<style scoped>
    html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient-input {
  position: absolute;
  top: 0;
  left: 5vw;
  width: 90vw;
  font-size: 1em;
  padding: .8em 0;
  color: #777;
  background: transparent;
  border-color: #eee;
  border-style: solid;
  border-width: 0 0 1px 0;
  text-align: center;
  transition: .2s all;
}

.gradient-input:hover,
.gradient-input:focus {
  background: #eee;
  color: rgb(222, 7, 159);
}

.test-element {
  width: 50vw;
  height: 50vh;
  background-image: linear-gradient(75deg, #3800fd -5%, #ff0092 40%, #ff6fb1 65%, #ff4740 90%);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  color: #555;
}

.gradient-box {
  stroke: currentColor;
  fill: none;
  shape-rendering: crispEdges;
}

.gradient-line {
  stroke-width: 2;
  stroke: currentColor;
}

.angle-arc {
  stroke-width: 1;
  stroke: currentColor;
  fill: transparent;
}

.support-line {
  stroke-width: 1;
  stroke: currentColor;
  stroke-dasharray: 3 2;
}

.extend-line {
  marker-start: url(#extending-line-start);
  marker-end: url(#extending-line-end);
}

.gradient-line-point,
.color-stop {
  fill: currentColor;
}

.color-stop-label {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid white;
  box-sizing: border-box;
  box-shadow: 0 1px 5px rgba(0,0,0,.3);
  pointer-events: auto;
  transform-origin: 10px -10px;
}

.color-stop-label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent white transparent;
  border-width: 0px 6px 6px;
  top: -6px;
  left: 2px;
}
</style>