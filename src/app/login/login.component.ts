import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    mail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  getOneUser() {

    this.service.login(this.loginForm).subscribe((res: any) => {
      this.service.setUserData({ id: res.user.id, mail: res.user.mail, password: res.user.password, name: res.user.name, admin: res.user.admin, phone: res.user.phone, profiles: res.user.Deceaseds }, res.token);
      this.router.navigate(['/inicio'])
    })


  }




}
