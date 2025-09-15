import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cart/cart.component';

@Injectable({ providedIn: 'root' })
export class Cart1Service {
  [x: string]: any;
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadCart(): void {
    this.http.get<CartItem[]>('http://localhost:3000/cart').subscribe(data => {
      this.cartItemsSubject.next(data);
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  getCartCount(): number {
    return this.getCartItems().length;
  }
  removeItemFromBackend(cartItemId: number):Observable<any>{
    return this.http.delete(`http://localhost:3000/cart/${cartItemId}`);
  }
  updateCartItem(cartItem: CartItem): Observable<CartItem> {
  return this.http.put<CartItem>(`http://localhost:3000/cart/${cartItem.id}`, cartItem);
}


  
}

