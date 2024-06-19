import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { OrderProduct } from '../models/orderProducts';
import { Order } from '../models/orders';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private service: LoginService, private router: Router, private orderService: OrdersService) { }


  loginForm = new FormGroup({
    mail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  getOneUser() {

    this.service.login(this.loginForm).subscribe((res: any) => {
      this.service.setUserData({ id: res.user.id, mail: res.user.mail, password: res.user.password, name: res.user.name, admin: res.user.admin, phone: res.user.phone, profiles: res.user.Deceaseds }, res.token);

      res.user.Orders.forEach((order: any) => {

        let us = new User(order.User.id, order.User.mail, order.User.name, order.User.password, order.User.phone, order.User.admin, []);
        let op: Array<OrderProduct> = [];
        order.OrderProducts.forEach((lp: any) => {
          let ordProd = new OrderProduct(lp.id, lp.idOrd, lp.Product, lp.cantidad);
          op.push(ordProd);
        })
        let ord = new Order(order.id, us, order.idFall, order.date, order.total, order.province, order.city, order.zipCode, order.address, order.floor, order.appartament, order.delivered, op, order.payed)
        if (ord.payed === 'No pagado') {
          this.orderService.delete(ord).subscribe(() => { })
        }
      })

      this.router.navigate(['/inicio'])
    })


  }




}
