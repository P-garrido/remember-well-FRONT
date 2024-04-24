import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {

    const storedData = sessionStorage.getItem(this.sessionStorageKey);
    this.user = storedData ? JSON.parse(storedData).user : null;
    this.token = storedData ? JSON.parse(storedData).token : null;
  }


  token: string | null = null;
  user: any = null;


  public sessionStorageKey = 'user_data';



  setUserData(data: any, tok: string | null) {
    this.user = data;
    this.token = tok;
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ user: data, token: tok }));
  }


}
