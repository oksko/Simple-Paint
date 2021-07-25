export default class Drawer {
    static onSizeChange() {
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");
        let inpWidth = document.getElementById('width');
        let inpHeight = document.getElementById('height');
        let temp = context.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = inpWidth.value;
        canvas.height = inpHeight.value;
        context.putImageData(temp, 0, 0);
    }

    static onClear() {
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    static onStart() {
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");
        global.paint = true;
        context.beginPath();
    }

    static onStop() {
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");
        global.paint = false;
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        global.historyArray.push(image);
        global.step = global.historyArray.length - 1;
    }

    static onDraw(e) {
        if (!global.paint) {
            return;
        }
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");

        if (e.which === 1) {
            context.strokeStyle = document.getElementById('selectedColor').value;
        } else if (e.which === 3) {
            context.strokeStyle = "#eeeeef";
        }
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        context.lineWidth = document.querySelector('input[type="range"]').value;
        context.lineCap = "round";
        context.lineTo(x, y);
        context.stroke();

        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        global.reproduceArray.push(image);
    }

    static onUndo() {
        if (global.step > 0) {
            let canvas = document.querySelector("canvas");
            let context = canvas.getContext("2d");
            global.step--;
            context.putImageData(global.historyArray[step], 0, 0);
        } else {
            Drawer.onClear();
        }
    }

    static onRedo() {
        if (global.step < global.historyArray.length) {
            let canvas = document.querySelector("canvas");
            let context = canvas.getContext("2d");
            context.putImageData(global.historyArray[global.step], 0, 0);
            if (global.step != global.historyArray.length - 1) {
                global.step++;
            }
        }
    }

    static onReproduce() {
        let interval = setInterval(() => {
            let canvas = document.querySelector("canvas");
            let context = canvas.getContext("2d");
            context.putImageData(global.reproduceArray[global.repStep], 0, 0);
            global.repStep++;
            if (global.reproduceArray.length - 1 <= global.repStep) {
                clearInterval(interval);
                global.repStep = 0;
            }
        }, 10);
    }
}