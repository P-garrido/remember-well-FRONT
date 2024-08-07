import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Tribute } from './models/tribute';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TributesService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  baseUrl = environment.url + '/tributes';


  getByProfile(idProf: number) {
    const url = `${this.baseUrl}/${idProf}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  create(trib: Tribute) {
    return this.http.post(this.baseUrl, {
      idFall: trib.idProfile,
      text: trib.text,
      name: trib.name
    }).pipe(catchError(this.handleError));
  }


  delete(trib: Tribute) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${trib.id}`;
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
      this.loginService.setUserData(null, null);
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
