export interface IGridSpace {
    xs?: number | undefined,
    sm?: number | undefined,
    md?: number | undefined,
    lg?: number | undefined,
    xl?: number | undefined
}

export default interface IGridContainer extends IGridSpace {
    gap: number | undefined,
    spacing: number | undefined,
    columns: number | undefined,
    size?: IGridSpace | number | undefined
}