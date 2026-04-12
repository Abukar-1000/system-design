import { Injectable, signal, WritableSignal } from "@angular/core";
import IThemeMode from "../IThemeMode";
import DarkTheme from "../darkTheme";
import LightTheme from "../lightTheme";





@Injectable({
    providedIn: "root"
})
export default class ThemeService {
    public dark: IThemeMode = DarkTheme;
    public light: IThemeMode = LightTheme;
    protected state: WritableSignal<IThemeMode> = signal(this.dark);

    constructor() {}
    
    public getCurrentTheme(): IThemeMode {
        return this.state();
    }

    public setDarkTheme(): void {
        this.state.set(this.dark);
    }

    public setLightTheme(): void {
        this.state.set(this.light);
    }
}