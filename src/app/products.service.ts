import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products';
import { OrderProduct } from './models/orderProducts';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private loginService: LoginService) {
    const storedData = sessionStorage.getItem(this.cartKey);
    this.cart = storedData ? JSON.parse(storedData).cart : []
  }

  productToEdit: Product | null = null;

  baseUrl = 'http://localhost:3000/products';

  cartKey = 'cart';



  cart: Array<OrderProduct> = [];


  getAll() {
    return this.http.get<Product[]>(this.baseUrl).pipe(catchError(this.handleError));
  }


  setCartData() {
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.cartKey, JSON.stringify({ cart: this.cart }));
  }

  addToCart(prod: Product) {
    const op = new OrderProduct(null, null, prod, 1)
    this.cart.push(op);
    this.setCartData();
  }

  removeFromCart(op: OrderProduct) {
    let index = this.cart.indexOf(op);
    if (index != -1) {
      this.cart.splice(index, 1)
      this.setCartData()
    }
  }


  delete(prod: Product) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${prod.id}`;
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
  }

  createProduct(prod: FormData) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, prod, { headers }).pipe(catchError(this.handleError));
  }


  editProduct(prod: FormData) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${this.productToEdit!.id}`;
    this.productToEdit = null;
    return this.http.patch(url, prod, { headers }).pipe(catchError(this.handleError));
  }


  emptyCart() {
    this.cart.splice(0, this.cart.length);
    this.setCartData();
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
