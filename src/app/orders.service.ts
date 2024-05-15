import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { Order } from './models/orders';
import { OrderProduct } from './models/orderProducts';


interface DeliveryData {
  province: string;
  city: string;
  zipCode: string;
  address: string;
  floor: string;
  appartament: string;
}

@Injectable({
  providedIn: 'root'
})



export class OrdersService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl = "http://localhost:3000/orders";

  sessionStorageDeliveryKey = 'delivery_data';




  setDeliveryData(delData: DeliveryData, tot: number) {
    sessionStorage.setItem(this.sessionStorageDeliveryKey, JSON.stringify({ deliveryData: delData, total: tot }));
  }







  getAll() {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl, { headers }).pipe(catchError(this.handleError));
  }

  create(ord: Order) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, {
      idUser: ord.user.id,
      date: Date(),
      total: ord.total,
      province: ord.province,
      city: ord.city,
      zipCode: ord.zipCode,
      address: ord.address,
      floor: ord.floor,
      appartament: ord.appartament,
      delivered: false
    }, { headers }).pipe(catchError(this.handleError));
  }


  changeStatus(ord: Order) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${ord.id}`;
    return this.http.patch(url, {
      idUser: ord.user.id,
      date: Date(),
      total: ord.total,
      province: ord.province,
      city: ord.city,
      zipCode: ord.zipCode,
      address: ord.address,
      floor: ord.floor,
      appartament: ord.appartament,
      delivered: !ord.delivered
    }, { headers }).pipe(catchError(this.handleError));
  }


  delete(ord: Order) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${ord.id}`;
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
  }


  createPayment(cart: Array<OrderProduct>) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/payments`;
    return this.http.post(url, cart, { headers }).pipe(catchError(this.handleError));
  }




  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError("Terminó el tiempo de tu sesión, inicia sesión nuevamente");
    } else {
      console.error('Ocurrió un error inesperado:', error.message);
      alert(`ERROR: ${error.message}`)
    }

    return throwError('Algo salió mal, inténtalo de nuevo más tarde.');
  }




}





