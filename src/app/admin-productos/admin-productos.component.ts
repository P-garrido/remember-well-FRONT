import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent {

  constructor(private service: ProductsService) { }

  products: any[] = [{ name: 'QR Chico', description: 'QR de 10x10cm de metal con adherente', imgUrl: 'https://i.etsystatic.com/14699669/r/il/a49001/5067000493/il_570xN.5067000493_4ycd.jpg', price: 500 }, { name: 'QR Grande', description: 'QR de 15x15cm de metal con adherente', imgUrl: 'https://i.etsystatic.com/14699669/r/il/a49001/5067000493/il_570xN.5067000493_4ycd.jpg', price: 5500 }]



  delete(prod: any) {
    let index = this.products.indexOf(prod);
    this.products.splice(index, 1);  //CAMBIAR PARA BBDD  
  }

  edit(prod: any) {
    this.service.productToEdit = prod;
  }

  addProd() {
    this.service.productToEdit = null;
  }
}
