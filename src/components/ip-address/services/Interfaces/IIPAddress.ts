

export type IPV4 = "IPV4"
export type IPV6 = "IPV6"
export default interface IIPAddress {
    type: IPV4 | IPV6
    address: string,
    user?: string | undefined
}