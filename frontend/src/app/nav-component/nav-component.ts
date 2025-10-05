import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Authservice } from '../authservice';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-component',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn = false;
  userRole: string | null = null;
  isMobile = false;

  guestMenuItems = [
    { name: 'HOME', route: '/', icon: 'home' },
    { name: 'Login', route: '/login', icon: 'login' },
    { name: 'Signup', route: '/signup', icon: 'person_add' },
    { name: 'About us', route: '/About', icon: 'info' }
  ];

  userMenuItems = [
    { name: 'HOME', route: '/', icon: 'home' },
    { name: 'Profile', route: '/profil', icon: 'account_circle' },
    { name: 'About us', route: '/About', icon: 'info' },
    { name: 'Logout', route: '/logout', icon: 'logout' }
  ];

  constructor(
    private router: Router,
    private authservice: Authservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    
    this.authservice.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userRole = user?.role || null;
    });
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isCollapsed = true; // Start collapsed on mobile
    }
  }
  get menuItems() {
    return this.isLoggedIn ? this.userMenuItems : this.guestMenuItems;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string) {
    if (route === '/logout') {
      this.logout();
    } else {
      this.router.navigate([route]);
    }
  }

  logout() {
    this.authservice.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
}