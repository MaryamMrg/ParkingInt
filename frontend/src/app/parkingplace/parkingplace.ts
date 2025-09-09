import { Component, OnInit } from '@angular/core';
import { Place, Placeservice } from '../placeservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Booking,Bookingservice } from '../bookingservice';
import { Authservice } from '../authservice';
import { Parking } from '../parkingservice';



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
  parking : Parking={
     parkingId:0,
     name: '',
     capacity: 0,
     avaible_places: 0,
     opening_hours: 0
  }

  //for places
   showPlaces = false;
    selectedParking: Parking | null = null;
    places: Place[] = [];
    placesLoading = false;
    placesErrorMessage = '';
    currentStatus: Status | null = null;



  successMessage: string | null = null;
  parkingName='';
  selectedPlace: Place | null = null;
  showBookingModal: boolean = false;
  bookingInProgress: boolean = false;
  startTime: string = '';
  endTime: string = '';
  bookingError: string = '';
  bookingId?:number;
  price:number=0;

  constructor(private route:ActivatedRoute,private location:Location,
     private placeservice:Placeservice,
     private router:Router,
     private bookingservice : Bookingservice,
     private authservice:Authservice){}

  ngOnInit(): void {
    console.log("hhh")
    this.loadParkingFromRoute();
    this.debugRouteParams();
    this.loadPlacesForParking(this.parking);
    
  }




debugRouteParams(): void {
  this.route.queryParams.subscribe(params => {
    console.log('=== ROUTE DEBUG ===');
    console.log('Raw params:', params);
    Object.keys(params).forEach(key => {
      console.log(`${key}: ${params[key]} (type: ${typeof params[key]})`);
    });
    console.log('=== END DEBUG ===');
  });
}
  // loadPlaces():void{
  //   this.errorMessage='';
  //   this.loading=true;

  //   this.placeservice.getAllPlaces().subscribe({
  //     next : (places)=>{
  //       console.log('places recieved :',places)

  //       this.places=places;
  //       this.loading=false;
  //     },error:(error)=>{
  //       console.log('error fetching places:',error);
  //       this.loading=false;
  //     }
  //   })
  // }

loadParkingFromRoute(): void {
  this.route.queryParams.subscribe(params => {
    console.log('Route params received:', params);
    
    if (params['parking_id'] || params['name']) {
     
      const parkingIdParam = params['parking_id'];
      const parsedParkingId = parkingIdParam ? parseInt(parkingIdParam, 10) : 0;
      
      this.parking = {
        parkingId: isNaN(parsedParkingId) ? 0 : parsedParkingId,
        name: params['name'] || '',
        capacity: parseInt(params['capacity']) || 0,
        avaible_places: parseInt(params['available_places']) || 0,
        opening_hours: parseInt(params['opening_hours']) || 0
      };
      
      this.parkingName = this.parking.name;
      
      console.log('Parking data loaded from route:', this.parking);
      
 
      const parkingId = this.parking.parkingId;
      
      if (parkingId && parkingId > 0) {
        this.loadPlacesForParking(this.parking);
      } else {
        console.warn('Invalid parking ID, trying to load by name instead');
        if (this.parking.name) {
          this.loadPlacesByParkingName();
        } else {
          this.placesErrorMessage = 'Invalid parking data received';
          this.loading = false;
        }
      }
    } else {
      console.error('No parking data in route parameters');
      this.placesErrorMessage = 'No parking data provided';
      this.loading = false;
    }
  });
}




loadPlacesForParking(parking: Parking): void {
  console.log('Loading places for parking:', parking);
  
  if (!parking) {
    this.placesErrorMessage = 'No parking data provided';
    this.loading = false;
    return;
  }

  const parkingId = parking.parkingId;
  const parkingName = parking.name;
  
  console.log('Parking ID:', parkingId, 'Parking Name:', parkingName);
  

  if (!parkingId || parkingId <= 0 || isNaN(parkingId)) {
    console.warn('Invalid parking ID, using name-based loading');
    if (parkingName) {
      this.loadPlacesByParkingName();
      return;
    } else {
      this.placesErrorMessage = 'Invalid parking data - no ID or name available';
      this.loading = false;
      return;
    }
  }

  this.placesLoading = true;
  this.loading = true;
  this.showPlaces = true;
  this.placesErrorMessage = '';
  this.selectedParking = parking;

  
  this.placeservice.getPlacesByParkingId(parkingId).subscribe({
    next: (places) => {
      console.log('Places for parking received:', places);
      this.places = places || [];
      this.placesLoading = false;
      this.loading = false;
    },
    error: (error) => {
      console.error('Error fetching places by ID:', error);
      
      
      if (parkingName) {
        console.log('Fallback: Trying to load by parking name');
        this.loadPlacesByParkingName();
      } else {
        this.placesErrorMessage = 'Failed to load parking places. Please try again.';
        this.placesLoading = false;
        this.loading = false;
      }
    }
  });
}






loadPlacesByParkingName():void{
   this.errorMessage='';
    this.loading=true;

    this.placeservice.getPlacesByParkingNAme(this.parkingName).subscribe({
      next : (places)=>{
        console.log('places of parking selected are : ',places);
        this.places=places;
         this.loading=false;
      },error:(error)=>{
        console.log('error fetching places:',error);
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



// Rename and modify the method to return Date objects
private convertTimeToDate(timeString: string, isEndTime: boolean = false): Date {
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
  return date;  // Return Date object instead of timestamp
}







submitBooking(): void {
  
  if (!this.selectedPlace || !this.startTime || !this.endTime) {
    this.bookingError = 'Please fill all required fields';
    return;
  }

  const startTimestamp = this.convertTimeToDate(this.startTime, false);
  const endTimestamp = this.convertTimeToDate(this.endTime, true);

  if (endTimestamp <= startTimestamp) {
    this.bookingError = 'End time must be after start time';
    return;
  }

  this.bookingInProgress = true;
  this.bookingError = '';

  try {
    const bookingData: Booking = {
      userId: this.getUserId(), 
      parkingId: this.selectedPlace.parkingId,
      placeId: this.selectedPlace.placeId,
      startTime: startTimestamp,
      endTime: endTimestamp,
      
    };

    console.log('Submitting booking:', bookingData);

    this.bookingservice.addBooking(bookingData).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
        alert('Booking created successfully!');
        
        this.closeBookingModal();
        this.bookingInProgress = false;
        this.loadPlacesForParking(this.parking);
      
      },
      error: (error) => {
        console.error('Booking failed - full error:', error);
        
        if (error.error) {
          this.bookingError = error.error.message || 
                             error.error.error || 
                             JSON.stringify(error.error);
        } else {
          this.bookingError = 'Booking failed. Please try again.';
        }
        
        this.bookingInProgress = false;
      }
    });
  } catch (error) {
    this.bookingError = (error as Error).message;
    this.bookingInProgress = false;
  }
}





private getUserId(): number {
  const user = this.authservice.getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  if (!user.userId) {
    throw new Error('User ID not found');
  }
  
  return user.userId; 
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



cancelBooking(bookingId: number): void {
    console.log("cancelBooking called with:", bookingId);
    console.log("typeof bookingId:", typeof bookingId);
    
    if (!bookingId) {
        console.log("No booking ID - function returning early");
        return;
    }
    
    console.log("About to show confirm dialog");
    if (confirm('Are you sure you want to cancel this booking?')) {
        console.log("User confirmed, calling deleteBooking service");
        this.bookingservice.deleteBooking(bookingId).subscribe({
            next: () => {
                console.log('Booking cancelled successfully');
            },
            error: (error) => {
                console.log('Error cancelling booking:', error);
                alert('Failed to cancel booking. Please try again.');
            }
        });
    } else {
        console.log("User cancelled the confirm dialog");
    }
}



}