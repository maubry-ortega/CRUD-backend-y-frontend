import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../views/Usuario/login/login.component'
import { AuthGuard } from "../../auth/auth.guard";
import { ProductListComponent } from '../../views/product-list/product-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'Panel', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'productos', component: ProductListComponent },
];
