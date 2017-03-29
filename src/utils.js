import { images, MyImage } from './resources.js';

export class Decorators {
    static elementToCenterDecorator(style, height, width) {
        style.position = "relative";
        style.left = "50%";
        style.top = "50%";
        style.margin = "-" + (height / 2) + "px 0 0 -" + (width / 2) + "px";
    }
}

export class Utils {
    static generateRandom(max) {
        return Math.floor((Math.random() * max));
    }
}

export class Services {
    static loadResources(callback) {
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
    }
}