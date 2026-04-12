import { Routes } from '@angular/router';
import allRoutes from '../routes/Routes';

export const routes: Routes = 
[
    ...allRoutes.map(route => ({
        path: route.path,
        component: route.component
    }))
];
