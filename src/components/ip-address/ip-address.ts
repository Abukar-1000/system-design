import { Component, inject, input, InputSignal } from "@angular/core";
import Grid from "../grid/container/grid";
import GridItem from "../grid/item/grid-item";
import Paper from "../paper/paper";
import IIPAddress from "./services/Interfaces/IIPAddress";
import IPAddressService from "./services/IPAddressService";



@Component({
    selector: "ip-address",
    standalone: true,
    templateUrl: "ip-address.component.html",
    styleUrl: "ip-address.component.css",
    host: {

    },
    imports: [
        Grid,
        GridItem,
        Paper
    ]
})
export default class IPAddress {

    public username: InputSignal<string> = input("");
    public address: IIPAddress;
    protected IPAddressService: IPAddressService;
    
    constructor() {
        this.IPAddressService = inject(IPAddressService);
        this.address = this.IPAddressService.createAddress("IPV4", this.username());
    }
}