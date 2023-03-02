/**
 * do this first
 */
export function main(root) {
  let canvas = createCanvasElement();
  let controller = createControllerElement();

  root.appendChild(canvas);
  root.appendChild(controller);

  let context = canvas.getContext("2d");
  drawingFace(context);
}

/**
 * Canvas要素を作ります
 */
function createCanvasElement() {
  return h("canvas", { height: 500, width: 500 });
}

/**
 * コントローラー要素を作ります
 */
function createControllerElement() {
  return h("div", {}, [t("コントローラー")]);
}

/**
 * 顔を描画します
 * @param {CanvasRenderingContext2D} context
 */
function drawingFace(context) {
  // 輪郭
  context.beginPath();
  context.fillStyle = "#fff";
  context.moveTo(50, 50);
  context.arc(75, 50, 25, 0, 2 * Math.PI);
  context.fill();

  // 右目
  context.beginPath();
  context.fillStyle = "#000";
  context.moveTo(50, 50);
  context.ellipse(65, 50, 5, 10, 0, 0, 2 * Math.PI);
  context.fill();

  // 左目
  context.beginPath();
  context.fillStyle = "#000";
  context.moveTo(50, 50);
  context.ellipse(85, 50, 5, 10, 0, 0, 2 * Math.PI);
  context.fill();
}

function debug(data) {
  console.log(data);
  alert(data);
}

/**
 * タグ名、属性、子要素でタグ要素を作ります。
 */
function h(tag, attrs, children) {
  let element = document.createElement(tag);

  for (let attr in attrs || {}) {
    element.setAttribute(attr, attrs[attr]);
  }

  for (let child of children || []) {
    element.appendChild(child);
  }

  return element;
}

/**
 * テキスト要素を作ります。
 */
function t(text) {
  return document.createTextNode(text);
}