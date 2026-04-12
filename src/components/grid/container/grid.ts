import { Component, input, Input, InputSignal, signal, WritableSignal } from "@angular/core";



@Component({
    selector: "grid",
    standalone: true,
    templateUrl: "grid.component.html",
    styleUrl: "grid.component.css",
    host: {
        "[style.--columns]": "this.columns()",
        "[style.--width]": "this.fullWidth() ? '100dvw !important' : 'auto' "
    }
})
export default class Grid {
    public columns = input(12);
    public fullWidth: InputSignal<boolean> = input(false);
    constructor() {}
}