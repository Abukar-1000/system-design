import { Injectable, signal, WritableSignal } from "@angular/core";

export interface IPoint {
    top: number;
    left: number;
    angle: number | undefined
}

interface ICartesianPoint {
    x: number;
    y: number;
}

interface ITickService {
    count: number,
    radius: number,
    ticks: IPoint[]
}

@Injectable({
    providedIn: "root"
})
export default class TickService {
    protected state: WritableSignal<ITickService> = signal({
        ticks: [],
        count: 100,
        radius: 100,
    });

    protected centerState: WritableSignal<ICartesianPoint> = signal({
        x: 0,
        y: 0
    });

    protected correctionState: WritableSignal<ICartesianPoint> = signal({
        x: 0,
        y: 0
    });

    constructor() {}

    public setCount(x: number): void {
        this.state.update(prev => ({ ...prev, count: x }));
    }

    public setCenter(x: number = 0, y: number = 0): void {
        this.centerState.set({ x: x, y: y })
    }
    public setRadius(x: number): void {
        this.state.update(prev => ({ ...prev, radius: x }));
    }

    public getTicks(recompute: boolean = false): IPoint[] {
        if (this.state().ticks.length === 0 || recompute) {
            this.setTicks();
        }

        return this.state().ticks;
    }

    public getTick(position: number = 0): IPoint {
        return this.state().ticks[position];
    }
    
    public setCorrection(x: number = 0, y: number = 0): void {
        this.correctionState.set({ x: x, y: y})
    }

    private getRadialPosition(index: number): IPoint {
        const angle = ( index / this.state().count ) * 2 * Math.PI;
        const padding = 5;
        const tickRadius = this.state().radius;
        let x =  ( (( tickRadius - padding) * Math.cos(angle)) + this.centerState().x) + this.correctionState().x;
        let y =  ( (( tickRadius - padding) * Math.sin(angle)) + this.centerState().y) + this.correctionState().y;

        return {
            top: Math.floor(x),
            left: Math.floor(y),
            angle: Math.floor(angle)
        }
    }

    protected setTicks(): void {
        this.state.update(prev => {
            const ticks: IPoint[] = [];

            for (let index = 0; index < prev.count; ++index) {
                let newTick: IPoint = this.getRadialPosition(index);
                ticks.push(newTick);
            }

            return {
                ...prev,
                ticks: ticks
            }
        });
    }
}