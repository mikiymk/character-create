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
  let element = document.createElement("canvas");
  element.setAttribute("height", 500);
  element.setAttribute("width", 500);
  return element;
}
