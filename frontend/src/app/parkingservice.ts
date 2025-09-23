
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';



export interface Parking{
 parkingId?:number;
 name: string;
 capacity: number;
 avaible_places: number;
 opening_hours: number


}

@Injectable({
  providedIn: 'root'
})
export class Parkingservice {
 errorMessage=''
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

searchParkingByName(name: string): Observable<Parking> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Parking>(`${this.apiurl}/searchByName`, { 
        params, 
        headers: this.getAuthHeader() 
    }).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
                // Handle not found case
                this.errorMessage = 'Parking not found';
                return throwError(() => new Error('Parking not found'));
            }
            return throwError(() => error);
        })
    );
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
