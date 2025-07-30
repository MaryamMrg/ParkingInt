import { Component } from '@angular/core';
import { CommonModule , } from '@angular/common';

@Component({
  selector: 'app-nav-component',
  imports: [CommonModule],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent {
 searchTerm: string = '';
  activeMenuItem: string = 'HOME';

  menuItems = [
    { name: 'HOME', route: '/home' },
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
  }}
  