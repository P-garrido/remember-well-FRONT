import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/products';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {


  constructor(private service: ProductsService, private router: Router) { }


  ngOnInit() {
    if (this.service.productToEdit != null) {
      this.onEdit = true;
      this.newProductForm.controls.name.patchValue(this.service.productToEdit.name);
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
    file: new FormControl('', Validators.required), //VER SI PUEDO LIMITAR EL NRO DE ARCHIVOS
    desc: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  addProduct(fi: HTMLInputElement) {

    const fd = new FormData();
    fd.append('name', this.newProductForm.value.name!);
    fd.append('description', this.newProductForm.value.desc!);
    fd.append('price', this.newProductForm.value.price!);
    if (fi.files != null) {
      Array.from(fi.files).forEach((file: any) => {
        fd.append('files', file)
      })
    }
    if (this.onEdit == false) {
      this.service.createProduct(fd).pipe(catchError((error: any) => {
        alert(`ERROR: ${error}`)
        return throwError(error);
      })).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/productos']);
        }
      })
    }
    else {
      this.service.editProduct(fd).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/productos']);
        }
      })
    }



  }

}
