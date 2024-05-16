import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }


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

    let errorMessage: string = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocurrió un error:', error.error);
      errorMessage = error.message;
    }
    else if (error.status === 401) {
      errorMessage = 'Se acabó el tiempo de tu sesión, o no iniciaste. Inicia sesión nuevamente'
      alert(errorMessage);
      this.router.navigate(['/login'])
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`El servidor devolvió un código ${error.status}, el mensaje fue: `, error.error);
      errorMessage = error.message;
    }
    return throwError(() => new Error(`Ocurrió un error inesperado: ${errorMessage}`));
  }

}
