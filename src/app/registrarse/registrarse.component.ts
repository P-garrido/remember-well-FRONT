import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent {

  constructor(public loginService: LoginService) { }



  registerForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })


  register() {

    if (this.loginService.user == null) {
      //ACA VA LA FUNCION REGISTRAR NUEVO USUARIO
    }
    else {
      //ACA VA LA FUNCION EDITAR USUARIO
    }

  }

}
