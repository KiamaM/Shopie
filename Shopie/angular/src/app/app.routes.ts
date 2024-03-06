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

];
