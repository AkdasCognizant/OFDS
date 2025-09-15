import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: User | null = null;

  login(user: User) {
    this.isLoggedIn = true;
    this.currentUser = user;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
