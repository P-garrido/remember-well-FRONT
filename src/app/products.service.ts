import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  productToEdit: any = null;

  baseUrl = 'http://localhost:3000/products';


  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }
}
