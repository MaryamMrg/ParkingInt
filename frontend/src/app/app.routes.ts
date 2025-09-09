import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { Signup } from './signup/signup';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Parkingplace } from './parkingplace/parkingplace';
import { ProfilComponent } from './profil-component/profil-component';
import { AuthGuard } from './auth-guard-guard';
import { AboutUs } from './about-us/about-us';

export const routes: Routes = [
   
    //public paths
    {path : '', component : HomeComponent},
    {path: 'login', component:LoginComponent},
    {path : 'signup' , component:Signup},
    {path : 'About',component:AboutUs},

    //needs guard
    {path : 'customer-Dash',
        component:CustomerDashboard,
        canActivate:[AuthGuard],
        data : { expectedRole:'CUSTOMER'}

    },

    {path : 'admin-dashboard',
         component : AdminDashboard,
         canActivate:[AuthGuard],
         data:{expectedRole:'ADMIN'}
         
        },

    {path : 'places',
        component : Parkingplace,
        canActivate:[AuthGuard],
        data : { expectedRole:'CUSTOMER'}
    },

    {path : 'profil',
        component:ProfilComponent,
           canActivate:[AuthGuard],
        data : { expectedRole:['CUSTOMER','ADMIN']}
    
    },
    
];
