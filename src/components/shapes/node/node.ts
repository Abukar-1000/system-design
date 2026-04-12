import { Component, Input } from "@angular/core";


@Component({
    selector: "node",
    standalone: true,
    templateUrl: "node.component.html",
    styleUrl: "node.component.css",
    host: {
        "[style.--width]": "this.width",
        "[style.--height]": "this.height",
        "[style.--border-color]": "this.borderColor"
    }
})
export default class Node {
    @Input() width = "60px";
    @Input() height = "60px";
    @Input() borderColor = "black";
    constructor() {}
}