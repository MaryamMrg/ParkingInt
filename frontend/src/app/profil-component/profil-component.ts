import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice, User } from '../authservice';
import { Userservice } from '../userservice';
import { MatSnackBar } from '@angular/material/snack-bar';



export interface UpdateProfileRequest {
  id: number;
  name: string;
  role: string;
  email: string;
  userId?: number;
}


export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}


@Component({
  selector: 'app-profil-component',
  imports: [CommonModule,FormsModule],
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
    id: 0,
    name: '',
    role:'',
    email:''
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

  constructor(private authservice :Authservice,
     private router:Router,
     private userservice:Userservice,
    private snackBar:MatSnackBar){}



  ngOnInit(): void {
    this.loadUserProfile();
  }


  
  loadUserProfile(): void {
    this.currentUser = this.authservice.getCurrentUser();
    console.log("user " ,this.currentUser);
    console.log("user id :", this.currentUser?.id)
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Initialize form with current user data
    this.profileForm = {
      name: this.currentUser.name,
      email: this.currentUser.email,
       id: this.currentUser.id,
       role: this.currentUser.role
 
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
        email: this.currentUser.email,
         id: this.currentUser.id,
       role: this.currentUser.role
      };
    }
    this.clearMessages();
  }




 updateProfile(): void {
  if (!this.validateProfileForm()) {
    return;
  }

    const userId = this.currentUser?.id || this.currentUser?.userId;

  if (!userId) {
    this.errorMessage = 'User ID not found';
    return;
  }

  this.loading = true;
  this.clearMessages();
  
  this.userservice.updateUser(userId, this.profileForm).subscribe({
    next: (response) => {
      // // Option 1: If your backend returns the updated user directly
      // if (response.id ) {
      //   this.currentUser = response;
      // } 
      // // Option 2: If your backend returns a response object with user property
      // else if (response.user) {
      //   this.currentUser = response.user;
      // }
      // // Option 3: If backend just returns success, update locally
      // else {
        if (this.currentUser) {
          this.currentUser.name = this.profileForm.name;
          this.currentUser.email = this.profileForm.email;
          this.currentUser.role = this.profileForm.role;
        }
      

      if (this.currentUser) {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        // Update auth service current user
        this.authservice.setCurrentUser(this.currentUser); 
      }

      this.successMessage = 'Profile updated successfully!';
      this.snackBar.open('profile updated successfully', 'Close', {duration: 3000});

      this.isEditingProfile = false;
      this.loading = false;
    },
    error: (error) => {
      console.error('Update profile error:', error);
      this.errorMessage = error.error?.message || 'Failed to update profile. Please try again.';
      this.loading = false;
    }
  });
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

    console.log('Changing password...');
    
    setTimeout(() => {
      try {
        this.successMessage = 'Password changed successfully!';
        this.isChangingPassword = false;
        this.loading = false;
        
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




  deleteAccount(userId:number): void {
    userId!=this.currentUser?.userId
    console.log(userId);
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        this.loading = true;
        this.userservice.deleteUser(userId).subscribe({
                      next: () => {
                console.log(' account deleted successfully');
                this.snackBar.open('account deleted successfully', 'Close', {duration: 3000});

            },
            error: (error) => {
                console.log('Error deleting account:', error);
                alert('Failed to delete account. Please try again.');
            }
        })
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
    this.snackBar.open('Logout successfully', 'Close', {duration: 3000});

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
