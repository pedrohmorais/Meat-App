import { MEAT_API } from 'app/app.api';
import { Http,Headers, RequestOptions } from '@angular/http';
import {Injectable} from '@angular/core'
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart-service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item';
import { Order, OrderItem } from './order.model';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService,private http: Http) {

    }

    itemsValue() : number {
        return this.cartService.total()
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        return this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        return this.cartService.decreaseQty(item)
    }

    remove(item : CartItem) {
        this.cartService.removeItem(item)
    }

    clear() {
        this.cartService.clear();
    }

    //exemplo post
    checkOrder(order : Order): Observable<string>{
        const headers = new Headers();
        headers.append('Content-Type','application/json')
        //sempre usar observable em chamadas http com retorno
        return this.http.post(`${MEAT_API}/orders`,
                                JSON.stringify(order),
                                new RequestOptions({headers: headers}))
                            .map(response=>response.json())
                            //faz mais um map pra retornar só o id
                            .map(order=>order.id);
                            
    }
}