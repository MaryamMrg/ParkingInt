import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav-component/nav-component";
import { HomeComponent } from "./home-component/home-component";
import { LoginComponent } from "./login-component/login-component";
import { Signup } from './signup/signup';
import { CustomerDashboard } from "./customer-dashboard/customer-dashboard";
import { AdminDashboard } from "./admin-dashboard/admin-dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent, LoginComponent, Signup, CustomerDashboard, AdminDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
