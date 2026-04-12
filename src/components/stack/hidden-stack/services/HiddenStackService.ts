import { Injectable, signal, WritableSignal } from "@angular/core";
import IHiddenStackItem from "./Interfaces/IHiddenStackItem";


@Injectable({
    providedIn: "root"
})
export default class HiddenStackService {
    protected state: WritableSignal<IHiddenStackItem[]> = signal([])
    constructor() {}

    public register(id: string, zIndex: number): void {
        this.state.update(prev => {
            prev.push({
                zIndex: zIndex,
                id: id
            });

            return prev;
        });
    }

    public get(id: string): IHiddenStackItem | undefined {
        for (let i = 0; i < this.state().length; ++i) {
            if (this.state()[i].id === id) {
                return this.state()[i];
            }
        }

        return undefined;
    }

}