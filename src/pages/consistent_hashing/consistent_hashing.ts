import { Component, inject, signal, WritableSignal } from "@angular/core";
import Page from "../../components/page/page";
import Circle from "../../components/shapes/circle/circle";
import Grid from "../../components/grid/container/grid";
import GridItem from "../../components/grid/item/grid-item";
import { IReason, reason } from "./notes/why";
import Paper from "../../components/paper/paper";
import ConsistentHashingService from "./services/ConsistentHashingService";
import HiddenStack from "../../components/stack/hidden-stack/container/hidden-stack";
import HiddenStackItem from "../../components/stack/hidden-stack/item/hidden-stack-item";

/**
 * 

While a hash val is over a tick:
    - Tick elongates
    - Tick # shows
    - Maybe tick color changes
 */

@Component({
    selector: "consistent-hashing",
    templateUrl: "consistent_hashing.component.html",
    styleUrl: "consistent_hashing.component.css",
    host: {},
    imports: [
        Page,
        Circle,
        Grid,
        GridItem,
        Paper,
        HiddenStack,
        HiddenStackItem
    ]
})
export default class ConsistentHashing 
{
    public implementation: IReason = reason;
    public consistentHashingService: ConsistentHashingService<string>;
    public servers: WritableSignal<string[]> = signal(["A", "B", "C", "D"]);

    constructor() {
        console.log("implementation:", this.implementation.implementation);
        this.consistentHashingService = inject(ConsistentHashingService);
        this.consistentHashingService.setHashFunction(this.hashFunction);
    }

    protected hashFunction(str: string): number {
        if (str.length < 1) {
            return 0;
        }

        let hash = str.charCodeAt(0);
        let power = 2;
        const range = Math.min(str.length, 15);
        for (let index = 1; index < range; ++index) {
            hash += str.charCodeAt(index) * power;
            power = power << 1;
        }

        return hash;
    }
};
