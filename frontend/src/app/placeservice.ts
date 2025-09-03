import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum Status {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED', 
  OCCUPIED = 'OCCUPIED',
  BLOCKED = 'BLOCKED'
}

export interface Place{
number: number;
  status: Status;
  placeId: number;
  parkingId: number;
 
}
@Injectable({
  providedIn: 'root'
})
export class Placeservice {
   private apiUrl="http://localhost:8080/place"
  constructor(private http : HttpClient) { }


   getAuthHeader():HttpHeaders{
     const token= localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });
  }

  getAllPlaces():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/all`,{headers:this.getAuthHeader()})
  }
 getPlacesByParkingNAme(name:string):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/placeByName?name=${encodeURIComponent(name)}`,{headers:this.getAuthHeader()})
 }
  addPlace(place:Place) : Observable<Place>{
    return this.http.post<Place>(`${this.apiUrl}/add`,place,{headers:this.getAuthHeader()})
  }

  updatePlace(id:number,place:Place){
    return this.http.put<Place>(`${this.apiUrl}/update/${id}`,place,{headers:this.getAuthHeader()})
  }

  deletPlace(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`,{headers:this.getAuthHeader()})
  }

  getPlacesByParkingId(parkingId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/byParking/${parkingId}`, { 
      headers: this.getAuthHeader() 
    });
  }


}
