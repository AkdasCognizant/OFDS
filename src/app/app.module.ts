import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantSignupComponent } from './restaurant-signup/restaurant-signup.component';
import { RestaurantNavbarComponent } from './restaurant-navbar/restaurant-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    ProfileComponent,
    CartComponent,
    CheckoutComponent,
    NavbarComponent,
    MenuComponent,
    FooterComponent,
    RestaurantDashboardComponent,
    RestaurantLoginComponent,
    RestaurantSignupComponent,
    LoginComponent,
    SignupComponent,
    RestaurantNavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
