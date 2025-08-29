import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User,Authservice } from '../authservice';
import { Bookingservice,Booking } from '../bookingservice';
import { Placeservice , Place,Status } from '../placeservice';
import { Router } from '@angular/router';
import { Userservice } from '../userservice';

import { Parking,Parkingservice } from '../parkingservice';
interface DashboardStats {
  totalBookings: number;
  totalPlaces: number;
   totalParkings:number;
  availablePlaces: number;
  occupiedPlaces: number;
  reservedPlaces: number;
  blockedPlaces: number;
  totalUsers: number;
}
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit{

  activeTab = 'overview';
  currentUser: User | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showAddPlaceForm = false;
  showAddParkingForm=false;
users:User[]=[];
  // Data
  bookings: Booking[] = [];
  places: Place[] = [];
   parkings: Parking[] = [];
  stats: DashboardStats = {
    totalBookings: 0,
    totalPlaces: 0,
    totalParkings:0,
    availablePlaces: 0,
    occupiedPlaces: 0,
    reservedPlaces: 0,
    blockedPlaces: 0,
    totalUsers: 0
  };

  // Form data
  newPlace: Place = {
    placeId:0,
    number: 0,
    status: Status.AVAILABLE,
    parkingId: 0
    
  };

  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'places', label: 'Places' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'users', label: 'users' },
    { id: 'Parkings', label: 'Parkings' }
  ];

  statusOptions = Object.values(Status);

  constructor(private userservice:Userservice,
    private bookingService: Bookingservice,
    private placeService: Placeservice,
    private authService: Authservice,private parkingservice:Parkingservice
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') {
      // Redirect to login or show error
      this.errorMessage = 'Access denied. Admin privileges required.';
      return;
    }
    this.loadInitialData();
    this.loadUsers();
    this.loadParkings();
  }

  async loadInitialData(): Promise<void> {
    this.loading = true;
    try {
      await Promise.all([
        this.loadBookings(),
        this.loadPlaces()
      ]);
      this.calculateStats();
    } catch (error) {
      this.errorMessage = 'Failed to load dashboard data';
    } finally {
      this.loading = false;
    }
  }
 

  loadUsers():void{

    this.errorMessage='';
    this.loading=true;
   this.userservice.getAllUsers().subscribe({
    next : (users)=>{
      console.log('recieved users :',users);

      this.users=users;
      this.loading=false;
    }
   })
  }
   loadParkings(): void {
    this.errorMessage = '';
    this.loading = true;

    this.parkingservice.getAllPArkings().subscribe({
      next: (parkings) => {
        console.log('parking received:', parkings);
        
        parkings.forEach((parking: Parking) => {
          console.log(`Parking: ${parking.p_name}, Capacity: ${parking.capacity}, Available: ${parking.avaible_places}`);
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


  async loadBookings(): Promise<void> {
    try {
      this.bookingService.getAllBookings().subscribe({
        next: (data) => {
          this.bookings = data || [];
          this.calculateStats();
        },
        error: (error) => {
          console.error('Error loading bookings:', error);
          this.errorMessage = 'Failed to load bookings';
        }
      });
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  }

  async loadPlaces(): Promise<void> {
    try {
      this.placeService.getAllPlaces().subscribe({
        next: (data) => {
          this.places = data || [];
          this.calculateStats();
        },
        error: (error) => {
          console.error('Error loading places:', error);
          this.errorMessage = 'Failed to load places';
        }
      });
    } catch (error) {
      console.error('Error loading places:', error);
    }
  }

  calculateStats(): void {
    this.stats = {
      totalBookings: this.bookings.length,
      totalPlaces: this.places.length,
      availablePlaces: this.places.filter(p => p.status === Status.AVAILABLE).length,
      occupiedPlaces: this.places.filter(p => p.status === Status.OCCUPIED).length,
      reservedPlaces: this.places.filter(p => p.status === Status.RESERVED).length,
      blockedPlaces: this.places.filter(p => p.status === Status.BLOCKED).length,
      totalUsers: this.users.length,
      totalParkings:this.parkings.length
    };
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  refreshData(): void {
    this.loadInitialData();
    this.successMessage = 'Data refreshed successfully';
  }

  addPlace(): void {

   // Clear previous messages
  this.successMessage = '';
  this.errorMessage = '';

  // Validate form data
  if (!this.newPlace.number || this.newPlace.number <= 0) {
    this.errorMessage = 'Please enter a valid place number';
    return;
  }

  if (!this.newPlace.parkingId || this.newPlace.parkingId <= 0) {
    this.errorMessage = 'Please enter a valid parking ID';
    return;
  }

  if (!this.newPlace.status) {
    this.errorMessage = 'Please select a status';
    return;
  }

  this.loading = true;

 
  const placeToAdd: Place = {
    placeId: 0, 
    number: this.newPlace.number,
    status: this.newPlace.status,
    parkingId: this.newPlace.parkingId
  };

  this.placeService.addPlace(placeToAdd).subscribe({
    next: (response) => {
      console.log('Place created successfully:', response);
      this.successMessage = 'Place created successfully!';
      this.showAddPlaceForm = false;
      this.resetNewPlace();
      this.loadPlaces(); 
      this.loading = false;
    },
    error: (error) => {
      console.error('Error adding place:', error);
      this.errorMessage = error.error?.message || 'Failed to add place';
      this.loading = false;
    }
  });
    // if (this.newPlace.number && this.newPlace.parkingId && this.newPlace.status) {
    //   this.placeService.addPlace(this.newPlace as Place).subscribe({
    //     next: () => {
    //       this.successMessage = 'Place added successfully';
    //       this.loadPlaces();
    //       this.showAddPlaceForm = false;
    //       this.resetNewPlace();
    //     },
    //     error: (error) => {
    //       console.error('Error adding place:', error);
    //       this.errorMessage = 'Failed to add place';
    //     }
    //   });
    // }
  }

  editPlace(place: Place): void {
    console.log('Edit place:', place);
  }

  deletePlace(id: number): void {
    if (confirm('Are you sure you want to delete this place?')) {
      this.placeService.deletPlace(id).subscribe({
        next: () => {
          this.successMessage = 'Place deleted successfully';
          this.loadPlaces();
        },
        error: (error) => {
          console.error('Error deleting place:', error);
          this.errorMessage = 'Failed to delete place';
        }
      });
    }
  }

  editBooking(booking: Booking): void {
    console.log('Edit booking:', booking);
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.successMessage = 'Booking deleted successfully';
          this.loadBookings();
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
          this.errorMessage = 'Failed to delete booking';
        }
      });
    }
  }

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  getOccupancyRate(): number {
    if (this.stats.totalPlaces === 0) return 0;
    return Math.round((this.stats.occupiedPlaces / this.stats.totalPlaces) * 100);
  }

  getAvailabilityRate(): number {
    if (this.stats.totalPlaces === 0) return 0;
    return Math.round((this.stats.availablePlaces / this.stats.totalPlaces) * 100);
  }

  resetNewPlace(): void {
    this.newPlace = {
      placeId:0,
      number: 0,
      status: Status.AVAILABLE,
      parkingId: 0
    };
  }

  logout(): void {
    this.authService.logout();
  }

  trackByBookingId(index: number, booking: any): any {
    return booking.id || index;
  }

  trackByPlaceId(index: number, place: Place): any {
    return place.placeId;
  }
  trackByUserId(index:number,user:User):any{
    return user.id;
  }
   trackByParkingId(index:number,parking:Parking):any{
    return parking.parking_Id;
  }
}
