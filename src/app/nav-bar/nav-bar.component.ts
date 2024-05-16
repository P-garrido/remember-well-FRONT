import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Profile } from '../models/profile';
import { ProfileService } from '../profile.service';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public loginService: LoginService, private profileService: ProfileService, private router: Router) {

  }


  profiles: Array<Profile> = [];


  ngOnInit(): void {
    this.router.events.subscribe(event => { //HACE QUE CARGIEN LOS PERFILES CUANDO CAMBIE DE LINK
      if (event instanceof NavigationEnd) {
        if (this.loginService.user != null) {
          this.getProfiles();
        }
        else {
          this.profiles.splice(0, this.profiles.length)
        }
      }
    });
  }





  getProfiles() {
    this.loginService.getOneUser().subscribe((res: any) => {
      this.loginService.setUserData({ id: res.id, mail: res.mail, password: res.password, name: res.name, admin: res.admin, phone: res.phone, profiles: res.Deceaseds }, this.loginService.token)
      this.profiles = this.loginService.user!.profiles;
    })

  }

}
