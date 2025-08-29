import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Booking{
  id?:number,
  userId?: number,
  parkingId: number,
  placeId: number,
  startTime: number,
  endTime: number
}
@Injectable({
  providedIn: 'root'
})
export class Bookingservice {


  private apiUrl = "http://localhost:8080/booking"
  constructor(private http : HttpClient) { }

  
 private getAuthHeader():HttpHeaders{
  const token= localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });
 }

 getAllBookings():Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/all`,{headers : this.getAuthHeader()});
 }

 getMyBookings(userId:number):Observable<Booking[]>{
  return this.http.get<Booking[]>(`${this.apiUrl}/myBookings/${userId}`,{headers:this.getAuthHeader()})

 }
 addBooking(booking: Booking):Observable<Booking>{
  return this.http.post<Booking>(this.apiUrl,booking,{headers:this.getAuthHeader()});

 }

 updateBooking(id : number,booking : Booking):Observable<Booking>{
  return this.http.put<Booking>(`${this.apiUrl}/update/${id}`,booking,{headers : this.getAuthHeader()})
 }

 deleteBooking(id: number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/${id}`,{headers : this.getAuthHeader()})
 }
}
