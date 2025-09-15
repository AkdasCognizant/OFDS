import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  @Input() cartItemsCount: number = 0;
  isMobileMenuOpen = false;

  navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/restaurant', label: 'Restaurants' },
    { href: '/help', label: 'Help' },
    { href: '/aboutus', label: 'About Us' }
  ];

  constructor(private router: Router, private authService: AuthService) { }

  searchQuery: string = '';

  onCartClick() {
    this.navigateWithAuth('/cart');
  }

  onProfileClick() {
    this.navigateWithAuth('/profile');
  }

  navigateWithAuth(targetRoute: string) {
  if (this.authService.isAuthenticated()) {
    this.router.navigate([targetRoute]);
  } else {
    this.router.navigate(['/login'], { queryParams: { redirectTo: targetRoute } });
  }
}



}

