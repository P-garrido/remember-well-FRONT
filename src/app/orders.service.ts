import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { Order } from './models/orders';
import { OrderProduct } from './models/orderProducts';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';


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

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }


  baseUrl = environment.url + '/orders';


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


  createPayment(cart: Array<OrderProduct>, deliveryData: FormGroup) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/payments`;
    return this.http.post(url, { cart, idUser: this.loginService.user!.id, province: deliveryData.value.province, city: deliveryData.value.city, zipCode: deliveryData.value.zipCode, address: deliveryData.value.address, floor: deliveryData.value.floor, appartament: deliveryData.value.appartament }, { headers }).pipe(catchError(this.handleError));
  }




  private handleError(error: HttpErrorResponse) {

    let errorMessage: string = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocurrió un error:', error.error);
      errorMessage = error.message;
    }
    else if (error.status === 401) {
      errorMessage = 'Se acabó el tiempo de tu sesión, o no iniciaste. Inicia sesión nuevamente'
      alert(errorMessage);
      this.loginService.setUserData(null, null);
      this.router.navigate(['/login'])
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`El servidor devolvió un código ${error.status}, el mensaje fue: `, error.error);
      errorMessage = error.message;
    }
    return throwError(() => new Error(`Ocurrió un error inesperado: ${errorMessage}`));
  }




}





