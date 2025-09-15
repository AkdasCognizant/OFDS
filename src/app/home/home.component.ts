import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  restaurants:any[]=[];
  id!:number;


  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router : Router
  ) {}


  ngOnInit(){
    this.restaurantService.getRestaurants(this.id).subscribe(data => {
      this.restaurants = data;
       const foodName = this.route.snapshot.paramMap.get('name');
    });
  }
}