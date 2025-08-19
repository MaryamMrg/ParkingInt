import { Component, OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { Route, Router } from '@angular/router';
import { Parking, Parkingservice } from '../parkingservice';

import { CommonModule } from '@angular/common';
import { Placeservice } from '../placeservice';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboard implements OnInit {
customername : String ='';
errorMessage='';
loading=true;
parkings:Parking[]=[];

  constructor(private authservice : Authservice,private parkingservice : Parkingservice,private placeservice:Placeservice,
     private router : Router)
     { }


  ngOnInit(): void {
    this.loadCustomerData();
    this.loadParkings();
  }

  loadCustomerData() : void{
const user = this.authservice.getCurrentUser();
    this.customername = user?.name || 'Customer';
  }

  loadParkings():void{
    this.errorMessage='';
    this.loading=true;

    this.parkingservice.getAllPArkings().subscribe({
      next : (parkings)=>{
        console.log('parjing recieved :' ,parkings);
        
         parkings.forEach((parking:Parking) => {
        console.log(`Parking: ${parking.p_name}, Capacity: ${parking.capacity}, Available: ${parking.avaible_places}`);
      });
        this.parkings=parkings;
        this.loading=false;
      },
       error:(error)=>{
        console.log('error fetching ads:',error);
        this.loading=false;
      }
    })
  }

   isParkingAvailable(parking: Parking): boolean {
    return (parking.avaible_places|| 0) > 0;
  }
   trackByParkingId(index: number, parking: any): any {
    return parking.parkingId || parking.id || index;
  }

  // Action methods
  viewDetails(parking: Parking): void {
    // Navigate to parking details page
    this.router.navigate(['/places']);
  }

  reserveNow(parking: Parking): void {
    if (this.isParkingAvailable(parking)) {
      // Navigate to reservation page
      this.router.navigate(['/reserve', parking.parking_Id]);
    }
  }
   getAvailabilityPercentage(parking: Parking): number {
    if (!parking.capacity|| parking.capacity === 0) return 0;
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
   logout(): void {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
