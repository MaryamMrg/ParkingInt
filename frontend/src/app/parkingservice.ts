import { T } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface Parking{
 parking_Id?:number;
 p_name: string;
 capacity: number;
 avaible_places: number;
 opening_hours: number


}

@Injectable({
  providedIn: 'root'
})
export class Parkingservice {

  private apiurl="http://localhost:8080/parking";

  constructor(private http : HttpClient) { }

  getAuthHeader():HttpHeaders{
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''});
  }

  getAllPArkings() : Observable<any>{
    return this.http.get<any>(`${this.apiurl}/all`,{headers:this.getAuthHeader()});
  }

  createParking(parking:Parking){
    return this.http.post<Parking>(`${this.apiurl}/add`,parking,{headers:this.getAuthHeader()});
  }

  updatePArking(id :number,parking:Parking){
    return this.http.put<Parking>(`${this.apiurl}/update/${id}`,parking,{headers : this.getAuthHeader()});
  }

  deletParking(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`,{headers:this.getAuthHeader()});
  }
}
