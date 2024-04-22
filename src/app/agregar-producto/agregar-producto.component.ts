import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {

  newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
    desc: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  addProduct(fi: HTMLInputElement) {
    console.log(this.newProductForm)
    console.log(fi)
  }

}
