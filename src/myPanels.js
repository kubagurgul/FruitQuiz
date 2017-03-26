import { elementIds, images, constants, MyImage } from './resources.js';
import { Decorators } from './utils.js';

export class ImagePanelModule {
    constructor() {
        this.canvasCtx = null;
    }
    draw() {
        this.drawMainCanvas();
        this.drawFrame();
        this.drawImage(0);
    }
    drawMainCanvas() {
        const drawingPanel = document.getElementById(elementIds.imagePanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.imgCanvas;
        Decorators.elementToCenterDecorator(canvas.style, constants.imgStandardHeight, constants.imgStandardWidth);
        canvas.width = constants.imgStandardWidth + constants.imgCanvasOffset;
        canvas.height = constants.imgStandardHeight + constants.imgCanvasOffset;
        drawingPanel.appendChild(canvas);
        this.canvasCtx = canvas.getContext('2d');
    }
    drawFrame() {
        this.canvasCtx.strokeRect(10, 10, constants.imgStandardWidth, constants.imgStandardHeight);
    }

    drawImage(x) {
        const myImg = images.quizImages[x];
        const ctx = this.canvasCtx;

        ctx.clearRect(10, 10, constants.imgStandardWidth, constants.imgStandardHeight);

        if (!myImg.imgElement) {
            const img = new Image();
            img.src = myImg.name;
            img.onload = function() {
                ctx.drawImage(myImg.imgElement, constants.imgCanvasOffset / 2, constants.imgCanvasOffset / 2);
            }
            myImg.imgElement = img;
        } else {
            ctx.drawImage(myImg.imgElement, constants.imgCanvasOffset / 2, constants.imgCanvasOffset / 2);
        }
        return myImg.name;
    }
}

export class InfoPanelModule {
    constructor() {
        this.canvasCtx = null;
    }

    draw() {
        this.drawCanvas();
        this.drawText("Ready?");
    }

    drawCanvas() {
        const infoPanel = document.getElementById(elementIds.infoPanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.infoCanvas;
        canvas.width = 300;
        canvas.heigth = 150;
        Decorators.elementToCenterDecorator(canvas.style, 150, 300);
        infoPanel.appendChild(canvas);
        this.canvasCtx = canvas.getContext('2d');

    }

    drawText(text) {
        this.canvasCtx.clearRect(0, 0, 300, 150);
        this.canvasCtx.font = '48px serif';
        this.canvasCtx.fillText(text, 10, 100);
    }

}

export class SelectionModule {
    constructor() {}

    draw() {
        const selectionPanel = document.getElementById(elementIds.selectPanel);
        selectionPanel.innerHTML = `
            <div>
            <select id="selectImg" style="font-size: 30px; padding: 5px; width: 180px; position: relative; left:50px; top:50px">
                <option value="SYM1.png">SYM1</option>
                <option value="SYM3.png">SYM3</option>
                <option value="SYM4.png">SYM4</option>
                <option value="SYM5.png">SYM5</option>
                <option value="SYM6.png">SYM6</option>
                <option value="SYM7.png">SYM7</option>
            </select>
            </div>
        `;
    }

    getSelectedValue() {
        const selectItem = document.getElementById("selectImg");
        const index = selectItem.selectedIndex;
        return selectItem.options[index].value;
    }
}

export class ControlModule {
    constructor() {
        this.canvasCtx = null;
        this.loaded = false;
    }

    draw() {
        this.drawCanvas();
        this.drawButton(true);
    }

    drawCanvas() {
        const controlPanel = document.getElementById(elementIds.controlPanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.controlCanvas;
        canvas.width = 300;
        canvas.heigth = 150;
        Decorators.elementToCenterDecorator(canvas.style, 150, 300);
        controlPanel.appendChild(canvas);
        this.canvasCtx = canvas.getContext('2d');

    }

    drawButton(active) {
        let imgUrl = null;
        (active) ? imgUrl = "BTN_Spin.png": imgUrl = "BTN_Spin_d.png";
        const img = images.layoutImages.find(v => v.name == imgUrl);
        const myImage = new Image();
        const ctx = this.canvasCtx;
        myImage.src = img.name;
        myImage.onload = function() {
            console.log("ONLOAD");
            ctx.drawImage(myImage, 10, 10);
        }
    }

    setupHandlers(onSpinButtonClick) {
        const canvas = document.getElementById(elementIds.controlCanvas);
        canvas.addEventListener("click", e => {
            var x = e.offsetX,
                y = e.offsetY;
            if (Math.pow(x - 59, 2) + Math.pow(y - 59, 2) < Math.pow(54, 2)) {
                if (onSpinButtonClick)
                    onSpinButtonClick();
            }
        });
        this.loaded = true;
    }

}