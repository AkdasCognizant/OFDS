import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Springfield',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Office Park, Metropolis',
      isDefault: false
    },
    {
      id: 3,
      type: 'Other',
      address: '789 Country Lane, Smallville',
      isDefault: false
    }
  ];

  paymentOptions = [
    {
      id: 1,
      type: 'Credit/Debit Card',
      comment: 'Visa, Mastercard, Rupay',
      class: 'bi bi-credit-card',
      isDefault: true
    },
    {
      id: 2,
      type: 'UPI',
      comment: 'Google Pay, PhonePe, Patym',
      class: 'bi bi-wallet',
      isDefault: false
    },
    {
      id: 3,
      type: 'Cash on Delivery',
      comment: 'Pay when you receive your order',
      class: 'bi bi-cash',
      isDefault: false
    }
  ];

  selectedAddress: string = '';
  showAddAddress: boolean = false;

  selectedPaymentMethod: string = '';

  newAddressType: string = '';
  newAddressText: string = '';

  setSelectedAddress(id: string): void {
    this.selectedAddress = id;
  }

  editAddress(address: any): void {
    alert("Edit clicked");
    // update form logic will be filled here
  }

  cancelAddAddress(): void {
    this.showAddAddress = false;
    this.newAddressType = '';
    this.newAddressText = '';
  }

  saveAddress(): void {
    const newId = this.addresses.length + 1;
    this.addresses.push({
      id: newId,
      type: this.newAddressType,
      address: this.newAddressText,
      isDefault: false
    });
    this.cancelAddAddress();
  }

  setSelectedPaymentMethod(id: string): void {
    this.selectedPaymentMethod = id;
  }

  
  payNow(){
    //connect razor pay api here to redirect
    alert("you will be redirected to payment gateway securely!!")
  }
}





  