import { Component, Input } from "@angular/core";

@Component({
    selector: "tick",
    standalone: true,
    templateUrl: "tick.component.html",
    styleUrl: "tick.component.css",
    host: {
        "[style.--height]": "this.height",
        "[style.--width]": "this.width",
        "[style.--color]": "this.color",
        "[style.--angle]": "this.getAngle()",
        "[style.--top]": "this.getTop()",
        "[style.--left]": "this.getLeft()"
    }
})
export default class Tick {
    @Input() height = "5px"
    @Input() width = "5px"
    @Input() top = 0
    @Input() left = 0
    @Input() angle: number | undefined = 0
    @Input() color = "black"
    public x = 0;
    public y = 0;
    
    constructor() {}

    ngOnInit(): void {
        console.log("node", this.top, this.left);
        this.x = this.left;
        this.y = this.top;
    }

    public getTop(): string {
        return `${this.top}px`
    }

    public getLeft(): string {
        return `${this.left}px`
    }

    public getAngle(): string {
        return `${this.angle || 0}deg`
    }
}