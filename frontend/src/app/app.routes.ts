import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { Signup } from './signup/signup';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Parkingplace } from './parkingplace/parkingplace';
import { ProfilComponent } from './profil-component/profil-component';

export const routes: Routes = [

    {path : '', component : HomeComponent},
    {path: 'login', component:LoginComponent},
    {path : 'signup' , component:Signup},
    {path : 'customer-Dash',component:CustomerDashboard},
    {path : 'admin-dashboard', component : AdminDashboard},
    {path : 'places',component : Parkingplace},
    {path : 'profil',component:ProfilComponent}
];
