import { Component, OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  imports: [],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboard implements OnInit {
customername : String ='';
  constructor(private authservice : Authservice,
     private router : Router)
     { }


  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData() : void{
const user = this.authservice.getCurrentUser();
    this.customername = user?.name || 'Customer';
  }
}
