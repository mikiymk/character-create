/*
 * do this first
 */
function main() {
 alert("javascript start");
 try {
  let div = document.getElementById("div");
  let canvas = createCanvasElement();
  div.appendChild(canvas);
 } catch (error) {
  alert(error);
 }
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

main();
