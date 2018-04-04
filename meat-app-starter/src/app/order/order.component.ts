import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from 'app/order/order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item';
import {Order, OrderItem} from 'app/order/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,private router: Router) {}

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON' },
    {label: 'Cartão de Débito', value: 'DEB' },
    {label: 'Ticket Refeição', value: 'REF' }
  ]

  delivery: number = 8
  

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

 
  
  checkOrder(order: Order) {
    //.map transforma cartItems em orderItems
    //onde eu tenho um item: CartItem e quero transformalo em um orderItem
    order.orderItems = this.cartItems()
      .map(
        (item:CartItem) => new OrderItem(item.quantity, item.menuItem.id)
      )
    //deve ser feito o subscribe apos toda chamada post
    //o subscribe "se inscreve no observable e espera a resposta"
    this.orderService.checkOrder(order).subscribe(
      (orderId: string) => {
        this.router.navigate(['/order-summary'])
        //console.log(`Compra concluida ${orderId}`);
        this.orderService.clear();
      }
    )
    console.log(order)
  }
}
