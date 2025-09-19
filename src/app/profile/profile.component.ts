import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  activeTab: string = '';

  faqs = [
    {
      question: 'How do I track my order?',
      answer: 'Go to the "Orders" tab to see real-time updates on your order status.',
      icon: 'bi bi-truck'
    },
    {
      question: 'Can I cancel an order after placing it?',
      answer: 'Yes, within 2 minutes. After that, it depends on restaurant acceptance.',
      icon: 'bi bi-x-circle'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'UPI, cards, net banking, wallets, and cash on delivery (select restaurants).',
      icon: 'bi bi-credit-card'
    },
    {
      question: 'How do I update my delivery address?',
      answer: 'Use the "Edit Profile" tab to update your saved address.',
      icon: 'bi bi-geo-alt'
    },
    {
      question: 'Is contactless delivery available?',
      answer: 'Yes! Select "Contactless Delivery" at checkout.',
      icon: 'bi bi-shield-check'
    }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  //User will be logged out on clicking logout button
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { queryParams: { redirectTo: '/' } });
  }
  onUpdateCustomer(): void {
    // Call update service here
    alert('Profile updated successfully!');
  }
}
