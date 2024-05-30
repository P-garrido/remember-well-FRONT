import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './models/user';
import { Profile } from './models/profile';
import { ProfileFiles } from './models/profileFiles';
import { Tribute } from './models/tribute';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

    const storedData = sessionStorage.getItem(this.sessionStorageKey);
    this.user = storedData ? JSON.parse(storedData).user : null;
    this.token = storedData ? JSON.parse(storedData).token : null;
  }


  token: string | null = null;
  user: User | null = null;


  public sessionStorageKey = 'user_data';

  baseUrl = environment.url + '/users/login';



  setUserData(data: any, tok: string | null) {
    if (data != null) {
      if (data.profiles != null) {
        let profiles: Array<Profile> = [];
        data.profiles.forEach((prof: any) => {
          let files: Array<ProfileFiles> = [];
          prof.DeceasedFiles.forEach((fi: any) => { //CREO UN ARREGLO DE ARCHIVOS CON LOS QUE TRAE EL PERFIL
            let file = new ProfileFiles(fi.id, fi.idFall, fi.fileUrl, fi.extention);
            files.push(file);
          });
          let tributes: Array<Tribute> = [];
          prof.Tributes.forEach((tr: any) => { //CREO UN ARREGLO DE TRIBUTOS CON LOS QUE TRAE EL PERFIL
            let tribute = new Tribute(tr.id, tr.idFall, tr.text);
            tributes.push(tribute);
          });
          //aca tengo que traer los ids de los editores
          let editors: Array<User> = []
          prof.Users.forEach((us: any) => {
            editors.push(new User(us.id, us.mail, us.name, us.password, us.phone, us.admin, []))
          })
          profiles.push(new Profile(prof.id, prof.idOw, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.ptofilePicUrl, editors))
        })
        this.user = new User(data.id, data.mail, data.name, data.password, data.phone, data.admin, profiles);
      }
      else {
        this.user = new User(data.id, data.mail, data.name, data.password, data.phone, data.admin, []);
      }

    }
    else {
      this.user = null;
    }
    this.token = tok;
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ user: data, token: tok }));
  }



  login(fg: FormGroup) {
    return this.http.post(this.baseUrl, {
      mail: fg.value.mail,
      password: fg.value.password
    }).pipe(catchError(this.handleError));
  }

  getOneUser() { //Esto lo hago para poder recuperar los perfiles recién creados
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${environment.url}/users/${this.user!.id}`
    return this.http.get(url, { headers }).pipe(catchError(this.handleError));

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
    else if (error.status === 404) {
      errorMessage = 'Mail o contraseña incorrectos'
      alert(errorMessage);
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
