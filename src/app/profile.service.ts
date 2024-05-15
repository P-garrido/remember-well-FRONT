import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl = 'http://localhost:3000/deceased'



  getById(id: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${id}`;

    return this.http.get(url, { headers }).pipe(catchError(this.handleError));
  }

  getAll() {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl, { headers }).pipe(catchError(this.handleError));
  }



  create() {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, {
      idOwner: this.loginService.user?.id,
      name: null,
      deathDate: null,
      aboutMe: null,
      playlist: null,
      profilePicUrl: null
    }, { headers }).pipe(catchError(this.handleError));
  }


  edit(fd: FormData, id: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch(url, fd, { headers }).pipe(catchError(this.handleError));

  }


  addEditor(mail: string, idProf: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/editors`;
    return this.http.post(url, {
      idFall: idProf,
      mail: mail
    }, { headers }).pipe(catchError(this.handleError));
  }

  removeEditor(idUser: number, idProf: number) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/editors/${idProf}/${idUser}`;
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
  }







  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError("Terminó el tiempo de tu sesión, inicia sesión nuevamente");
    }
    else {
      return throwError(`Ocurrió un error inesperado:, ${error.message}`);
    }
  }

}