import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
//import { Restaurant } from './restaurant/restaurant.component';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface Menu {
  restaurantId: number;
  items: MenuItem[];
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // getMenuByRestaurantId(restaurantId: number) {
  //   throw new Error("Method not implemented.");
  // }
  getMenuByRestaurantId(id: number): Observable<MenuItem[]> {
  return this.http.get<any>('http://localhost:3000/menus').pipe(
    map(data => {
      const menu = data.find((m: any) => m.restaurantId === id);
      return menu ? menu.items : [];
    })
  );
}

  constructor(private http: HttpClient) {}

  getRestaurants(id: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurants');
  }
   getMenuByRId(id : number):Observable<any>{
     return this.http.get<any>('http://localhost:3000/restaurants')
   }
}