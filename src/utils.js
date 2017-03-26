export class Decorators {
    static elementToCenterDecorator(style, height, width) {
        style.position = "relative";
        style.left = "50%";
        style.top = "50%";
        style.margin = "-" + (height / 2) + "px 0 0 -" + (width / 2) + "px";
    }
}