import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Profile } from '../models/profile';
import { ProfileService } from '../profile.service';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public loginService: LoginService, private profileService: ProfileService, private router: Router) {
    if (loginService.user != null) {
      this.getProfiles();
    }
  }


  profiles: Array<Profile> = [];


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Realiza la lógica que desees aquí
        if (this.loginService.user != null) {
          this.getProfiles();
        }
        else {
          this.profiles.splice(0, this.profiles.length)
        }
      }
    });
  }


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
