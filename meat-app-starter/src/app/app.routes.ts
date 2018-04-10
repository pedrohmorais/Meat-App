import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {Routes} from '@angular/router'
import { HomeComponent } from 'app/home/home.component';
import { AboutComponent } from 'app/about/about.component';
import { RestaurantsComponent } from 'app/restaurants/restaurants.component';
import { RestaurantDetailComponent } from 'app/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from 'app/restaurant-detail/menu/menu.component';
import { ReviewsComponent } from 'app/restaurant-detail/reviews/reviews.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children:[
            {path:'', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
    },
    //{path: 'order', component: OrderComponent},
    {path: 'order', loadChildren: './order/order.module#OrderModule'},
    {path: 'order-summary', component: OrderSummaryComponent},

    //componente importado no root
    //{path: 'about', component: AboutComponent},
    //componente importado lazy loading usando loadChildren
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
]