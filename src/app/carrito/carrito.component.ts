import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {


  constructor() {
    this.getTotal()
  }


  carrito: any[] = [{ nombreProd: 'QR Grande', descripcion: 'Descripcion de prueba', precio: 10000, cantidad: 3 }, { nombreProd: 'QR Chico', descripcion: 'Descripcion de prueba', precio: 5000, cantidad: 2 }];
  total: number = 0;



  getTotal() {
    let tot = 0;
    this.carrito.forEach((op: any) => {
      tot += op.precio * op.cantidad;
    });
    this.total = tot;
  }

  checkout() {
    //ACA VA A LINKEAR CON LA API DE MP
  }


  addAmmount(lp: any) {
    lp.cantidad++;
    this.getTotal();
  }

  subAmmount(lp: any) {
    if (lp.cantidad > 1) {
      lp.cantidad--
    }
    else {
      // this.productService.removeProduct(ordProd);
      // this.getCart();
      // HACER QUE ACA SE SAQUE EL PRODUCTO DEL CARRITO
    }
    this.getTotal();
  }

}
