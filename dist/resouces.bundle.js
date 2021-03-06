/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const constants = {
    imgStandardWidth: 235,
    imgStandardHeight: 155,
    imgCanvasOffset: 20,
    imgSpinRadius: 49,
    imgSpinOffset: 10
}
/* harmony export (immutable) */ __webpack_exports__["constants"] = constants;


const elementIds = {
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
/* harmony export (immutable) */ __webpack_exports__["elementIds"] = elementIds;


const images = {
    quizImages: [],
    layoutImages: [],
}
/* harmony export (immutable) */ __webpack_exports__["images"] = images;


const messages = {
    infoModule_winMessage: "YOU WON!!",
    infoModule_lostMessage: "YOU LOST :(",
    infoModule_initial: "",
    infoModule_ready: "",
    infoModule_desc_initial: "Select symbol",
    infoModule_desc_afterGame: "Click anywhere to play again",
    infoModule_desc_ready: "Click on spin button to start"


}
/* harmony export (immutable) */ __webpack_exports__["messages"] = messages;


class MyImage {
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
/* harmony export (immutable) */ __webpack_exports__["MyImage"] = MyImage;


const GameState = {
    LOADING: 0,
    INITIAL: 1,
    READY: 2,
    WIN: 3,
    LOST: 4,

}
/* harmony export (immutable) */ __webpack_exports__["GameState"] = GameState;


/***/ })
/******/ ]);