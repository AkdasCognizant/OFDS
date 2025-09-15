import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/customers';
 
  constructor(private http: HttpClient) {}
 
  // Insert a new customer
  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
 
  // Get all customers
  getCustomers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateCustomer(id: number, user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${id}`, user);
}

}