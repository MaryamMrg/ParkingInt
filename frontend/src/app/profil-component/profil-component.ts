import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice, User } from '../authservice';
import { RouterLink } from '@angular/router';
export interface UpdateProfileRequest {
  name: string;
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profil-component',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './profil-component.html',
  styleUrl: './profil-component.css'
})
export class ProfilComponent implements OnInit{

  currentUser: User | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

   // Edit profile form
  isEditingProfile = false;
  profileForm: UpdateProfileRequest = {
    name: '',
    email: ''
  };

  // Change password form
  isChangingPassword = false;
  passwordForm: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Profile stats for customers
  profileStats = {
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    memberSince: ''
  };

  constructor(private authservice :Authservice, private router:Router){}
  ngOnInit(): void {
    this.loadUserProfile();
  }


  
  loadUserProfile(): void {
    this.currentUser = this.authservice.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Initialize form with current user data
    this.profileForm = {
      name: this.currentUser.name,
      email: this.currentUser.email
    };

    // Calculate member since date (you might want to add this to your User interface)
    this.profileStats.memberSince = 'January 2024'; // Placeholder - you should get this from backend

    // Load additional profile stats if needed
    this.loadProfileStats();
  }


   loadProfileStats(): void {
    // This would typically call a service to get user statistics
    // For now, we'll set placeholder values
    if (this.currentUser?.role === 'USER') {
      // You could call bookingService.getMyBookings() here to calculate real stats
      this.profileStats = {
        ...this.profileStats,
        totalBookings: 15,
        activeBookings: 2,
        completedBookings: 13
      };
    }
  }

  startEditProfile(): void {
    this.isEditingProfile = true;
    this.clearMessages();
  }

  cancelEditProfile(): void {
    this.isEditingProfile = false;
    // Reset form to original values
    if (this.currentUser) {
      this.profileForm = {
        name: this.currentUser.name,
        email: this.currentUser.email
      };
    }
    this.clearMessages();
  }

  updateProfile(): void {
    if (!this.validateProfileForm()) {
      return;
    }

    this.loading = true;
    this.clearMessages();

    // Note: You'll need to implement this endpoint in your backend and service
    // For now, this is a placeholder implementation
    console.log('Updating profile with:', this.profileForm);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Update local user data
        if (this.currentUser) {
          this.currentUser.name = this.profileForm.name;
          this.currentUser.email = this.profileForm.email;
          
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(this.currentUser));
          
          // Update auth service
          this.authservice['currentUserSubject'].next(this.currentUser);
        }

        this.successMessage = 'Profile updated successfully!';
        this.isEditingProfile = false;
        this.loading = false;
      } catch (error) {
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.loading = false;
      }
    }, 1000);

    // TODO: Replace with actual HTTP call
    // this.authService.updateProfile(this.profileForm).subscribe({
    //   next: (response) => {
    //     this.currentUser = response.user;
    //     this.successMessage = 'Profile updated successfully!';
    //     this.isEditingProfile = false;
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     this.errorMessage = 'Failed to update profile. Please try again.';
    //     this.loading = false;
    //   }
    // });
  }

  startChangePassword(): void {
    this.isChangingPassword = true;
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.clearMessages();
  }

  cancelChangePassword(): void {
    this.isChangingPassword = false;
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.clearMessages();
  }

  changePassword(): void {
    if (!this.validatePasswordForm()) {
      return;
    }

    this.loading = true;
    this.clearMessages();

    // Note: You'll need to implement this endpoint in your backend and service
    console.log('Changing password...');
    
    // Simulate API call
    setTimeout(() => {
      try {
        this.successMessage = 'Password changed successfully!';
        this.isChangingPassword = false;
        this.loading = false;
        
        // Clear password form
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
      } catch (error) {
        this.errorMessage = 'Failed to change password. Please try again.';
        this.loading = false;
      }
    }, 1000);

    // TODO: Replace with actual HTTP call
    // this.authService.changePassword(this.passwordForm).subscribe({
    //   next: () => {
    //     this.successMessage = 'Password changed successfully!';
    //     this.isChangingPassword = false;
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     this.errorMessage = 'Failed to change password. Please try again.';
    //     this.loading = false;
    //   }
    // });
  }

  validateProfileForm(): boolean {
    if (!this.profileForm.name.trim()) {
      this.errorMessage = 'Name is required';
      return false;
    }

    if (!this.profileForm.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.profileForm.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    return true;
  }

  validatePasswordForm(): boolean {
    if (!this.passwordForm.currentPassword) {
      this.errorMessage = 'Current password is required';
      return false;
    }

    if (!this.passwordForm.newPassword) {
      this.errorMessage = 'New password is required';
      return false;
    }

    if (this.passwordForm.newPassword.length < 6) {
      this.errorMessage = 'New password must be at least 6 characters long';
      return false;
    }

    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match';
      return false;
    }

    if (this.passwordForm.currentPassword === this.passwordForm.newPassword) {
      this.errorMessage = 'New password must be different from current password';
      return false;
    }

    return true;
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        this.loading = true;
        
        // TODO: Implement account deletion
        console.log('Deleting account...');
        
        setTimeout(() => {
          this.authservice.logout();
          this.router.navigate(['/login']);
        }, 1000);
      }
    }
  }

  navigateToBookings(): void {
    if (this.currentUser?.role === 'CUSTOMER') {
      this.router.navigate(['/customer-Dash']);
    } else if (this.currentUser?.role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    }
  }

  
  logout(): void {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  getRoleBadgeClass(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case 'ADMIN':
        return 'badge-admin';
      case 'USER':
        return 'badge-user';
      default:
        return 'badge-default';
    }
  }

  getInitials(): string {
    if (!this.currentUser?.name) return 'U';
    
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return this.currentUser.name.substring(0, 2).toUpperCase();
  }
}
