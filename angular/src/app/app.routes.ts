import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResetComponent } from './components/reset/reset.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddProductComponent } from './components/add-product/add-product.component';

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
        { path: 'add-product', component: AddProductComponent }]}
]
