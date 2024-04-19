import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {



  pedidos: any[] = [{ id: 1, user: 'Jose', delivered: false, date: Date(), totalPrice: 5800, province: 'Santa Fe', city: 'Rosario', postalCode: '2000', address: 'Jorge Newbery 9041', orderProducts: [{ product: 'QR Chico', quantity: 4 }, { product: 'QR Mediano', quantity: 1 }] },
  { id: 2, user: 'Carlos', delivered: true, date: Date(), totalPrice: 60000, province: 'Buenos Aires', city: 'CABA', postalCode: '3459', address: 'Libertador 2100', orderProducts: [{ product: 'QR Grande', quantity: 2 }] }
  ];


  changeStatus(ped: any) {
    ped.delivered = !ped.delivered  //CAMBIAR PARA BBDD
  }

  delete(ped: any) {
    let index = this.pedidos.indexOf(ped);
    this.pedidos.splice(index, 1);  //CAMBIAR PARA BBDD  
  }
}
