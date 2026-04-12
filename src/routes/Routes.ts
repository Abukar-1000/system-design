import { Component, Type } from "@angular/core";
import ConsistentHashing from "../pages/consistent_hashing/consistent_hashing";


export interface Route
{
    path: string,
    name: string,
    component: Type<any>
};


const allRoutes: Route[] = 
[
    {
        path: "ConsistentHashing",
        name: "Consistent Hashing",
        component: ConsistentHashing
    }
];

export default allRoutes;