import { Component, effect, ElementRef, inject, Input, viewChild, ViewChild } from "@angular/core";
import Tick from "../tick/tick";
import TickService from "./services/tick-service";



@Component({
    selector: "tick-ring",
    standalone: true,
    templateUrl: "tick-ring.component.html",
    styleUrl: "tick-ring.component.css",
    host: {
        "[style.--width]": "this.width",
        "[style.--height]": "this.height",
    },
    imports: [
        Tick
    ]
})
export default class TickRing {
    @Input() width = "600px";
    @Input() height = "600px";
    @Input() count = 100;
    tickRingElement = viewChild<ElementRef>("tickRing");
    public tickService: TickService;
    
    constructor() {
        this.tickService = inject(TickService);
        effect(() => {
            if (this.tickRingElement) {

                const rect = this.tickRingElement()?.nativeElement.getBoundingClientRect();
                const centerY = Math.floor( ( window.scrollX + rect.left + rect.width) / 2 );
                const centerX = Math.floor( ( window.scrollY + rect.top + rect.height) / 2 );
                this.tickService.setCenter(centerX, centerY);
                this.tickService.setCount(60);
                this.tickService.setRadius(300);
                this.tickService.setCorrection(255, -610);
                this.tickService.getTicks();
            }
        });
    }
    
}