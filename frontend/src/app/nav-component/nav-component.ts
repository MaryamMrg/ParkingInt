import { Component, OnInit } from '@angular/core';
import { CommonModule , } from '@angular/common';
import { Router ,RouterLink} from '@angular/router';
import { Authservice ,User} from '../authservice';
import { Parking, Parkingservice } from '../parkingservice';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav-component',
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule],
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
private parkingService:Parkingservice){
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

  logout() {
    this.authservice.logout();
    // this.snackBar.open('Logged out successfully', 'Close', {duration: 3000});
    this.router.navigate(['/login']);
  }
    get isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }

  get userRole(): string | null {
    return this.authservice.getRole();
  }}
  