import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { OrdersService } from '../orders.service';
import { Order } from '../models/orders';
import { User } from '../models/user';
import { OrderProduct } from '../models/orderProducts';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.scss']
})
export class PaymentFailureComponent {

  constructor(private loginService: LoginService, private orderService: OrdersService) { }


  ngOnInit() {
  }



}
