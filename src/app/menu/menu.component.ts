// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// interface Items {
//   image: any;
//   id: number;
//   name: string;
//   price: number;
// }

// interface MenuItems {
//   restaurantId: number;
//   items: Items[];
// }

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.component.html',
//   standalone: false,
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent implements OnInit {
//   restaurantName!: string;
//   menuItems: Items[] = [];

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     if (idParam) {
//       const restaurantId = +idParam;
//       this.http.get<MenuItems[]>('http://localhost:3000/menus').subscribe(data => {
//         const menu = data.find(m => m.restaurantId === restaurantId);
//         if (menu) {
//           this.menuItems = menu.items;
//         }
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cart1Service } from '../cart.service';
import { CartItem, Item } from '../cart/cart.component';


interface MenuItems {
  restaurantId: number;
  items: Item[];
}

@Component({
  selector: 'app-menu',
  standalone:false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurantId!: number;
  restaurantName!:string;
  menuItems: Item[] = [];
  customerId: string = '37a1'; // Replace with actual logged-in user

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cart1Service: Cart1Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.restaurantId = +idParam;
      this.http.get<MenuItems[]>('http://localhost:3000/menus').subscribe(data => {
        const menu = data.find(m => m.restaurantId === this.restaurantId);
        if (menu) {
          this.menuItems = menu.items.map(item => ({
            ...item,
            restaurant: `Restaurant #${this.restaurantId}`, // Optional: add name if needed
            category: 'Main Course', // Optional: add category if needed
            imageUrl: item.image
          }));
        }
      });
    }
  }

addToCart(item: Item): void {
    const currentCart = this.cart1Service.getCartItems();
   const existingItem = this.cart1Service.getCartItems()
    .find(ci => ci.item.Itemid === item.Itemid);

  if (existingItem) {
    alert('This item is already in your cart!');
    return; // Stop here, don't add again
  }
  if (currentCart.length > 0) {
    const existingRestaurant = currentCart[0].item.restaurant;

    if (existingRestaurant !== item.restaurant) {
      alert(`You can only add items from ${existingRestaurant} in this order. Please clear your cart first.`);
      return;
    }
  }
  const cartItem: CartItem = {
    id: Date.now(),
    item: item,
    quantity: 1
  };

  this.http.post<CartItem>('http://localhost:3000/cart', cartItem).subscribe({
    next: () => {
      this.cart1Service.loadCart(); // refresh cart state
    }})
  }

  hasItemsInCart(): boolean {
    return this.cart1Service.getCartCount() > 0;
  }

  proceedToCart(): void {
    this.cart1Service.loadCart();
    this.router.navigate(['/cart']);
  }
}
