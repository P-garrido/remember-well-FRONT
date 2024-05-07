import { Component, TemplateRef } from '@angular/core';
import { OrderProduct } from '../models/orderProducts';
import { ProductsService } from '../products.service';
import { Order } from '../models/orders';
import { LoginService } from '../login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../orders.service';
import { catchError, throwError } from 'rxjs';
import { OrderProductsService } from '../order-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {


  constructor(private productService: ProductsService, private loginService: LoginService, private modalService: BsModalService, private ordersService: OrdersService, private orderProductsService: OrderProductsService, private router: Router) {
    this.getCart();
    this.getTotal();
  }


  cart: Array<OrderProduct> = [];
  total: number = 0;


  modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }



  deliveryData = new FormGroup({
    province: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    floor: new FormControl(''),
    appartament: new FormControl(''),
  })



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
    const ord = new Order(null, this.loginService.user!, new Date(), this.total, this.deliveryData.value.province!, this.deliveryData.value.city!, this.deliveryData.value.zipCode!, this.deliveryData.value.address!, this.deliveryData.value.floor ? this.deliveryData.value.floor : null, this.deliveryData.value.appartament ? this.deliveryData.value.appartament : null, false, this.cart)
    this.ordersService.create(ord).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`)
      return throwError(error);
    })).subscribe((res: any) => {
      this.cart.forEach((op: OrderProduct) => {
        let opWithIdOrd = new OrderProduct(null, res.id, op.product, op.quantity)
        this.orderProductsService.create(opWithIdOrd).pipe(catchError((error: any) => {
          alert(`ERROR: ${error}`)
          return throwError(error);
        })).subscribe()
      });

      this.router.navigate(['/inicio'])
    })
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
