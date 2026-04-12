import { Component, HostBinding, inject, input, InputSignal } from "@angular/core";
import HiddenStackService from "../services/HiddenStackService";


@Component({
    selector: "hidden-stack-item",
    standalone: true,
    templateUrl: "hidden-stack-item.component.html",
    styleUrl: "hidden-stack-item.component.css",
    host: {
        "[style.z-index]": "this.getZIndex()",
        "[style.margin-top]": "this.getMarginTop()"
    }
})
export default class HiddenStackItem {
    public id: InputSignal<number> = input(0);
    public zIndex: InputSignal<number> = input(0);

    public hiddenStackService: HiddenStackService;

    constructor() {
        this.hiddenStackService = inject(HiddenStackService);
    }
    
    ngOnInit() {
        this.hiddenStackService.register(this.getId(), this.zIndex());
        console.log([this.id(), this.zIndex()]);
    }

    public getZIndex() {
        return this.hiddenStackService.get(this.getId())?.zIndex || -1;
    }

    public getMarginTop() {
        let margin = this.hiddenStackService.get(this.getId())?.zIndex || -1;
        margin *= 1;

        return `${margin}rem`;
    }

    protected getId(): string {
        return `${this.id}`;
    }
}