import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {


  constructor(private service: ProductsService) { }


  ngOnInit() {
    if (this.service.productToEdit != null) {
      this.onEdit = true;
      this.newProductForm.controls.name.patchValue(this.service.productToEdit.nameProd);
      this.newProductForm.controls.desc.patchValue(this.service.productToEdit.description);
      this.newProductForm.controls.price.patchValue(this.service.productToEdit.price.toString());
    }
    else {
      this.onEdit = false;
      this.newProductForm.controls.name.reset();
      this.newProductForm.controls.desc.reset();
      this.newProductForm.controls.price.reset();
    }
  }

  onEdit: boolean = false;

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
