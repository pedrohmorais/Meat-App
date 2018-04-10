import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ROUTES} from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { ShoppingCartService } from './restaurant-detail/shopping-cart/shopping-cart-service';
import { InputComponent } from './shared/input/input.component';
import { RadioComponent } from './shared/radio/radio.component';
//substituidos pelo ordercomponent
//import { OrderComponent } from './order/order.component';
//import { OrderItemsComponent } from './order/order-items/order-items.component';
//import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
import { OrderService } from 'app/order/order.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RatingComponent } from './shared/rating/rating.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    //AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    //OrderComponent,
    //substituidos pelo shared
    //InputComponent,
    //RadioComponent,
    //RatingComponent
    //OrderItemsComponent,
    //DeliveryCostsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //substituidos pelo shared
    //FormsModule,
    //ReactiveFormsModule,
    SharedModule.forRoot(),
    //core modulo ficou obsoleto na funcao forRoot, pois ele ja vai vir com providers
    //CoreModule,
    RouterModule.forRoot(ROUTES,{preloadingStrategy: PreloadAllModules} )
  ],
  //removido e substituido pelo coremodules, onde ficam todos os providers(servicos)
  //providers: [RestaurantsService,ShoppingCartService,OrderService, ShoppingCartService, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
