import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './models/user';
import { Profile } from './models/profile';
import { ProfileFiles } from './models/profileFiles';
import { Tribute } from './models/tribute';

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
        profiles.push(new Profile(prof.id, prof.idOw, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.ptofilePicUrl))
      })
    }
    this.user = data ? new User(data.id, data.mail, data.name, data.password, data.phone, data.admin, data.profiles) : null;
    this.token = tok;
    // Almacenar datos en el almacenamiento local
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({ user: data, token: tok }));
  }


  login(fg: FormGroup) {
    return this.http.post(this.baseUrl, {
      mail: fg.value.mail,
      password: fg.value.password
    })
  }


}
