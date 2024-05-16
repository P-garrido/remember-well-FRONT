import { Component } from '@angular/core';
import { Order } from '../models/orders';
import { catchError, throwError } from 'rxjs';
import { OrderProduct } from '../models/orderProducts';
import { LoginService } from '../login.service';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';
import { OrderProductsService } from '../order-products.service';
import { ProfileService } from '../profile.service';
import { ProductsService } from '../products.service';


interface DeliveryData {
  province: string;
  city: string;
  zipCode: string;
  address: string;
  floor: string;
  appartament: string;
}

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

  constructor(private loginService: LoginService, private ordersService: OrdersService, private router: Router, private orderProductsService: OrderProductsService, private profileService: ProfileService, private productService: ProductsService) {
    const storedData = sessionStorage.getItem(this.sessionStorageDeliveryKey);
    this.deliveryData = storedData ? JSON.parse(storedData).deliveryData : null;
    this.total = storedData ? JSON.parse(storedData).total : 0;
  }

  ngOnInit() {
    this.checkout();
  }

  deliveryData: DeliveryData = { province: '', city: '', zipCode: '', address: '', floor: '', appartament: '' };
  total: number = 0;

  sessionStorageDeliveryKey = 'delivery_data'





  checkout() {
    //FALTA PROBAR
    const ord = new Order(null, this.loginService.user!, new Date(), this.total, this.deliveryData.province!, this.deliveryData.city!, this.deliveryData.zipCode!, this.deliveryData.address!, this.deliveryData.floor, this.deliveryData.appartament, false, this.productService.cart);
    this.ordersService.create(ord).subscribe((res: any) => {
      this.productService.cart.forEach((op: OrderProduct) => {
        let opWithIdOrd = new OrderProduct(null, res.id, op.product, op.quantity)
        this.orderProductsService.create(opWithIdOrd).subscribe()
      });
      this.profileService.create().subscribe((res: any) => {
        this.productService.emptyCart();
      })
    })
  }

}
