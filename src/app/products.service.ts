import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products';
import { OrderProduct } from './models/orderProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
    const storedData = sessionStorage.getItem(this.cartKey);
    this.cart = storedData ? JSON.parse(storedData).cart : []
  }

  productToEdit: any = null;

  baseUrl = 'http://localhost:3000/products';

  cartKey = 'cart';



  cart: Array<OrderProduct> = [];


  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
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
}
