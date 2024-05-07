import { Component } from '@angular/core';
import { OrderProduct } from '../models/orderProducts';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {


  constructor(private productService: ProductsService) {
    this.getCart();
    this.getTotal();
  }


  cart: Array<OrderProduct> = [];
  total: number = 0;


  getCart() {
    this.cart.splice(0, this.cart.length);
    this.productService.cart.forEach((op: OrderProduct) => {
      this.cart.push(op);
    })
  }



  getTotal() {
    let tot = 0;
    this.cart.forEach((op: OrderProduct) => {
      tot += op.product.price * op.quantity;
    });
    this.total = tot;
  }

  checkout() {
    //ACA VA A LINKEAR CON LA API DE MP
  }


  addAmmount(lp: OrderProduct) {
    lp.quantity++;
    this.getTotal();
  }

  subAmmount(lp: OrderProduct) {
    if (lp.quantity > 1) {
      lp.quantity--
    }
    else {
      this.productService.removeFromCart(lp);
      this.getCart();
      // HACER QUE ACA SE SAQUE EL PRODUCTO DEL CARRITO
    }
    this.getTotal();
  }

}
