import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private service: LoginService, private router: Router) { }


  loginForm = new FormGroup({
    mail: new FormControl(),
    password: new FormControl()
  });


  getOneUser() {
    this.service.setUserData({ mail: this.loginForm.value.mail, password: this.loginForm.value.password }, "tokenPrueba");
    this.router.navigate(['/inicio'])

  }




}
