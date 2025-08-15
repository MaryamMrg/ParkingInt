import { Component, OnInit } from '@angular/core';
import { Place, Placeservice } from '../placeservice';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
export enum Status {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED', 
  OCCUPIED = 'OCCUPIED',
  BLOCKED = 'BLOCKED'
}



@Component({
  selector: 'app-parkingplace',
  imports: [CommonModule],
  templateUrl: './parkingplace.html',
  styleUrl: './parkingplace.css'
})
export class Parkingplace implements OnInit{

  errorMessage='';
  loading = true;
  places:Place[]=[];

  constructor(private placeservice:Placeservice,private router:Router,private location : Location){}

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

  // Action methods
  viewPlaceDetails(place: Place): void {
    // Navigate to detailed place view
    this.router.navigate(['/place-details', place.number]);
  }

  selectPlace(place: Place): void {
    if (this.canSelectPlace(place)) {
      // Navigate to booking/reservation page with selected place
      this.router.navigate(['/book-place', place.number]);
    }
  }

  goBack(): void {
    this.location.back();
    // Alternative: this.router.navigate(['/dashboard']);
  }

  logout(): void {
    // Assuming you have access to auth service through dependency injection
    // You might need to inject it or handle this differently
    this.router.navigate(['/login']);
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
