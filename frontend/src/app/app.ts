import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav-component/nav-component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
   isCollapsed = false;
     isMobile = false;
      toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
