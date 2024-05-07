import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/products';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent {

  constructor(private service: ProductsService) {
    this.getProducts()
  }

  products: Array<Product> = []



  getProducts() {
    this.products.splice(0, this.products.length);
    this.service.getAll().subscribe((res: any) => {
      res.forEach((prod: any) => {
        let imgUrls: string[] = [];
        prod.ProductFiles.forEach((df: any) => {
          imgUrls.push(df.fileUrl)
        })
        this.products.push(new Product(prod.id, prod.name, prod.description, prod.price, imgUrls))
      })
    })
  }


  delete(prod: Product) {
    this.service.delete(prod).subscribe((res: any) => {
      if (res) {
        this.getProducts()
      }
    })
  }

  edit(prod: Product) {
    this.service.productToEdit = prod; //SIRVE PARA QUE EL MISMO COMPONENTE SIRVA PARA EDITAR Y CREAR SEGÚN SI HAY UN PRODUCTO A EDITAR O NO
  }

  addProd() {
    this.service.productToEdit = null; //SIRVE PARA QUE EL MISMO COMPONENTE SIRVA PARA EDITAR Y CREAR SEGÚN SI HAY UN PRODUCTO A EDITAR O NO
  }
}
