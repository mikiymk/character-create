/*
 * do this first
 */
function main() {
 let div = document.getElementById("div");
 let canvasElement = createCanvasElement();
 div.appendChild(canvas);
 alert("javascript done");
}
/*
 * create new "canvas" element in document
 * @returns canvas
 */
function createCanvasElement() {
 let element = document.createElement("canvas");
 return element;
}
