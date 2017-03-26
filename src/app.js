import styles from './css/styles.css';
import { elementIds, images, constants, MyImage } from './resources.js';
import { ImagePanelModule, InfoPanelModule, SelectionModule, ControlModule } from './myPanels.js';

var requireContext = require.context("./resources", true, /\.(gif|png|jpe?g|svg|json)$/i);
requireContext.keys().map(requireContext);

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        myApp.startApp();
    });
})();

const myApp = {
    imagePanelModule: new ImagePanelModule(),
    infoPanelModule: new InfoPanelModule(),
    selectionModule: new SelectionModule(),
    controlModule: new ControlModule(),
    startApp: function() {
        this.loadResources(() => {
            this.draw();
            const imagePanelModule = this.imagePanelModule;
            const infoPanelModule = this.infoPanelModule;
            const selectionModule = this.selectionModule;
            const controlModule = this.controlModule;
            imagePanelModule.draw();
            infoPanelModule.draw();
            selectionModule.draw();
            controlModule.draw();

            this.controlModule.setupHandlers(function() {
                const x = Math.floor((Math.random() * images.quizImages.length));
                const drawn = imagePanelModule.drawImage(x);
                const selected = selectionModule.getSelectedValue();

                if (drawn === selected) {
                    infoPanelModule.drawText("YOU WON!!");
                } else {
                    infoPanelModule.drawText("LOST :(");
                }


            });
        });
    },
    draw: function() {
        const mainPanel = document.getElementById(elementIds.mainContainer);
        mainPanel.style.backgroundImage = "url(BG.png)";
    },
    loadResources: function(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    let quizImages = JSON.parse(xhr.response).quizImages;
                    for (let imgUrl of quizImages) {
                        const image = new Image();
                        image.src = imgUrl;
                        images.quizImages.push(new MyImage(imgUrl));
                    }
                    let layoutImages = JSON.parse(xhr.response).layoutImages;
                    for (let imgUrl of layoutImages) {
                        const image = new Image();
                        image.src = imgUrl;
                        images.layoutImages.push(new MyImage(imgUrl));
                    }
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
                callback();
            }
        };
        xhr.open("GET", "resources.json");
        xhr.send(null);
    },
};