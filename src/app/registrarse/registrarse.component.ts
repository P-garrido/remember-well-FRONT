import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent {

  constructor(public loginService: LoginService, private userService: UserService, private router: Router) {

  }



  registerForm = new FormGroup({
    mail: new FormControl(this.loginService.user ? this.loginService.user.mail : '', [Validators.required, Validators.email]),
    password: new FormControl(this.loginService.user ? this.loginService.user.password : '', Validators.required),
    name: new FormControl(this.loginService.user ? this.loginService.user.name : '', Validators.required),
    phone: new FormControl(this.loginService.user ? this.loginService.user.phone : '', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })





  register() {

    if (this.loginService.user == null) {
      //ACA VA LA FUNCION REGISTRAR NUEVO USUARIO
      this.userService.create(this.registerForm).pipe(catchError((error: any) => {
        alert(`ERROR: ${error}`);
        if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
          this.loginService.setUserData(null, null);
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })).subscribe((res: any) => {
        this.loginService.setUserData(res.newUser, res.token);
        this.router.navigate(['/inicio']);
      })

    }
    else {
      //ACA VA LA FUNCION EDITAR USUARIO
      const id = this.loginService.user.id;

      this.userService.edit(this.registerForm, id, false).pipe(catchError((error: any) => {
        alert(`ERROR: ${error}`);
        if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
          this.loginService.setUserData(null, null);
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })).subscribe((res: any) => {
        this.userService.getOne(id).subscribe((res: any) => {
          this.loginService.setUserData(res, this.loginService.token);
        })
        this.router.navigate(['/inicio']);
      })
    }

  }


  logOut() {
    this.loginService.setUserData(null, null);
    this.router.navigate(['/inicio']);
  }

}
