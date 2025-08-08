import { Component, OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit{

  adminname : String = '';
 constructor(private authservice :Authservice, private router : Router){}


  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData() : void{
    const user = this.authservice.getCurrentUser();
    this.adminname=user?.name|| 'ADMIN'
  }
}
