import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

    const storedData = sessionStorage.getItem(this.sessionStorageKey);
    this.user = storedData ? JSON.parse(storedData).user : null;
    this.token = storedData ? JSON.parse(storedData).token : null;
  }


  token: string | null = null;
  user: User | null = null;


  public sessionStorageKey = 'user_data';

  baseUrl = 'http://localhost:3000/users/login'



  setUserData(data: any, tok: string | null) {
    this.user = data ? new User(data.id, data.mail, data.name, data.password, data.phone, data.admin
    ) : null;
    this.token = tok;
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ user: data, token: tok }));
  }


  login(fg: FormGroup) {
    return this.http.post(this.baseUrl, {
      mail: fg.value.mail,
      password: fg.value.password
    })
  }


}
