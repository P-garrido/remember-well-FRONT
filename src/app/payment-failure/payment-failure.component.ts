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
    this.deleteOrder();
  }


  deleteOrder() {
    this.orderService.getAll().subscribe((orders: any) => {
      orders.forEach((order: any) => {

        let us = new User(order.User.id, order.User.mail, order.User.name, order.User.password, order.User.phone, order.User.admin, []);
        let op: Array<OrderProduct> = [];
        order.OrderProducts.forEach((lp: any) => {
          let ordProd = new OrderProduct(lp.id, lp.idOrd, lp.Product, lp.cantidad);
          op.push(ordProd);
        })
        let ord = new Order(order.id, us, order.date, order.total, order.province, order.city, order.zipCode, order.address, order.floor, order.appartament, order.delivered, op, order.payed)
        if (ord.payed === false) {
          this.orderService.delete(ord).subscribe(() => { })
        }
      })
    })
  }
}
