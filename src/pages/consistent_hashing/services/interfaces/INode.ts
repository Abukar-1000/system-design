
export interface IPosition {
    x: number,
    y: number,
    index: number
};

export default interface INode<T> {
    name: string,
    position: IPosition,
    elements: T[],
    virtualNodes?: INode<T> | undefined
};