import INode from "./INode"


type Remove = "Remove"
type Add = "Add"

export default interface IAction<T> {
    node: INode<T>,
    affected: T[],
    type: Add | Remove
}