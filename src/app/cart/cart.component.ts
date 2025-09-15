import { Component, OnInit } from '@angular/core';
import { Cart1Service } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// cart.component.ts


export interface Item {
  image: any;
  Itemid: number;
  name: string;
  description?: string;         
  price: number;
  originalPrice?: number;       
  restaurant?: string;          
  category?: string;       
  imageUrl: string;
}


export interface CartItem {
  id: number;
  item: Item;
  quantity: number;
}



@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cart1Service: Cart1Service, private router: Router) { }
  private subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.cart1Service.loadCart();
    this.subscription = this.cart1Service.cartItems$.subscribe(data => {
      this.cartItems = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  confirmRemove(cartItemId: number): void {
    if (confirm('Remove this item from your cart?')) {
      this.removeItem(cartItemId);

    }
  }

  removeItem(cartItemId: number): void {
    this.cart1Service.removeItemFromBackend(cartItemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(ci => ci.id !== cartItemId);
    },
    );
  }
  getItemTotal(cartItem: CartItem): number {
    return cartItem.item.price * cartItem.quantity;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, ci) => this.getdeliveryFee() + total + ci.item.price * ci.quantity, 0);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
    this.cartItems = [];
  }

  //  increaseQuantity(cartItemId: number): void {
  //   const cartItem = this.cartItems.find(ci => ci.id === cartItemId);
  //   if (cartItem) {
  //     cartItem.quantity++;
  //     this.cart1Service.updateCartItem(cartItem).subscribe(() => {
  //       this.cart1Service.loadCart();
  //     });
  //   }
  // }

  // decreaseQuantity(cartItemId: number): void {
  //   const cartItem = this.cartItems.find(ci => ci.id === cartItemId);
  //   if (cartItem && cartItem.quantity > 1) {
  //     cartItem.quantity--;
  //     this.cart1Service.updateCartItem(cartItem).subscribe(() => {
  //       this.cart1Service.loadCart();
  //     });
  //   }
  // }

  increaseQuantity(cartItemId: number): void {
    const cartItem = this.cartItems.find(ci => ci.id === cartItemId);
    if (cartItem) {
      const updatedItem: CartItem = {
        ...cartItem,
        quantity: cartItem.quantity + 1
      };
      this.cart1Service.updateCartItem(updatedItem).subscribe(() => {
        this.cart1Service.loadCart();
      });
    }
  }

  decreaseQuantity(cartItemId: number): void {
    const cartItem = this.cartItems.find(ci => ci.id === cartItemId);
    if (cartItem && cartItem.quantity > 1) {
      const updatedItem: CartItem = {
        ...cartItem,
        quantity: cartItem.quantity - 1
      };
      this.cart1Service.updateCartItem(updatedItem).subscribe(() => {
        this.cart1Service.loadCart();
      });
    }
  }


  getSubtotal(): number {
    return this.cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  }
  getdeliveryFee(): number {
    return this.getSubtotal() > 500 ? 0 : 40;

  }

  getEstimatedDelivery(): string {
    return 'Estimated delivery: 25–30 minutes';
  }


  getGST(): number {
    return Math.round(this.getSubtotal() * 0.18);
  }



  getDiscount(): number {
    return this.cartItems.reduce((sum, ci) => {
      const discount = ci.item.originalPrice ? (ci.item.originalPrice - ci.item.price) * ci.quantity : 0;
      return sum + discount;
    }, 0);
  }


}
