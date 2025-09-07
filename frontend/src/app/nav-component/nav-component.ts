import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Authservice, User } from '../authservice';
import { Parkingservice } from '../parkingservice';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-nav-component',
  imports: [CommonModule,RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
    ,MatIconModule,
    MatMenuModule,MatToolbarModule,MatSidenav,MatSidenavModule,MatListModule,MatDividerModule
  ],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent implements OnInit{

  activeMenuItem: string = 'HOME';
  isMenuOpen = false;
  isMobile = false;
  isMenuCollapsed = true;
  currentUser:User|null=null;

 


constructor(private router :Router,
  private authservice:Authservice,
  private parkingService:Parkingservice,
  private snackBar:MatSnackBar){
  this.authservice.currentUser$.subscribe(user=>{
    this.currentUser=user;
  });
}
ngOnInit(): void {
  
}


  menuItems = [
    { name: 'HOME', route: '' },
    { name: 'Login', route: '/login' },
    { name: 'Signup', route: '/signup' },
    { name: 'About us', route: '/about' }
  ];


 setActiveMenuItem(item: string) {
    this.activeMenuItem = item;
  }




goToLogin(){
this.router.navigate(['/login']);
}



goToRegister(){
  this.router.navigate(['/signup'])
}




goToProfil(){
  this.router.navigate(['/profil'])
}




getIconForMenuItem(name: string): string {
  switch(name) {
    case 'HOME': return 'home';
    case 'Login': return 'login';
    case 'Signup': return 'person_add';
    case 'About us': return 'info';
    default: return 'help';
  }
}

logout() {
    this.authservice.logout();
    this.snackBar.open('Logged out successfully', 'Close', {duration: 3000});
    this.router.navigate(['/login']);
  }
    get isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }

  get userRole(): string | null {
    return this.authservice.getRole();
  }
}
  