"use strict";

/**
 * do this first
 */
export function main(root) {
  let canvas = createCanvasElement();
  let controller = createControllerElement();

  root.appendChild(canvas);
  root.appendChild(controller);

  let context = canvas.getContext("2d");
  drawingAll(context);
}

/**
 * Canvas要素を作ります
 */
function createCanvasElement() {
  return h("canvas", { height: 500, width: 500 });
}

const bodyObject = {
  face: {
    pos: { x: observable(50), y: observable(50) },
    eyes: {
      left: { x: 10, y: 0 },
      right: { x: -10, y: 0 },
    },
  },
};

/**
 * コントローラー要素を作ります
 */
function createControllerElement() {
  return h("div", {}, [
    t("コントローラー"),
    createNumberControlElement("顔の位置 縦", bodyObject.face.pos.x),
    createNumberControlElement("顔の位置 横", bodyObject.face.pos.y),
  ]);
}

/**
 * 数字のコントローラー要素を作ります
 */
function createNumberControlElement(name, obs) {
  return h("div", {}, [
    h("h3", {}, [t(name)]),
    h("input", {
      type: "range",
      value: obs.value(),
      oninput: (event) => obs.update(event.target.value),
    }),
    t(obs),
  ]);
}

/**
 * 全体を描画します
 * @param {CanvasRenderingContext2D} context
 */
function drawingAll(context) {
  context.clearRect(0, 0, 500, 500);
  drawingFace(context);

  requestAnimationFrame(() => drawingAll(context));
}

/**
 * 顔を描画します
 * @param {CanvasRenderingContext2D} context
 */
function drawingFace(context) {
  let x = bodyObject.face.pos.x.value();
  let y = bodyObject.face.pos.y.value();

  // 輪郭
  drawingRound(context, x, y, 25, 25, "#fff");

  // 右目
  drawingRound(context, x - 10, y, 5, 10, "#000");

  // 左目
  drawingRound(context, x + 10, y, 5, 10, "#000");
}

/**
 * 楕円を描画します
 * @param {CanvasRenderingContext2D} context
 */
function drawingRound(context, x, y, rx, ry, color) {
  context.beginPath();
  context.fillStyle = color;
  context.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  context.fill();
}

function debug(data) {
  console.log(data);
  alert(data);
}

/**
 * 観察可能オブジェクトを作成します
 * @template T
 * @param {T} initial
 * @returns {{
 *   value: () => T;
 *   update: (newValue: T) => void;
 *   subscribe: (fn: (value: T) => void) => void;
 *   unsubscribe: (fn: (value: T) => void) => void;
 * }}
 */
function observable(initial) {
  let value = initial;
  let subscribers = new Set();

  return {
    type: "observable",
    value: () => value,
    update: (newValue) => {
      value = newValue;
      for (let subscriber of subscribers) {
        subscriber(value);
      }
    },
    subscribe: (fn) => void subscribers.add(fn),
    unsubscribe: (fn) => void subscribers.delete(fn),
  };
}

/**
 * タグ名、属性、子要素でタグ要素を作ります。
 * @param {string} tag
 */
function h(tag, attrs, children) {
  let element = document.createElement(tag);

  for (let attr in attrs || {}) {
    if (attr.startsWith("on")) {
      element.addEventListener(attr.slice(2).toLowerCase(), attrs[attr]);
    } else {
      element.setAttribute(attr, attrs[attr]);
    }
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
  if (text.type === "observable") {
    let element = document.createTextNode(text.value());
    let onchange = (value) => void (element.data = value);
    text.subscribe(onchange);
    return element;
  } else {
    return document.createTextNode(text);
  }
}
