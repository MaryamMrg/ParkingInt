import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  userId?: number;
}
export interface UpdateProfileRequest {
  id: number;
  name: string;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private apiUrl = "http://localhost:8080/user";

  constructor(private http:HttpClient) { }

   getAuthHeader():HttpHeaders{
     const token= localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/all`,{headers:this.getAuthHeader()});
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`,{headers:this.getAuthHeader()});
  }

  updateUser(id: number | undefined, user: UpdateProfileRequest): Observable<any> {
    if (!id) {
      throw new Error('User ID is required');
    }
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, user, { headers: this.getAuthHeader() });
  }
  

  changePassWord(){
    
  }
}
