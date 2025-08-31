import { Component, OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { Route, Router } from '@angular/router';
import { Parking, Parkingservice } from '../parkingservice';
import { Booking, Bookingservice } from '../bookingservice';
import { CommonModule } from '@angular/common';
import { Placeservice } from '../placeservice';
import { Place } from '../placeservice';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboard implements OnInit {
  customername: String = '';
  errorMessage = '';
  loading = true;
  parkings: Parking[] = [];
  
  //  properties for bookings
  myBookings: Booking[] = [];
  bookingsLoading = false;
  bookingsErrorMessage = '';
  showBookings = false;
  currentUserId: number | null = null;
  showPlaces = false;

  constructor(
    private authservice: Authservice,
    private parkingservice: Parkingservice,
    private bookingservice: Bookingservice, 
    private placeservice: Placeservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomerData();
    this.loadParkings();
  }

  loadCustomerData(): void {
    const user = this.authservice.getCurrentUser();
    console.log('Current user from auth service:', user);
    
    this.customername = user?.name || user?.name || user?.email?.split('@')[0] || 'Customer';
this.currentUserId = (user as any)?.userId || user?.id || (user as any)?.user_id || null;    
    console.log('Customer name:', this.customername);
    console.log('Current user ID:', this.currentUserId);
    
    if (!this.currentUserId) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode JWT token to get user info
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Token payload:', payload);
          this.currentUserId = payload.id || payload.userId || payload.sub || null;
          this.customername = payload.name || payload.username || this.customername;
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
    
    console.log('Final user ID:', this.currentUserId);
    console.log('Final customer name:', this.customername);
  }

  loadParkings(): void {
    this.errorMessage = '';
    this.loading = true;

    this.parkingservice.getAllPArkings().subscribe({
      next: (parkings) => {
        console.log('parking received:', parkings);
        
        parkings.forEach((parking: Parking) => {
          console.log(`Parking: ${parking.name}, Capacity: ${parking.capacity}, Available: ${parking.avaible_places}`);
        });
        this.parkings = parkings;
        this.loading = false;
      },
      error: (error) => {
        console.log('error fetching parkings:', error);
        this.errorMessage = 'Failed to load parking locations';
        this.loading = false;
      }
    });
  }


  loadMyBookings(): void {
    if (!this.currentUserId) {
      console.error('No user ID available');
      this.bookingsErrorMessage = 'User authentication required. Please login again.';
      return;
    }

    console.log('Loading bookings for user ID:', this.currentUserId);
    this.bookingsLoading = true;
    this.bookingsErrorMessage = '';

    this.bookingservice.getMyBookings(this.currentUserId).subscribe({
      next: (bookings) => {
        console.log('My bookings received:', bookings);
        this.myBookings = bookings || [];
        this.bookingsLoading = false;
      },
      error: (error) => {
        console.error('Error fetching my bookings:', error);
        
        // More specific error messages
        if (error.status === 401) {
          this.bookingsErrorMessage = 'Authentication expired. Please login again.';
        } else if (error.status === 403) {
          this.bookingsErrorMessage = 'Access denied. Unable to fetch your bookings.';
        } else if (error.status === 404) {
          this.bookingsErrorMessage = 'No bookings found for your account.';
          this.myBookings = [];
        } else {
          this.bookingsErrorMessage = 'Failed to load your bookings. Please try again.';
        }
        
        this.bookingsLoading = false;
      }
    });
  }

  
  toggleBookingsView(): void {
    this.showBookings = !this.showBookings;
    if (this.showBookings) {
      //  load bookings when switching to bookings view
      if (!this.currentUserId) {
        // reload user data first
        this.loadCustomerData();
      }
      
      if (this.currentUserId) {
        this.loadMyBookings();
      } else {
        this.bookingsErrorMessage = 'Please login to view your bookings';
      }
    }
  }

  // Format date helper
  formatDateTime(timestamp: number): string {
    if (!timestamp) return 'Not specified';
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  // Get booking status
  getBookingStatus(booking: Booking): string {
    const now = Date.now();
    const startTime = booking.startTime;
    const endTime = booking.endTime;

    if (now < startTime) {
      return 'Upcoming';
    } else if (now >= startTime && now <= endTime) {
      return 'Active';
    } else {
      return 'Completed';
    }
  }

  // Get status class for styling
  getBookingStatusClass(booking: Booking): string {
    const status = this.getBookingStatus(booking);
    switch (status) {
      case 'Upcoming': return 'status-upcoming';
      case 'Active': return 'status-active';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  }

  // Cancel booking method
  cancelBooking(booking: Booking): void {
    if (!booking.id) return;
    
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingservice.deleteBooking(booking.id).subscribe({
        next: () => {
          console.log('Booking cancelled successfully');
          this.loadMyBookings(); 
        },
        error: (error) => {
          console.log('Error cancelling booking:', error);
          alert('Failed to cancel booking. Please try again.');
        }
      });
    }
  }

  
  isParkingAvailable(parking: Parking): boolean {
    return (parking.avaible_places || 0) > 0;
  }

  trackByParkingId(index: number, parking: any): any {
    return parking.parkingId || parking.id || index;
  }

  trackByBookingId(index: number, booking: Booking): any {
    return booking.id || index;
  }

viewDetails(parking: Parking): void {
  console.log('Navigating to parking place with:', parking);
  this.showBookings = false;
  this.showPlaces = false;
  
  // Navigate with consistent parameter names
  this.router.navigate(['/places'], {
    queryParams: {
      parking_id: parking.parkingId,  
      name: parking.name,
      capacity: parking.capacity,
      available_places: parking.avaible_places,
      opening_hours: parking.opening_hours
    }
  });
}

  reserveNow(parking: Parking): void {
    if (this.isParkingAvailable(parking)) {
      this.router.navigate(['/reserve', parking.parkingId]);
    }
  }

  getAvailabilityPercentage(parking: Parking): number {
    if (!parking.capacity || parking.capacity === 0) return 0;
    const availableSpaces = parking.avaible_places || 0;
    return (availableSpaces / parking.capacity) * 100;
  }

  getStatusClass(parking: Parking): string {
    const availableSpaces = parking.avaible_places || 0;
    if (availableSpaces > 10) return 'status-available';
    if (availableSpaces > 0) return 'status-limited';
    return 'status-full';
  }

  getStatusText(parking: Parking): string {
    const availableSpaces = parking.avaible_places || 0;
    if (availableSpaces > 10) return 'Available';
    if (availableSpaces > 0) return 'Limited';
    return 'Full';
  }

  getReservedCount(parking: any): number {
    return parking.reserved_places || 0;
  }

  getOccupiedCount(parking: any): number {
    return parking.occupied_places || 0;
  }

  // Debug methods 
  getTokenStatus(): string {
    const token = localStorage.getItem('token');
    return token ? 'Yes' : 'No';
  }

  getAuthUserInfo(): string {
    const user = this.authservice.getCurrentUser();
    return JSON.stringify(user);
  }

  debugAuthInfo(): void {
    console.log('=== DEBUG AUTH INFO ===');
    console.log('1. Auth Service User:', this.authservice.getCurrentUser());
    console.log('2. LocalStorage Token:', localStorage.getItem('token'));
    console.log('3. Current User ID:', this.currentUserId);
    console.log('4. Customer Name:', this.customername);
    
    // T decode token 
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log('5. Token Payload:', payload);
        }
      } catch (error) {
        console.log('5. Token decode error:', error);
      }
    }
    
    // Check all localStorage items
    console.log('6. All localStorage items:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        console.log(`   ${key}:`, localStorage.getItem(key));
      }
    }
    console.log('=== END DEBUG INFO ===');
  }
}