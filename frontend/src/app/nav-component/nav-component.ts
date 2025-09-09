import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Authservice, User } from '../authservice';
import { Parkingservice } from '../parkingservice';
import { MatSnackBar } from '@angular/material/snack-bar';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav-component',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,RouterOutlet
  ],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent implements OnInit {
  activeMenuItem: string = 'HOME';
  isMobileMenuOpen = false;
  isMobile = false;
  currentUser: User | null = null;

  // All menu items
  menuItems = [
    { name: 'HOME', route: '/', icon: 'home' },
    { name: 'Login', route: '/login', icon: 'login' },
    { name: 'Signup', route: '/signup', icon: 'person_add' },
    { name: 'About us', route: '/About', icon: 'info' }
  ];

  constructor(
    private router: Router,
    private authservice: Authservice,
    private parkingService: Parkingservice,
    private snackBar: MatSnackBar
  ) {
    this.authservice.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  // Filter menu items based on login status
  get filteredMenuItems() {
    if (this.isLoggedIn) {
      // When logged in, remove Login and Signup items
      return this.menuItems.filter(item => 
        item.name !== 'Login' && item.name !== 'Signup'
      );
    }
    // When not logged in, show all items
    return this.menuItems;
  }

  // Get non-auth menu items (for mobile dropdown when not logged in)
  get nonAuthMenuItems() {
    return this.menuItems.filter(item => 
      item.name !== 'Login' && item.name !== 'Signup'
    );
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  setActiveMenuItem(item: string) {
    this.activeMenuItem = item;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSidenav() {
    // For mobile, toggle the dropdown menu
    if (this.isMobile) {
      this.toggleMobileMenu();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.setActiveMenuItem('Login');
    this.isMobileMenuOpen = false;
  }

  goToRegister() {
    this.router.navigate(['/signup']);
    this.setActiveMenuItem('Signup');
    this.isMobileMenuOpen = false;
  }

  goToProfil() {
    this.router.navigate(['/profil']);
    this.setActiveMenuItem('Profile');
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authservice.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
    this.isMobileMenuOpen = false;
  }

  get isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }

  get userRole(): string | null {
    return this.authservice.getRole();
  }
}