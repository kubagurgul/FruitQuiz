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