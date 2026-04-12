import { Component, Input } from "@angular/core";


@Component({
    selector: "page",
    standalone: true,
    templateUrl: "page.component.html",
    styleUrl: "page.component.css",
    host: {
        "[style.gap]": "this.setGap()"
    }
})
export default class Page {
    @Input() gap = 2;
    constructor() {}

    public setGap(): string {
        return `${this.gap}rem`;
    }
}