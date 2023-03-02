/*
 * do this first
 */
export function main(root) {
  let canvas = createCanvasElement();
  root.appendChild(canvas);
}

/*
 * create new "canvas" element in document
 * @returns canvas
 */
function createCanvasElement() {
  return h("canvas", { height: 500, width: 500 });
}

/*
 * タグ名、属性、子要素でタグ要素を作ります。
 * @param tag {string} タグ名
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

/*
 * テキスト要素を作ります。
 */
function t(text) {
  return document.createTextNode(text);
}