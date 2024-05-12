import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl = 'http://localhost:3000/users';



  getAll() {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl, { headers }).pipe(catchError(this.handleError));
  }


  getOne(id: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers }).pipe(catchError(this.handleError));
  }


  create(fg: FormGroup) {
    return this.http.post(this.baseUrl, {
      mail: fg.value.mail,
      name: fg.value.name,
      password: fg.value.password,
      phone: fg.value.phone,
      admin: false
    }).pipe(catchError(this.handleError));
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
    }, { headers }).pipe(catchError(this.handleError));
  }


  changeStatus(us: User) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.patch(url, {
      mail: us.mail,
      name: us.name,
      password: us.password,
      phone: us.phone,
      admin: !us.admin,
    }, { headers }).pipe(catchError(this.handleError));
  }


  delete(us: User) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${us.id}`;
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
  }


  getEditors(idsUser: Array<number>) { //función que va a devolver todos los usuarios con permisos de edición de un perfil
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, { idsUser }, { headers }).pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError("Terminó el tiempo de tu sesión, inicia sesión nuevamente");
    } else {
      console.error('Ocurrió un error inesperado:', error.message);
      alert(`ERROR: ${error.message}`)
    }

    return throwError('Algo salió mal, inténtalo de nuevo más tarde.');
  }
}
