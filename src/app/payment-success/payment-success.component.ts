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



}
