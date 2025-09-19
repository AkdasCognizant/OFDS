// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserCart, CartLine } from './models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = 'http://localhost:3000/cart';
  private cartSubject = new BehaviorSubject<UserCart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.currentUser$.subscribe(user => {
      if (user) this.loadCart();
      else this.cartSubject.next(null);
    });
  }

  private get userID(): number {
    return this.auth.getUserId();
  }

  /** Load the existing cart for this user, or null */
  public loadCart(): void {
    this.http
      .get<UserCart[]>(`${this.apiUrl}?userID=${this.userID}`)
      .pipe(map(arr => arr[0] || null))
      .subscribe(cart => this.cartSubject.next(cart));
  }

  /** Add or merge a line into the cart, creating a new cart if needed */
  addItem(line: CartLine, restID: number, restaurantName: string): void {
    const cart = this.cartSubject.value;

    if (!cart) {
      // create new cart
      const newCart: Omit<UserCart, 'id'> = {
        userID: this.userID,
        restID,
        restaurantName,
        items: [line],
        itemCount: line.quantity,
        totalAmount: line.quantity * line.price
      };
      this.http.post<UserCart>(this.apiUrl, newCart)
        .pipe(tap(c => this.cartSubject.next(c)))
        .subscribe();
      return;
    }
    if (cart.restID !== restID) {
      alert(
        `Your cart already contains items from "${cart.restaurantName}".\n` +
        `Please checkout or clear your cart before adding items from "${restaurantName}".`
      );
      return;
    }

    // merge into existing cart
    const items = [...cart.items];
    const idx = items.findIndex(i => i.itemID === line.itemID);
    if (idx > -1) items[idx].quantity += line.quantity;
    else items.push(line);

    this.saveOrDeleteCart({ ...cart, items });
  }

  /** Update a line’s quantity (or remove it if quantity = 0) */
  updateItem(line: CartLine): void {
    const cart = this.cartSubject.value!;
    const items = cart.items
      .map(i => i.itemID === line.itemID ? { ...i, quantity: line.quantity } : i)
      .filter(i => i.quantity > 0);

    this.saveOrDeleteCart({ ...cart, items });
  }

  /** Remove a line outright */
  removeItem(line: CartLine): void {
    const cart = this.cartSubject.value!;
    const items = cart.items.filter(i => i.itemID !== line.itemID);
    this.saveOrDeleteCart({ ...cart, items });
  }

  /** Clear all lines: delete the cart record */
  clearCart(): void {
    const cart = this.cartSubject.value;
    if (!cart || !cart.id) return;

    this.http.delete(`${this.apiUrl}/${cart.id}`)
      .pipe(tap(() => this.cartSubject.next(null)))
      .subscribe();
  }

  /**
   * If there are items left, PUT update; otherwise DELETE the cart record.
   */
  private saveOrDeleteCart(updated: UserCart): void {
    // Recompute counts
    const body: UserCart = {
      ...updated,
      itemCount: updated.items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: updated.items.reduce((sum, i) => sum + i.quantity * i.price, 0)
    };

    if (body.items.length > 0) {
      // update existing cart
      this.http.put<UserCart>(`${this.apiUrl}/${body.id}`, body)
        .pipe(
          tap(c => this.cartSubject.next(c)),
          catchError(err => {
            console.error('CartService save error', err);
            return throwError(() => new Error('Cart update failed'));
          })
        )
        .subscribe();
    } else {
      // no items left → delete cart
      this.http.delete(`${this.apiUrl}/${body.id}`)
        .pipe(
          tap(() => this.cartSubject.next(null)),
          catchError(err => {
            console.error('CartService delete error', err);
            return throwError(() => new Error('Cart delete failed'));
          })
        )
        .subscribe();
    }
  }
}
