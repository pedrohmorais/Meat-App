import { CartItem } from "./cart-item";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService{
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItem(item:MenuItem) {
        //verifica se o item nao existe no carrinho
        let foundItem = this.items.find((mItem)=>mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        }
        else{
            this.items.push(new CartItem(item))
        }
    }

    //removeItem(item:CartItem) {
        //procura o item no array e tira
       // this.items.splice(this.items.indexOf(item), 1)
    //}


    total() : number {
        return this.items
            //pega so os valores
            .map(item=>item.value())
            //reduce tem o value anterior e o atual, o 0 é o valor inicial
            .reduce((prev, value) => prev + value, 0)
    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item),1)
    }

    decreaseQty(item: CartItem) {
        item.quantity = item.quantity - 1
        if(item.quantity === 0) {
            this.removeItem(item)
        }
    }
}