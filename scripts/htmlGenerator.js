import Drawer from "./drawer";
export function GenerateHtml() {
    let body = document.body;

    let tools = document.createElement("div");
    tools.classList.add("tools");

    let lineColor = document.createElement("input");
    lineColor.id = "selectedColor";
    lineColor.type = "color";
    lineColor.classList.add("line-color");

    let lineWidth = document.createElement("input");
    lineWidth.type = "range";
    lineWidth.min = 1;
    lineWidth.max = 50;
    lineWidth.value = 20;

    let clearButton = document.createElement("button");
    clearButton.id = "clear";
    clearButton.innerText = "Clear";

    let undoButton = document.createElement("button");
    undoButton.id = "undo";
    undoButton.innerText = "Undo";

    let redoButton = document.createElement("button");
    redoButton.id = "redo";
    redoButton.innerText = "Redo";

    let reproduceButton = document.createElement("button");
    reproduceButton.id = "reproduce";
    reproduceButton.innerText = "Reproduce";

    let heightLabel = document.createElement("label");
    heightLabel.innerText = "Height:"
    let heightInput = document.createElement("input");
    heightInput.type = "number";
    heightInput.min = 10;
    heightInput.max = 1000;
    heightInput.id = "height";
    heightInput.value = 800;

    let widthLabel = document.createElement("label");
    widthLabel.innerText = "Width:"
    let widthInput = document.createElement("input");
    widthInput.type = "number";
    widthInput.min = 10;
    widthInput.max = 1000;
    widthInput.id = "width";
    widthInput.value = 800;

    let canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;

    canvas.addEventListener("mouseup", Drawer.onStop);
    canvas.addEventListener("contextmenu", event => event.preventDefault());
    canvas.addEventListener("mousemove", Drawer.onDraw);
    canvas.addEventListener("mousedown", Drawer.onStart);
    clearButton.addEventListener("click", Drawer.onClear);
    heightInput.addEventListener("change", Drawer.onSizeChange);
    widthInput.addEventListener("change", Drawer.onSizeChange);
    undoButton.addEventListener("click", Drawer.onUndo);
    redoButton.addEventListener("click", Drawer.onRedo);
    reproduceButton.addEventListener("click", Drawer.onReproduce);

    tools.appendChild(lineColor);
    tools.appendChild(lineWidth);
    tools.appendChild(clearButton);
    tools.appendChild(undoButton);
    tools.appendChild(redoButton);
    tools.appendChild(reproduceButton);
    heightLabel.appendChild(heightInput);
    tools.appendChild(heightLabel);
    widthLabel.appendChild(widthInput);
    tools.appendChild(widthLabel);
    body.appendChild(tools);
    body.appendChild(canvas);
}