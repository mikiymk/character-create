const rootid = "div";

/*
 * do this first
 */
function main() {
    alert("javascript start");
    try {
        let div = document.getElementById(rootid);
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
    element.setAttribute("height", 500);
    element.setAttribute("width", 500);
    return element;
}

main();
