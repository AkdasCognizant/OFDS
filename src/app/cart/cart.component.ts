import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { UserCart, CartLine } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: UserCart | null = null;
  private sub = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.sub = this.cartService.cart$.subscribe(c => this.cart = c);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  increase(line: CartLine): void {
    this.cartService.updateItem({ ...line, quantity: line.quantity + 1 });
  }

  decrease(line: CartLine): void {
    if (line.quantity > 1) {
      this.cartService.updateItem({ ...line, quantity: line.quantity - 1 });
    }
  }

  remove(line: CartLine): void {
    this.cartService.removeItem(line);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  getSubtotal(): number {
    return this.cart?.items.reduce((s, i) => s + i.price * i.quantity, 0) || 0;
  }

  getDeliveryFee(): number {
    return this.getSubtotal() > 500 ? 0 : 40;
  }

  getGST(): number {
    return Math.round(this.getSubtotal() * 0.18);
  }

  trackByLine(_: number, line: CartLine): number {
    return line.itemID;
  }

  checkout(): void {
    // navigate to /checkout
  }
}
