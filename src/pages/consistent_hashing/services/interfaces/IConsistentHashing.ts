import IHashSpace from "./IHashSpace";
import INode from "./INode";

export type HashFunction = (_in: any) => number;

export default interface IConsistentHashing<T> {
    nodes: INode<T>[],
    taken: Set<number>,
    hashSpace: IHashSpace,
    hashFunc: HashFunction
}