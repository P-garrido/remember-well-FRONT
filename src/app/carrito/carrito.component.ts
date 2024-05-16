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
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {


  constructor(private productService: ProductsService, public loginService: LoginService, private modalService: BsModalService, private ordersService: OrdersService, private orderProductsService: OrderProductsService, private router: Router, private profileService: ProfileService) {
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


  createPayment() {
    //ACA VA A LINKEAR CON LA API DE MP
    this.ordersService.createPayment(this.cart).subscribe((res: any) => {

      this.ordersService.setDeliveryData({ province: this.deliveryData.value.province!, city: this.deliveryData.value.city!, zipCode: this.deliveryData.value.zipCode!, address: this.deliveryData.value.address!, floor: this.deliveryData.value.floor ? this.deliveryData.value.floor : '', appartament: this.deliveryData.value.appartament ? this.deliveryData.value.appartament : '' }, this.total)
      window.location.href = res.init_point; //esto va a la pagina de pago ed mp
    })
  }



  addAmmount(lp: OrderProduct) { //Ver de cambiar cantidades en el cacrt del service
    lp.quantity++;
    this.productService.setCartData();
    this.getTotal();
  }

  subAmmount(lp: OrderProduct) { //Ver de cambiar cantidades en el cacrt del service
    if (lp.quantity > 1) {
      lp.quantity--
    }
    else {
      this.productService.removeFromCart(lp);
      this.getCart();
    }
    this.productService.setCartData();
    this.getTotal();
  }

}
