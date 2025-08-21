import { Component, OnInit } from '@angular/core';
import { Place, Placeservice } from '../placeservice';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Booking,Bookingservice } from '../bookingservice';
import { Authservice } from '../authservice';
export enum Status {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED', 
  OCCUPIED = 'OCCUPIED',
  BLOCKED = 'BLOCKED'
}



@Component({
  selector: 'app-parkingplace',
  imports: [CommonModule,FormsModule],
  templateUrl: './parkingplace.html',
  styleUrl: './parkingplace.css'
})
export class Parkingplace implements OnInit{
  
  errorMessage='';
  loading = true;
  places:Place[]=[];

  selectedPlace: Place | null = null;
  showBookingModal: boolean = false;
  bookingInProgress: boolean = false;
  startTime: string = '';
  endTime: string = '';
  bookingError: string = '';


  constructor(private placeservice:Placeservice,private router:Router,private location : Location,private booking : Bookingservice,private authservice:Authservice){}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces():void{
    this.errorMessage='';
    this.loading=true;

    this.placeservice.getAllPlaces().subscribe({
      next : (places)=>{
        console.log('places recieved :',places)

        this.places=places;
        this.loading=false;
      },error:(error)=>{
        console.log('error fetching ads:',error);
        this.loading=false;
      }
    })
  }
  

    trackByPlaceNumber(index: number, place: Place): any {
    return place.number;
  }

  getPlaceIcon(status: Status): string {
    switch (status) {
      case Status.AVAILABLE:
        return '🟢';
      case Status.RESERVED:
        return '🟡';
      case Status.OCCUPIED:
        return '🔴';
      case Status.BLOCKED:
        return '🚫';
      default:
        return '🅿️';
    }
  }

  getPlaceIconClass(status: Status): string {
    return `place-icon-${status.toLowerCase()}`;
  }

  getStatusClass(status: Status): string {
    switch (status) {
      case Status.AVAILABLE:
        return 'status-available';
      case Status.RESERVED:
        return 'status-reserved';
      case Status.OCCUPIED:
        return 'status-occupied';
      case Status.BLOCKED:
        return 'status-blocked';
      default:
        return 'status-unknown';
    }
  }

  getStatusText(status: Status): string {
    switch (status) {
      case Status.AVAILABLE:
        return 'Available';
      case Status.RESERVED:
        return 'Reserved';
      case Status.OCCUPIED:
        return 'Occupied';
      case Status.BLOCKED:
        return 'Blocked';
      default:
        return 'Unknown';
    }
  }

  getStatusTextClass(status: Status): string {
    switch (status) {
      case Status.AVAILABLE:
        return 'text-success';
      case Status.RESERVED:
        return 'text-warning';
      case Status.OCCUPIED:
        return 'text-danger';
      case Status.BLOCKED:
        return 'text-muted';
      default:
        return 'text-secondary';
    }
  }

  canSelectPlace(place: Place): boolean {
    return  place.status === Status.AVAILABLE;
  }

  getActionButtonText(status: Status): string {
   
    
    switch (status) {
      case Status.AVAILABLE:
        return 'Select Place';
      case Status.RESERVED:
        return 'Reserved';
      case Status.OCCUPIED:
        return 'Occupied';
      case Status.BLOCKED:
        return 'Blocked';
      default:
        return 'Unavailable';
    }
  }


  viewPlaceDetails(place: Place): void {
    // Navigate to detailed place view
    this.router.navigate(['/place-details', place.number]);
  }
selectPlace(place: Place): void {
  console.log('selectPlace called with:', place);
  if (this.canSelectPlace(place)) {
    console.log('Place is available, opening modal');
    this.selectedPlace = place;
    this.showBookingModal = true;
    this.bookingError = '';
    this.checkModalVisibility();
    // TEMPORARY: Force same-day times for testing
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes later
    
    this.startTime = this.formatTime(now);
    this.endTime = this.formatTime(thirtyMinutesLater);
    
    console.log('Current time:', now.toTimeString());
    console.log('Thirty minutes later:', thirtyMinutesLater.toTimeString());
    console.log('Default times set:', this.startTime, this.endTime);
  } else {
    console.log('Place is not available. Status:', place.status);
  }
}
checkModalVisibility() {
  setTimeout(() => {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      console.log('Modal found in DOM');
      console.log('Modal display style:', getComputedStyle(modal).display);
      console.log('Modal visibility style:', getComputedStyle(modal).visibility);
      console.log('Modal opacity:', getComputedStyle(modal).opacity);
    } else {
      console.log('Modal NOT found in DOM');
    }
  }, 100);
}

private formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

private convertTimeToTimestamp(timeString: string, isEndTime: boolean = false): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  
  // For end times that are earlier than current hour, assume next day
  if (isEndTime) {
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    
    // If end time is earlier than current time, assume it's for next day
    if (hours < currentHour || (hours === currentHour && minutes <= currentMinute)) {
      date.setDate(date.getDate() + 1);
    }
  }
  
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
}
submitBooking(): void {
  if (!this.selectedPlace || !this.startTime || !this.endTime) {
    this.bookingError = 'Please fill all required fields';
    return;
  }

  const startTimestamp = this.convertTimeToTimestamp(this.startTime, false);
  const endTimestamp = this.convertTimeToTimestamp(this.endTime, true);

  if (endTimestamp <= startTimestamp) {
    this.bookingError = 'End time must be after start time';
    return;
  }

  this.bookingInProgress = true;
  this.bookingError = '';

  const bookingData: Booking = {
    userId: this.getUserId(), 
    parkingId: this.selectedPlace.parkingId,
    placeId: this.selectedPlace.placeId,
    startTime: startTimestamp,
    endTime: endTimestamp
  };

  console.log('Submitting booking:', bookingData);

  // ERROR HANDLING GOES RIGHT HERE IN THE SUBSCRIBE CALL
  this.booking.addBooking(bookingData).subscribe({
    next: (response) => {
      console.log('Booking successful:', response);
      alert('Booking created successfully!');
      this.closeBookingModal();
      this.bookingInProgress = false;
      this.loadPlaces();
    },
    error: (error) => {
      // === PUT ERROR HANDLING CODE HERE ===
      console.error('Booking failed - full error:', error);
      console.error('Error response body:', error.error);
      console.error('Error status:', error.status);
      
      // Show the actual error message from backend
      if (error.error) {
        console.error('Backend error message:', error.error);
        // Try to extract the error message in different formats
        this.bookingError = error.error.message || 
                           error.error.error || 
                           JSON.stringify(error.error);
      } else {
        this.bookingError = 'Booking failed. Please try again.';
      }
      
      this.bookingInProgress = false;
      // === END ERROR HANDLING CODE ===
    }
  });
}
private getUserId(): number {
  const user = this.authservice.getCurrentUser();
  console.log('Current user:', user);
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  // Map email to numeric ID - you need to get the actual user ID from your backend
  const emailToIdMap: {[email: string]: number} = {
    'azoz@gmail.com': 1,
    'khadija@gmail.com': 2
    // Add other users as needed
  };
  
  if (user.email && emailToIdMap[user.email]) {
    return emailToIdMap[user.email];
  }
  
  throw new Error('User ID not found for email: ' + user.email);
}
  closeBookingModal(): void {
    this.showBookingModal = false;
    this.selectedPlace = null;
    this.startTime = '';
    this.endTime = '';
    this.bookingError = '';
    this.bookingInProgress = false;
  }
  



  goBack(): void {
    this.location.back();
  }


  // Optional filter/sort methods
  toggleFilters(): void {
    // Implement filter functionality
    console.log('Toggle filters');
  }

  toggleSort(): void {
    // Implement sort functionality
    console.log('Toggle sort');
  }
}
