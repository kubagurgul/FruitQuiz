import styles from './css/styles.css';
import { elementIds, images, constants, MyImage, messages, GameState } from './resources.js';
import { ImagePanelModule, InfoPanelModule, SelectionModule, ControlModule } from './myPanels.js';
import { Services, Utils } from './utils.js';

var requireContext = require.context("./resources", true, /\.(gif|png|jpe?g|svg|json)$/i);
requireContext.keys().map(requireContext);

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        myApp.startApp();
    });
})();

const myApp = {
    _gameState: GameState.LOADING,
    _imagePanelModule: new ImagePanelModule(),
    _infoPanelModule: new InfoPanelModule(),
    _selectionModule: new SelectionModule(),
    _controlModule: new ControlModule(),
    startApp: function() {
        this.loadResources(() => {
            const imagePanelModule = this._imagePanelModule;
            const infoPanelModule = this._infoPanelModule;
            const selectionModule = this._selectionModule;
            const controlModule = this._controlModule;
            const gameLogic = this._gameLogic;
            this.init();
            imagePanelModule.init();
            infoPanelModule.init();
            selectionModule.init();
            controlModule.init();

            this.initSymbolSelectionHandler();
            this.initSpinButtonClickHandler();
            this.initClickHandler();
            /*
             *   starts game after all initializations
             */
            this._gameState = GameState.INITIAL;
        });
    },
    init: function() {
        const mainPanel = document.getElementById(elementIds.mainContainer);
        mainPanel.style.backgroundImage = "url(BG.png)";
    },
    initSymbolSelectionHandler: function() {
        this._selectionModule.setupHandlers((value) => {
            if (value) {
                this._gameState = GameState.READY;
                this._infoPanelModule.drawText(messages.infoModule_ready);
                this._infoPanelModule.drawDescText(messages.infoModule_desc_ready);
                this._controlModule.ready = true;
                this._controlModule.drawButton();
            }
        });
    },
    initSpinButtonClickHandler: function() {
        this._controlModule.setupHandlers(() => {
            const random = Utils.generateRandom(images.quizImages.length);
            this._imagePanelModule.drawImage(random);
            const gameResult = (random + 1 == this._selectionModule.getSelectedValueAsNumber());
            if (gameResult) {
                this._gameState = GameState.WIN;
            } else {
                this._gameState = GameState.LOST;
            }

            this._infoPanelModule.drawTextForGameState(this._gameState);
            this._controlModule._ready = false;
            this._controlModule.disable(true);
            this._selectionModule.disable(true);
        });
    },
    initClickHandler: function() {
        document.getElementById('mainContainer').addEventListener('click', () => {
            console.log(this._gameState);
            if (this._gameState == GameState.WIN || this._gameState == GameState.LOST) {
                this.resetStateToInitial();
                document.getElementById('mainContainer').removeEventListener('click', this);
            }
        }, true); // in order to invoke after button click 
    },
    loadResources: function(callback) {
        Services.loadResources(callback);
    },
    resetStateToInitial: function() {
        this._imagePanelModule.reset();
        this._infoPanelModule.reset();
        this._selectionModule.reset();
        this._controlModule.reset();
    }
};