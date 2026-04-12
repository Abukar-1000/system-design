import { Injectable, signal, WritableSignal } from "@angular/core";
import IIPAddressService from "./Interfaces/IIPAddressService";
import IIPAddress, { IPV4, IPV6 } from "./Interfaces/IIPAddress";




@Injectable({
    providedIn: "root"
})
export default class IPAddressService {
    protected state: WritableSignal<IIPAddressService> = signal({
        table: new Map<string, IIPAddress>()
    })
    constructor() {}

    public createAddress(type: IPV4 | IPV6, user: string = ""): IIPAddress {
        if (type === "IPV4") {
            return {
                type: "IPV4",
                address: `${this.getRandom(0, 255)}.${this.getRandom(0, 255)}.${this.getRandom(0, 255)}.${this.getRandom(0, 255)}`,
                user: user
            };
        }
        
        return {
            type: "IPV6",
            address: this.createV6Address(),
            user: user
        }
    }

    protected createV6Address(): string {
        let v6 = "";
        for (let i = 0; i < 6; ++i) {
            for (let j = 0; j < 4; ++j) {
                let num = this.getRandom(0, 16);
                if (num === 10) {
                    v6 += 'a';
                }
                else if (num === 11) {
                    v6 += 'b';
                }
                else if (num === 12) {
                    v6 += 'c';
                }
                else if (num === 13) {
                    v6 += 'd';
                }
                else if (num === 14) {
                    v6 += 'e';
                }
                else if (num === 15) {
                    v6 += 'f';
                }
                else {
                    v6 += num.toString();
                }
            }

            v6 += ":";
            if (i % 3 === 0 && i < 6) {
                v6 += ":";
            }
        }

        return v6
    }
    protected getRandom(min: number, max: number): number {
        return Math.ceil( Math.random() * (max - min) + min )
    }
}