import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {


  products: any[] = [{ name: 'QR Chico', description: 'QR de 10x10cm de metal con adherente', imgUrl: 'https://i.etsystatic.com/14699669/r/il/a49001/5067000493/il_570xN.5067000493_4ycd.jpg', price: 500, quantity: 0 }, { name: 'QR Grande', description: 'QR de 15x15cm de metal con adherente', imgUrl: 'https://i.etsystatic.com/14699669/r/il/a49001/5067000493/il_570xN.5067000493_4ycd.jpg', price: 5500, quantity: 0 }];
  comments: any[] = [{ stars: 4, text: 'Muy buen producto, me legó a tiempo', user: 'Pedro' }, { stars: 5, text: 'Esto me ayudó a recoradr mejor a mi abuelo. Gracias!', user: 'Juana' }, { stars: 5, text: 'Me sirvie mucho para ponerme contento en estos momentos', user: 'Jose' }];


  comment = new FormGroup({
    stars: new FormControl(),
    text: new FormControl('', Validators.required)
  })


  sendComment() {
    console.log(this.comment.value);
    this.comment.controls.stars.reset();
    this.comment.controls.text.reset();
  }
}
