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
  drawingFace(context);
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
      left: { x: 10, y: 0, },
      right: { x: -10, y: 0, },
    },
  },
};

/**
 * コントローラー要素を作ります
 */
function createControllerElement() {
  return h("div", {}, [
    t("コントローラー"),
    h("div", {}, [
      h("h2", {}, [t("顔の位置")]),
      h("div", {}, [
        h("h3", {}, [t("縦")]),
        h("input", {
          type: "range",
          value: face.pos.x.value(),
          onchange: (event) => {
            face.pos.x.update(event.target.value);
          },
        }),
        t(face.pos.x),
      ]),
      h("div", {}, [
        h("h3", {}, [t("横")]),
        h("input", {
          type: "range",
          onchange: (event) => {
            debug("change 横");
            bodyObject.face.x = event.target.value;
          },
        }),
      ]),
    ]),
  ]);
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
  let subscribers = new Set;

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
