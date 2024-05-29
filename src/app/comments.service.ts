import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Comment } from './models/coments';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }


  baseUrl = "http://localhost:80/comments"


  getAll() {
    return this.http.get(this.baseUrl)
  }

  create(com: Comment) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, {
      text: com.text,
      stars: com.stars,
      idUser: com.user.id
    }, { headers }).pipe(catchError(this.handleError));
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
