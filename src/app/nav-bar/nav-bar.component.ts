import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Profile } from '../models/profile';
import { ProfileService } from '../profile.service';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public loginService: LoginService, private profileService: ProfileService) {
    if (loginService.user != null) {
      this.getProfiles();
    }
  }


  profiles: Array<Profile> = [];

  ngOnChanges() {
    if (this.loginService.user != null) {
      this.getProfiles();
    }
  }


  getProfiles() {
    this.profiles.splice(0, this.profiles.length);
    this.profileService.getAll().subscribe((res: any) => {
      res.forEach((prof: any) => {
        let files: Array<ProfileFiles> = [];
        prof.DeceasedFiles.forEach((fi: any) => { //CREO UN ARREGLO DE ARCHIVOS CON LOS QUE TRAE EL PERFIL
          let file = new ProfileFiles(fi.id, fi.idFall, fi.fileUrl);
          files.push(file);
        });
        let tributes: Array<Tribute> = [];
        prof.Tributes.forEach((tr: any) => { //CREO UN ARREGLO DE TRIBUTOS CON LOS QUE TRAE EL PERFIL
          let tribute = new Tribute(tr.id, tr.idFall, tr.text);
          tributes.push(tribute);
        })
        let profile = new Profile(prof.id, prof.idOwner, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.profilePicUrl);
        this.profiles.push(profile);
      })
    })
  }

}
