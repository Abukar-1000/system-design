import { Component, input, Input, InputSignal, signal, WritableSignal } from "@angular/core";
import IGridItem from "../interfaces/IGridItem";



@Component({
    selector: "grid-item",
    standalone: true,
    templateUrl: "grid-item.component.html",
    styleUrl: "grid-item.component.css",
    host: {
        "[style.--column-span]": "this.lg()",
        "[style.grid-column]": "this.getSpan()"
    }
})
export default class GridItem {

    public xs: InputSignal<number> = input<number>(0);
    public sm: InputSignal<number> = input<number>(0);
    public md: InputSignal<number> = input<number>(0);
    public lg: InputSignal<number> = input<number>(0);
    public xl: InputSignal<number> = input<number>(0);

    // protected gridItemDataInput: IGridItem = { 
    //     size: {
    //         xs: this.xs(), 
    //         sm: this.sm(), 
    //         md: this.md(), 
    //         lg: this.lg(), 
    //         xl: this.xl()
    //     }
    // };


    // protected gridItemDataState: WritableSignal<IGridItem> = signal<IGridItem>(this.gridItemDataInput);
    constructor() {}

    public getSpan(): string {
        return `span ${this.lg()}`;
    }
}