import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl = 'http://localhost:3000/users';


  getOne(id: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers })
  }


  create(fg: FormGroup) {
    return this.http.post(this.baseUrl, {
      mail: fg.value.mail,
      name: fg.value.name,
      password: fg.value.password,
      phone: fg.value.phone,
      admin: false
    })
  }


  edit(fg: FormGroup, idUser: number, admin: boolean) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${idUser}`
    return this.http.patch(url, {
      name: fg.value.name,
      password: fg.value.password,
      phone: fg.value.phone,
      admin: admin
    }, { headers })
  }
}
