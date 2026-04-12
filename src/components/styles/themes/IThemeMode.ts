
export interface IColor {
    main?: string | undefined
    textColor?: string | undefined, 
    borderColor?: string | undefined
}

export interface IPallete {
    primary?: IColor | undefined,
    secondary?: IColor | undefined,
    warning?: IColor | undefined,
    error?: IColor | undefined
}

export default interface IThemeMode {
    mode: "light" | "dark",
    pallete: IPallete,
    backgroundColor?: string | undefined
}