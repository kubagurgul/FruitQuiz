import { elementIds, images, constants, MyImage, messages, GameState } from './resources.js';
import { Decorators } from './utils.js';

export class ImagePanelModule {
    constructor() {
        this._canvascanvasCtx = null;
    }

    init() {
        this.drawMainCanvas();
        this.drawFrame();
    }
    drawMainCanvas() {
        const drawingPanel = document.getElementById(elementIds.imagePanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.imgCanvas;
        Decorators.elementToCenterDecorator(canvas.style, constants.imgStandardHeight, constants.imgStandardWidth);
        canvas.width = constants.imgStandardWidth + constants.imgCanvasOffset;
        canvas.height = constants.imgStandardHeight + constants.imgCanvasOffset;
        drawingPanel.appendChild(canvas);
        this._canvascanvasCtx = canvas.getContext('2d');
    }
    drawFrame() {
        this._canvascanvasCtx.strokeRect(5, 5, constants.imgStandardWidth + 10, constants.imgStandardHeight + 10);
    }

    drawImage(x) {
        const myImg = images.quizImages[x];
        const ctx = this._canvascanvasCtx;
        this.clearCanvas();
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
    reset() {
        this.clearCanvas();
    }

    clearCanvas() {
        this._canvascanvasCtx.clearRect(10, 10, constants.imgStandardWidth, constants.imgStandardHeight);
    }
}

export class InfoPanelModule {
    constructor() {
        this._canvascanvasCtx = null;
    }

    init() {
        this.drawCanvas();
        this.drawTextForGameState(GameState.INITIAL);
    }

    drawCanvas() {
        const infoPanel = document.getElementById(elementIds.infoPanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.infoCanvas;
        canvas.width = 300;
        canvas.heigth = 150;
        Decorators.elementToCenterDecorator(canvas.style, 150, 300);
        infoPanel.appendChild(canvas);
        this._canvascanvasCtx = canvas.getContext('2d');

    }

    drawTextForGameState(gameState) {
        switch (gameState) {
            case GameState.LOADING:
            case GameState.INITIAL:
                this.drawText(messages.infoModule_initial);
                this.drawDescText(messages.infoModule_desc_initial);
                break;
            case GameState.READY:
                this.drawText(messages.infoModule_ready);
                this.drawDescText(messages.infoModule_desc_ready);
                break;
            case GameState.LOST:
                this.drawText(messages.infoModule_lostMessage);
                this.drawDescText(messages.infoModule_desc_afterGame);
                break;
            case GameState.WIN:
                this.drawText(messages.infoModule_winMessage);
                this.drawDescText(messages.infoModule_desc_afterGame);
                break;

        }
    }

    drawText(text) {
        this._canvascanvasCtx.clearRect(0, 0, 300, 70);
        this._canvascanvasCtx.font = '48px serif';
        this._canvascanvasCtx.fillText(text, 10, 50);

    }

    drawDescText(text) {
        this._canvascanvasCtx.clearRect(0, 70, 300, 70);
        this._canvascanvasCtx.font = '24px serif';
        this._canvascanvasCtx.fillText(text, 10, 100);
    }

    reset() {
        this.drawText(messages.infoModule_initial);
        this.drawDescText(messages.infoModule_desc_initial);
    }

}

export class SelectionModule {
    constructor() {
        this._canvascanvasCtx = null;
    }

    init() {
        const selectionPanel = document.getElementById(elementIds.selectPanel);
        selectionPanel.innerHTML = `
            <div>
            <canvas width="80" height="50" id="thumbnail" style="position: relative; left:80px; top:65px "></canvas>
            <select id="selectImg" style="font-size: 30px; padding: 5px; width: 180px; position: relative; left:80px; top:50px">
                <option disabled selected value> -- select -- </option>
                <option value="SYM1.png">SYM1</option>
                <option value="SYM3.png">SYM3</option>
                <option value="SYM4.png">SYM4</option>
                <option value="SYM5.png">SYM5</option>
                <option value="SYM6.png">SYM6</option>
                <option value="SYM7.png">SYM7</option>
            </select>
            </div>
        `;
        this._canvascanvasCtx = document.getElementById('thumbnail').getContext('2d');

    }

    setupHandlers(onSelection) {
        const selectImgElement = document.getElementById("selectImg");
        selectImgElement.addEventListener("change", (e) => {
            this.drawSelectedSymbolThumbnail(selectImgElement.value);
            onSelection(selectImgElement.value);
        });

    }

    drawSelectedSymbolThumbnail(value) {
        const ctx = this._canvascanvasCtx;
        ctx.clearRect(0, 0, 80, 50);
        const myImg = images.quizImages.find((p) => p.name == value);

        if (!myImg.imgElement) {
            const img = new Image();
            img.src = myImg.name;
            img.onload = function() {
                ctx.drawImage(myImg.imgElement, 0, 0, 80, 50);
            }
            myImg.imgElement = img;
        } else {
            ctx.drawImage(myImg.imgElement, 0, 0, 80, 50);
        }

    }

    getSelectedValueAsNumber() {
        const selectItem = document.getElementById("selectImg");
        return selectItem.selectedIndex;
    }

    disable(disable) {
        if (disable) {
            document.getElementById('selectImg').setAttribute("disabled", "");
            document.getElementById('selectImg').options[0].selected = true;
        } else {
            document.getElementById('selectImg').removeAttribute("disabled");
        }
    }

    reset() {
        const selectImg = document.getElementById('selectImg');
        selectImg.value = 0;
        this._canvascanvasCtx.clearRect(0, 0, 80, 50);
        this.disable(false);
    }
}

export class ControlModule {
    constructor() {
        this._canvasCtx = null;
        this._ready = false;
    }

    init() {
        this.drawCanvas();
        this.drawButton();
    }

    drawCanvas() {
        const controlPanel = document.getElementById(elementIds.controlPanel);
        const canvas = document.createElement("canvas");
        canvas.id = elementIds.controlCanvas;
        canvas.width = 300;
        canvas.heigth = 150;
        Decorators.elementToCenterDecorator(canvas.style, 150, 300);
        controlPanel.appendChild(canvas);
        this._canvasCtx = canvas.getContext('2d');

    }

    drawButton() {
        let imgUrl = null;
        (this._ready) ? imgUrl = "BTN_Spin.png": imgUrl = "BTN_Spin_d.png";
        const img = images.layoutImages.find(v => v.name == imgUrl);
        const myImage = new Image();
        const ctx = this._canvasCtx;
        myImage.src = img.name;
        myImage.onload = function() {
            ctx.drawImage(myImage, 10, 10);
        }
    }

    setupHandlers(onSpinButtonClick) {
        const canvas = document.getElementById(elementIds.controlCanvas);
        const _this = this;
        canvas.addEventListener("click", e => {
            if (_this.ready) {
                var x = e.offsetX,
                    y = e.offsetY;
                if (Math.pow(x - 59, 2) + Math.pow(y - 59, 2) < Math.pow(54, 2)) {
                    if (onSpinButtonClick)
                        onSpinButtonClick();
                }
            }
        });
    }

    disable(disable) {
        this._ready = !disable;
        this.drawButton();
    }

    reset() {
        this._ready = false;
        this.drawButton();
        this.disable(true);
    }

    set ready(ready) {
        this._ready = ready;
    }

    get ready() {
        return this._ready;
    }

}