import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/products';
import { Comment } from '../models/coments';
import { CommentsService } from '../comments.service';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  constructor(private service: ProductsService, private commentsStervice: CommentsService, public loginService: LoginService, private router: Router) {
    this.getProducts();
    this.getComments();
  }


  products: Array<Product> = [];
  comments: Array<Comment> = [];

  animacionActiva: boolean = false;
  indiceProductoAnimado: number = -1;


  comment = new FormGroup({
    stars: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  })






  getProducts() {
    this.products.splice(0, this.products.length);
    this.service.getAll().pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      res.forEach((prod: any) => {
        let imgUrls: string[] = [];
        let imgExt: string[] = [];
        prod.ProductFiles.forEach((df: any) => {
          imgUrls.push(df.fileUrl)
          imgExt.push(df.extention)
        })
        this.products.push(new Product(prod.id, prod.name, prod.description, prod.price, imgUrls, imgExt))
      })
    })
  }


  getComments() {
    this.comments.splice(0, this.comments.length);
    this.commentsStervice.getAll().subscribe((res: any) => {
      res.forEach((com: any) => {
        const user = new User(com.User.id, com.User.mail, com.User.name, com.User.password, com.User.phone, com.User.admin, [])
        this.comments.push(new Comment(com.id, com.text, com.stars, user));
      })
    })
  }


  sendComment() {

    this.commentsStervice.create(new Comment(null, this.comment.value.text!, parseInt(this.comment.value.stars!), this.loginService.user!)).subscribe((res: any) => {
      if (res) {
        this.comment.controls.stars.reset();
        this.comment.controls.text.reset();
        this.getComments();
      }
    });
  }


  addToCart(prod: Product, i: number) {
    this.indiceProductoAnimado = i;
    this.animacionActiva = true;
    this.service.addToCart(prod);
    setTimeout(() => {
      this.animacionActiva = false;
      this.indiceProductoAnimado = -1;

    }, 1000)
  }
}
