import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule , } from '@angular/common';
import { Router ,RouterLink} from '@angular/router';
import { Authservice ,User} from '../authservice';
import {  Parkingservice } from '../parkingservice';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-component',
  imports: [CommonModule,RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
    ,MatIconModule,
    MatMenuModule,MatToolbarModule,  MatSidenavModule,
    MatListModule,
    MatDividerModule
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

   private destroy$ = new Subject<void>();


constructor(private router :Router,
  private authservice:Authservice,
  private parkingService:Parkingservice,
  private snackBar:MatSnackBar){
  this.authservice.currentUser$.subscribe(user=>{
    this.currentUser=user;
  });
}
ngOnInit(): void {
    this.checkScreenSize();
    this.setActiveMenuItemFromRoute();
    
    // Listen to route changes to update active menu item
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setActiveMenuItemFromRoute();
      });
}
 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

   @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  
  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992; // Bootstrap lg breakpoint
    if (!this.isMobile) {
      this.isMenuOpen = false; // Close mobile menu when switching to desktop
    }
  }

  private setActiveMenuItemFromRoute(): void {
    const currentRoute = this.router.url;
    
    // Check if current route matches any menu item
    const matchingItem = this.menuItems.find(item => 
      item.route === currentRoute || 
      (currentRoute === '/' && item.route === '') ||
      (currentRoute.startsWith(item.route) && item.route !== '/')
    );
    
    if (matchingItem) {
      this.activeMenuItem = matchingItem.name;
    } else if (currentRoute.includes('/admin-dashboard')) {
      this.activeMenuItem = 'Admin Dashboard';
    } else if (currentRoute.includes('/login')) {
      this.activeMenuItem = 'Login';
    } else if (currentRoute.includes('/signup')) {
      this.activeMenuItem = 'Signup';
    }
  }

  setActiveMenuItem(item: string): void {
    this.activeMenuItem = item;
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMenuOpen = false;
  }

  onSidenavToggle(opened: boolean): void {
    this.isMenuOpen = opened;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
    this.setActiveMenuItem('Login');
  }

  goToRegister(): void {
    this.router.navigate(['/signup']);
    this.setActiveMenuItem('Signup');
  }

  goToProfil(): void {
    this.router.navigate(['/profil']);
    this.setActiveMenuItem('Profile');
  }

  goToAdminDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
    this.setActiveMenuItem('Admin Dashboard');
  }


 
  menuItems = [
    { name: 'HOME', route: '/', icon: 'home' },
    { name: 'Login', route: '/login',icon:'login' },
    { name: 'Signup', route: '/signup' },
    { name: 'About us', route: '/about', icon: 'info' }
  ];


 




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
  