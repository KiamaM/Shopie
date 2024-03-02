import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    { path: '', component: LandingPageComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'register',component:RegisterComponent},
    { path: 'login', component: LoginComponent }
];
