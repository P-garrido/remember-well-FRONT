import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products';
import { OrderProduct } from './models/orderProducts';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
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

    let errorMessage: string = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocurrió un error:', error.error);
      errorMessage = error.message;
    }
    else if (error.status === 401) {
      errorMessage = 'Se acabó el tiempo de tu sesión, o no iniciaste. Inicia sesión nuevamente'
      alert(errorMessage);
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
