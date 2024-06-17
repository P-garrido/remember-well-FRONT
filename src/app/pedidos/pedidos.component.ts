import { Component } from '@angular/core';
import { Order } from '../models/orders';
import { OrdersService } from '../orders.service';
import { User } from '../models/user';
import { OrderProduct } from '../models/orderProducts';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {


  constructor(private service: OrdersService, private router: Router, private loginService: LoginService) {
    this.getAllOrders();
  }



  url = environment.url;
  pedidos: Array<Order> = [];


  getAllOrders() {
    this.pedidos.splice(0, this.pedidos.length);
    this.service.getAll().subscribe((res: any) => {

      res.forEach((ord: any) => {
        let us = new User(ord.User.id, ord.User.mail, ord.User.name, ord.User.password, ord.User.phone, ord.User.admin, []);
        let op: Array<OrderProduct> = [];
        ord.OrderProducts.forEach((lp: any) => {
          let ordProd = new OrderProduct(lp.id, lp.idOrd, lp.Product, lp.cantidad);
          op.push(ordProd);
        })
        this.pedidos.push(new Order(ord.id, us, ord.date, ord.total, ord.province, ord.city, ord.zipCode, ord.address, ord.floor, ord.appartament, ord.delivered, op, ord.payed))
      })
    })
  }


  changeStatus(ped: Order) {
    this.service.changeStatus(ped).subscribe((res: any) => {
      this.getAllOrders();
    });
  }

  delete(ped: Order) {
    this.service.delete(ped).subscribe((res: any) => {
      this.getAllOrders();
    });
  }
}
