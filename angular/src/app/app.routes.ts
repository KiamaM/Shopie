import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserPageComponent } from './components/user-page/user-page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    { path: '', component: LandingPageComponent},
    { path: 'products', component: ProductListPageComponent},
    { path: 'view-products/:productId', component: ViewProductComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'register',component:RegisterComponent},
    { path: 'login', component: LoginComponent },
    {path: 'cart', component:CartComponent},
    {path: 'update-product/:productId', component:UpdateProductComponent},
    {path: 'add-product', component:AddProductComponent},
    {path: 'admin', component:AdminPageComponent},
    // {path:'user',component:UserDashboardComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'admin',component:AdminPageComponent},
    {path:'reset', component:ResetComponent},





    

//     {
//         path: '', redirectTo: '', pathMatch: 'full'
//     },
//     { path: '', component: LandingPageComponent},
//     {path:'navbar',component:NavbarComponent},
//     {path:'register',component:RegisterComponent},
//     { path: 'login', component: LoginComponent},
//     {path:'reset', component:ResetComponent},
    {path:'admin',component:AdminPageComponent, 
     children: [
        { path: 'add-product', component: AddProductComponent},
        {path:'dashboard',component:DashboardComponent},
        {path:'product-table', component:ProductsTableComponent},
    {path:'products',component:ProductListPageComponent},
    {path:'order-list', component:CartComponent},
    {path: 'add-product', component:AddProductComponent},
]},
// {path:'products',component:ProductListPageComponent},
{path:'user',component:UserDashboardComponent,
children:[
    {path:'page',component:UserPageComponent},
    {path:'products',component:ProductListPageComponent},
    {path: 'cart', component:CartComponent},
]},
{ path: 'add-product', component: AddProductComponent }

];
