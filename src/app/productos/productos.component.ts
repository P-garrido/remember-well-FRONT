import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/products';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  constructor(private service: ProductsService) {
    this.getProducts();
  }


  products: Array<Product> = [];
  comments: any[] = [{ stars: 4, text: 'Muy buen producto, me legó a tiempo', user: 'Pedro' }, { stars: 5, text: 'Esto me ayudó a recoradr mejor a mi abuelo. Gracias!', user: 'Juana' }, { stars: 5, text: 'Me sirvie mucho para ponerme contento en estos momentos', user: 'Jose' }];


  comment = new FormGroup({
    stars: new FormControl(),
    text: new FormControl('', Validators.required)
  })






  getProducts() {
    this.products.splice(0, this.products.length);
    this.service.getAll().subscribe((res: any) => {
      console.log(res)
      res.forEach((prod: any) => {
        let imgUrls: string[] = [];
        prod.ProductFiles.forEach((df: any) => {
          imgUrls.push(df.fileUrl)
        })
        this.products.push(new Product(prod.id, prod.name, prod.description, prod.price, imgUrls))
      })
    })
  }


  sendComment() {
    console.log(this.comment.value);
    this.comment.controls.stars.reset();
    this.comment.controls.text.reset();
  }
}
