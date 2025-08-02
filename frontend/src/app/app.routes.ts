import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { Signup } from './signup/signup';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';

export const routes: Routes = [

    {path : '', component : HomeComponent},
    {path: 'login', component:LoginComponent},
    {path : 'signup' , component:Signup},
    {path : 'customer-Dash',component:CustomerDashboard}
];
