import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav-component/nav-component";
import { HomeComponent } from "./home-component/home-component";
import { LoginComponent } from "./login-component/login-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
