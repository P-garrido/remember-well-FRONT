import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileFiles } from './models/profileFiles';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileFilesService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  baseUrl = 'http://localhost:3000/deceasedFiles'


  delete(file: ProfileFiles) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${file.id}`
    return this.http.delete(url, { headers }).pipe(catchError(this.handleError));
  }


  create(fd: FormData) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, fd, { headers }).pipe(catchError(this.handleError));
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
