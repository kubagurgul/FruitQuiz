export const constants = {
    imgStandardWidth: 235,
    imgStandardHeight: 155,
    imgCanvasOffset: 20,
    imgSpinRadius: 49,
    imgSpinOffset: 10
}

export const elementIds = {
    mainContainer: "mainContainer",
    imagePanel: "imagePanel",
    rightPanel: "rightPanel",

    controlContainer: "controlContainer",
    infoPanel: "infoPanel",
    selectPanel: "selectPanel",
    controlPanel: "controlPanel",

    imgCanvas: "imgCanvas",
    infoCanvas: "infoCanvas",
    controlCanvas: "controlCanvas"
};

export const images = {
    quizImages: [],
    layoutImages: [],
}

export const messages = {
    infoModule_winMessage: "YOU WON!!",
    infoModule_lostMessage: "YOU LOST :(",
    infoModule_initial: "",
    infoModule_ready: "",
    infoModule_desc_initial: "Select symbol",
    infoModule_desc_afterGame: "Click anywhere to play again",
    infoModule_desc_ready: "Click on spin button to start"


}

export class MyImage {
    constructor(name, imgElement) {
        this._name = name;
        this._imgElement = imgElement;
    }

    get name() {
        return this._name;
    }

    get imgElement() {
        return this._imgElement;
    }

    set imgElement(img) {
        this._imgElement = img;
    }

}

export const GameState = {
    LOADING: 0,
    INITIAL: 1,
    READY: 2,
    WIN: 3,
    LOST: 4,

}