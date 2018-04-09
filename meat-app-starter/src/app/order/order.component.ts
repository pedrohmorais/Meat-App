import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from 'app/order/order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item';
import {Order, OrderItem} from 'app/order/order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON' },
    {label: 'Cartão de Débito', value: 'DEB' },
    {label: 'Ticket Refeição', value: 'REF' }
  ]

  orderForm : FormGroup

  delivery: number = 8
  
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('',[Validators.required,Validators.minLength(5)]),
      email: this.formBuilder.control('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
      emailConfirmation : this.formBuilder.control('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('',[Validators.required,Validators.minLength(5)]),
      number: this.formBuilder.control('',[Validators.required,Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('',[Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  //validacoes adicionais
  static equalsTo(group: AbstractControl) : {[key:string] : boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    //valida se existem
    if(!email || !emailConfirmation) {
      return undefined
    }
    if(email.value !== emailConfirmation.value) {
      //pode dar a chave que quiser
      return {emailsNotMatch: true}
    }

    return undefined
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
