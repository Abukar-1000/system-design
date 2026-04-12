import { Component, inject, Input, input } from "@angular/core";
import ThemeService from "../styles/themes/services/ThemeService";
import paperConfig, { IPaper } from "../styles/config/paperConfig";



@Component({
    selector: "paper",
    standalone: true,
    templateUrl: "paper.component.html",
    styleUrl: "paper.component.css",
    host: {
        "[style.--background-color]": "this.theme.getCurrentTheme().backgroundColor",
        "[style.--text-color]": "this.theme.getCurrentTheme().pallete?.primary?.textColor || '#fff'",
        "[style.--box-shadow]": "this.getElevation()",
        "[style.--padding]": "this.padding()"
    }
})
export default class Paper {
    protected theme: ThemeService;
    protected config: IPaper = paperConfig;
    elevation = input(paperConfig.elevation ?? 0);
    padding = input(paperConfig.padding ?? "0rem");

    constructor() {
        this.theme = inject(ThemeService);
        console.log("ppr bg:", this.theme.getCurrentTheme().backgroundColor, this.getElevation())
    }

    public getElevation(): string {        
        const blur: number= 10 * this.elevation();
        return `0px 0px ${blur}px #000000`;
    }

}