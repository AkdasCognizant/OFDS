import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { restaurantUsers } from './restaurantUsers';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        this.currentUserSubject.next(JSON.parse(saved));
      } catch {}
    }
  }

  login(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Returns numeric userID, or throws if not logged in */
  getUserId(): number {
    const u = this.currentUserSubject.value;
    if (!u) {
      throw new Error('User not authenticated');
    }
    return u.userID;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }





  // for restaurant login 
  private restisLoggedIn = false;
  private currentRestUser: restaurantUsers | null = null;
 
  restLogin(restaurant: restaurantUsers) {
    this.restisLoggedIn = true;
    this.currentRestUser = restaurant;
  }
 
  restLogout() {
    this.restisLoggedIn = false;
    this.currentRestUser = null;
  }
 
  getCurrentRestUser(): restaurantUsers | null {
    return this.currentRestUser;
  }
 
  restisAuthenticated(): boolean {
    return this.restisLoggedIn;
  }
}
