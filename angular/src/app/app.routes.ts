import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResetComponent } from './components/reset/reset.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    { path: '', component: LandingPageComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'register',component:RegisterComponent},
    { path: 'login', component: LoginComponent },
    {path:'reset', component:ResetComponent},
    {path:'admin',component:AdminPageComponent, 
     children: [
        { path: 'add-product', component: AddProductComponent },
        {path:'dashboard',component:DashboardComponent},
    {path:'all-products',component:AllProductsComponent},
    {path:'order-list', component:OrderListComponent}
]},
{path:'user/user_id',component:UserDashboardComponent,
children:[
    {path:'page',component:UserPageComponent},
    {path:'products',component:AllProductsComponent}
]}
]
