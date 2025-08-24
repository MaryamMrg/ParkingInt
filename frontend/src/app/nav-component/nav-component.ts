import { Component, OnInit } from '@angular/core';
import { CommonModule , } from '@angular/common';
import { Router ,RouterLink} from '@angular/router';
import { Authservice ,User} from '../authservice';
@Component({
  selector: 'app-nav-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent implements OnInit{
 searchTerm: string = '';
  activeMenuItem: string = 'HOME';
   isMenuOpen = false;
  isMobile = false;
  isMenuCollapsed = true;
  currentUser:User|null=null;


constructor(private router :Router,
  private authservice:Authservice){
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
 onSearchInput(event: any) {
    this.searchTerm = event.target.value;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Searching for:', this.searchTerm);
      // Implement your search logic here
    }
  }

  setActiveMenuItem(item: string) {
    this.activeMenuItem = item;
  }

goToLogin(){
this.router.navigate(['/login']);
}



goToRegister(){
  this.router.navigate(['/signup'])
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
  