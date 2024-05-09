import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Tribute } from './models/tribute';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TributesService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  baseUrl = 'http://localhost:3000/tributes'


  getByProfile(idProf: number) {
    const url = `${this.baseUrl}/${idProf}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  create(trib: Tribute) {
    return this.http.post(this.baseUrl, {
      idFall: trib.idProfile,
      text: trib.text
    }).pipe(catchError(this.handleError));
  }


  delete(trib: Tribute) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${trib.id}`;
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
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
