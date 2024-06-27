import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileFiles } from '../models/profileFiles';
import { ProfileService } from '../profile.service';
import { Tribute } from '../models/tribute';
import { Profile } from '../models/profile';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from '../models/user';

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
    this.profileInfo.invalid;
    this.profileInfo.markAllAsTouched();
  }

  profile: Profile = new Profile(-1, -1, "", new Date(), new Date(), "", [], [], "", "", []);



  profileInfo = new FormGroup({
    porfilePicture: new FormControl(),
    backPicture: new FormControl(),
    name: new FormControl('', Validators.required),
    birth: new FormControl('', Validators.required),
    death: new FormControl('', Validators.required),
    aboutMe: new FormControl()
  })



  getProfile() {
    this.service.getById(parseInt(this.profileId!)).subscribe((prof: any) => {
      let files: Array<ProfileFiles> = [];
      if (prof.DeceasedFiles) {
        prof.DeceasedFiles.forEach((fi: any) => { //CREO UN ARREGLO DE ARCHIVOS CON LOS QUE TRAE EL PERFIL
          let file = new ProfileFiles(fi.id, fi.idFall, fi.fileUrl, "");
          files.push(file);
        });
      }

      let tributes: Array<Tribute> = [];
      if (prof.tributes) {
        prof.Tributes.forEach((tr: any) => { //CREO UN ARREGLO DE TRIBUTOS CON LOS QUE TRAE EL PERFIL
          let tribute = new Tribute(tr.id, tr.idFall, tr.name, tr.text);
          tributes.push(tribute);
        });
      }

      let editors: Array<User> = []
      if (prof.Users) {
        prof.Users.forEach((us: any) => {
          editors.push(new User(us.id, us.mail, us.name, us.password, us.phone, us.admin, []))
        })
      }

      let profi = new Profile(prof.id, prof.idOwner, prof.name, prof.birthDate, prof.deathDate, prof.aboutMe, files, tributes, prof.backPicUrl, prof.profilePicUrl, editors);

      this.profile = profi
      this.patchForm()
    })

  }


  patchForm() {
    this.profileInfo.controls.name.patchValue(this.profile.name);
    this.profileInfo.controls.birth.patchValue(String(this.profile.birthDate).substring(0, 10));
    this.profileInfo.controls.death.patchValue(String(this.profile.deathDate).substring(0, 10));
    this.profileInfo.controls.aboutMe.patchValue(this.profile.aboutMe);
  }


  edit(profPic: HTMLInputElement, backPic: HTMLInputElement) {

    const formData = new FormData();
    formData.append('name', this.profileInfo.value.name!);
    formData.append('birthDate', this.profileInfo.value.birth!);
    formData.append('deathDate', this.profileInfo.value.death!);
    formData.append('aboutMe', this.profileInfo.value.aboutMe);
    if (profPic.files![0] != undefined) {
      formData.append('profPic', profPic.files![0]);
    }
    if (backPic.files![0] != undefined) {
      formData.append('backPic', backPic.files![0]);
    }

    this.service.edit(formData, parseInt(this.profileId!)).subscribe((res: any) => {
      this.router.navigate([`/perfiles/${this.profileId}`])
    })
  }
}
