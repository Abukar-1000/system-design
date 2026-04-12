import { Component, inject, input, InputSignal, signal, WritableSignal } from "@angular/core";
import IPAddress from "../ip-address/ip-address";
import ConsistentHashingService from "../../pages/consistent_hashing/services/ConsistentHashingService";
import INode from "../../pages/consistent_hashing/services/interfaces/INode";
import IIPAddress from "../ip-address/services/Interfaces/IIPAddress";
import INodeProvider from "./services/Interfaces/INodeProvider";


@Component({
    selector: "node-provider",
    standalone: true,
    templateUrl: "node-provider.component.html",
    styleUrl: "node-provider.component.css",
    host: {

    },
    imports: [
        IPAddress
    ]
})
export default class NodeProvider {

    public consistentHashingService: ConsistentHashingService<INode<IIPAddress>>;
    public count: InputSignal<number> = input(8);
    protected serverLetters: string[] = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ];

    /**
     * Current is the ptr to the current ip address mapped
     * 
     */
    public state: WritableSignal<INodeProvider> = signal({
        length: this.count(),
        current: 0
    });

    constructor() {
        this.consistentHashingService = inject(ConsistentHashingService);
    }

    protected initServers(): void {
        const length: number = this.serverLetters.length;
        const hashSpace: number = 99;
        const buffer: number = Math.floor( hashSpace / this.count() ) // for evenly distributing server nodes

        for (let i = 0; i < this.count(); ++i) {
            let index = i % length;
            let letter = this.serverLetters[index];
            this.consistentHashingService.addNode({
                name: `Server ${letter}`,
                position: {
                    x: -1,
                    y: -1,
                    index: index + buffer
                },
                elements: []
            });
        }
    }
}