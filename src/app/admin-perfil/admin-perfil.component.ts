import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileFiles } from '../models/profileFiles';
import { ProfileService } from '../profile.service';
import { Tribute } from '../models/tribute';
import { Profile } from '../models/profile';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.scss']
})
export class AdminPerfilComponent {

  constructor(private route: ActivatedRoute, private service: ProfileService, private router: Router, private loginService: LoginService) { }


  profileId: string | null = null;



  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
    });
    this.getProfile()
    this.patchForm()

  }

  profile: Profile = new Profile(-1, -1, "", new Date(), "", "", [], [], "");



  profileInfo = new FormGroup({
    porfilePicture: new FormControl(),
    name: new FormControl(),
    death: new FormControl(),
    playlist: new FormControl(),
    aboutMe: new FormControl()
  })



  getProfile() {
    this.service.getById(parseInt(this.profileId!)).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((prof: any) => {
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
      let profi = new Profile(prof.id, prof.idOwner, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.profilePicUrl);

      this.profile = profi
      this.patchForm()
    })

  }


  patchForm() {
    this.profileInfo.controls.name.patchValue(this.profile.name);
    this.profileInfo.controls.death.patchValue(String(this.profile.deathDate).substring(0, 10));
    this.profileInfo.controls.playlist.patchValue(this.profile.playlist);
    this.profileInfo.controls.aboutMe.patchValue(this.profile.aboutMe);
  }


  edit(file: HTMLInputElement) {

    const formData = new FormData();
    formData.append('name', this.profileInfo.value.name);
    formData.append('deathDate', this.profileInfo.value.death);
    formData.append('aboutMe', this.profileInfo.value.aboutMe);
    formData.append('playlist', this.profileInfo.value.playlist);
    if (file.files![0] != undefined) {
      formData.append('file', file.files![0]);
    }
    this.service.edit(formData, parseInt(this.profileId!)).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.router.navigate([`/perfiles/${this.profileId}`])
    })
  }
}
