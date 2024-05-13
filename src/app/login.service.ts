import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './models/user';
import { Profile } from './models/profile';
import { ProfileFiles } from './models/profileFiles';
import { Tribute } from './models/tribute';
import { catchError, throwError } from 'rxjs';

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
    if (data != null) {
      if (data.profiles != null) {
        let profiles: Array<Profile> = [];
        data.profiles.forEach((prof: any) => {
          let files: Array<ProfileFiles> = [];
          prof.DeceasedFiles.forEach((fi: any) => { //CREO UN ARREGLO DE ARCHIVOS CON LOS QUE TRAE EL PERFIL
            let file = new ProfileFiles(fi.id, fi.idFall, fi.fileUrl);
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
    const url = `http://localhost:3000/users/${this.user!.id}`
    return this.http.get(url, { headers }).pipe(catchError(this.handleError));

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
