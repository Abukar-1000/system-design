
export interface IPaper {
    elevation?: number | undefined,
    padding?: string | undefined
}


const paperConfig: IPaper = {
    elevation: 4,
    padding: "1rem"
}

export default paperConfig;