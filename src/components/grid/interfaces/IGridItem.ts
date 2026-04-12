import { IGridSpace } from "./IGridContainer";

export default interface IGridItem extends IGridSpace {
    size?: IGridSpace | number | undefined
}