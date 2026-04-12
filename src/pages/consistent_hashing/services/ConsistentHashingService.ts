import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import IConsistentHashing, { HashFunction } from "./interfaces/IConsistentHashing";
import IHashSpace from "./interfaces/IHashSpace";
import INode from "./interfaces/INode";
import TickService from "../../../components/shapes/tick-ring/services/tick-service";


@Injectable({
    providedIn: "root"
})
export default class ConsistentHashingService<T> {

    protected state: WritableSignal<IConsistentHashing<T>> = signal({
        nodes: [],
        taken: new Set<number>,
        hashSpace: {
            start: 0,
            end: 99
        },
        hashFunc: (_var: T) => 10 // placeholder hash func, user should define their own.
    });

    protected emptyNode: INode<T> = {
        name: "EMPTY",
        position: {
            x: -1,
            y: -1,
            index: -1
        },
        elements: [],
        virtualNodes: undefined
    };

    protected tickService: TickService;

    constructor() {
        this.tickService = inject(TickService);
        const NODES: INode<T>[] = [];
        for (let i = 0; i < this.state().hashSpace.end; ++ i) {
            NODES.push(this.emptyNode);
        }
        
        this.state.update(prev => ({
            ...prev,
            nodes: NODES
        }));
    }

    public getHashSpace(): IHashSpace {
        return this.state().hashSpace;
    }

    public setHashSpace(start: number = 0, end: number = 99) {
        this.state.update(prev => ({
            ...prev, 
            hashSpace: {
                start: start,
                end: end
            }
        }));
    }

    public setHashFunction(func: HashFunction): void {
        this.state.update(prev => ({ ...prev, hashFunc: func }));
    }

    public addNode(node: INode<T>): void {
        const position = this.findSpot(node);
        this.state.update(prev => {
            if (position) {
                const nextNodePosition = this.findNextNode(prev.taken.keys(), position);
                const next: INode<T> = prev.nodes[nextNodePosition];
                const movedNodes = next.elements.filter(e => {
                    return this.state().hashFunc(e) <= position;
                });
                
                const { left: x, top: y } = this.tickService.getTick(position);
                node.position = {
                    x: x,
                    y: y,
                    index: position
                };
                
                prev.nodes[position] = node;
                prev.nodes[position].elements.concat(movedNodes);
                prev.taken.add(position);
            }

            return prev;
        });
    }

    public removeNode(node: INode<T>): void {
        const position = this.findSpot(node);
        this.state.update(prev => {
            if (position) {
                const nextNodePosition = this.findNextNode(prev.taken.keys(), position);
                prev.nodes[nextNodePosition].elements.concat(prev.nodes[position].elements);
                prev.nodes[position] = this.emptyNode;
                prev.taken.delete(position);
            }
            return prev;
        });
    }

    protected findNextNode(
        keys: SetIterator<number>,
        position: number
    ): number {
        const hashKeys = Array.from(keys).sort();
        const nextNodePosition = hashKeys.indexOf(position) + 1;
        return nextNodePosition;
        
    }

    protected findSpot(key: INode<T> | string): number | undefined {
        try {
            const isString = typeof key === "string";
            if (isString) {
                return key.charCodeAt(0) % this.state().hashSpace.end;
            }

            return key.name.charCodeAt(0) % this.state().hashSpace.end;
        } 
        catch {
            return undefined;
        } 
        
    }

    public getNode(key: INode<T> | string): INode<T> | undefined {
        const position = this.findSpot(key);
        if (!position) {
            return undefined;
        }

        return this.state().nodes[position];
    }

}