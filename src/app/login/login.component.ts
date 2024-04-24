import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private service: LoginService) { }


  loginForm = new FormGroup({
    mail: new FormControl(),
    password: new FormControl()
  });


  getOneUser() {
    this.service.setUserData({ mail: this.loginForm.value.mail, password: this.loginForm.value.password }, "tokenPrueba");
  }




}
