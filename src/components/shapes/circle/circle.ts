import { Component, effect, ElementRef, Input, signal, viewChild, WritableSignal } from "@angular/core";
import Node from "../node/node";
import TickRing from "../tick-ring/tick-ring";
import IPAddress from "../../ip-address/ip-address";
import NodeProvider from "../../node-provider/node-provider";

interface IPoint {
    x: number;
    y: number;
}

@Component({
    selector: "circle",
    standalone: true,
    templateUrl: "circle.component.html",
    styleUrl: "circle.component.css",
    host: {
        "[style.--border]": "this.border",
        "[style.--box-shadow]": "this.boxShadow"
    },
    imports: [
        Node,
        TickRing,
        IPAddress,
        NodeProvider
    ]
})
export default class Circle {
    @Input() border = "1px solid black";
    @Input() boxShadow = "0 0 35px 1px black";
    public nodes: string[] = ["Top", "Right", "Bottom", "Left"]
    public centerState: WritableSignal<IPoint> = signal({ x: 0, y: 0 })
    el = viewChild<ElementRef>("centerRef");

    constructor() {
        effect(() => {
            const rect = this.el()?.nativeElement?.getBoundingClientRect();
            const centerX = Math.floor( (window.scrollX + rect.left + rect.width) / 2 );
            const centerY = Math.floor( (window.scrollY + rect.top + rect.height) / 2 );
            this.centerState.set({ x: centerX, y: centerY })
        })
    }

}