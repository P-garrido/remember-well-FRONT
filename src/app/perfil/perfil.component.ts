import { Component, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../models/profile';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';
import { ProfileService } from '../profile.service';
import { ProfileFilesService } from '../profile-files.service';
import { TributesService } from '../tributes.service';
import { LoginService } from '../login.service';
import { Subscription, catchError, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {




  constructor(private route: ActivatedRoute, private router: Router, private modalService: BsModalService, private service: ProfileService, private profileFilesService: ProfileFilesService, private tributesService: TributesService, public loginService: LoginService, private usersService: UserService) {

  }
  profileId: string | null = null;



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
      this.getProfile();
      console.log(this.profileId);
    });
  }





  profile: Profile = new Profile(-1, -1, "", new Date(), "", "", [], [], "", []);

  editorIds: Array<number> = [];



  tribute = new FormControl('', Validators.required);

  mailEditor = new FormControl('', [Validators.required, Validators.email]);

  onEditFiles: boolean = false;




  modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }






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
      if (prof.DeceasedFiles) {
        prof.DeceasedFiles.forEach((fi: any) => { //CREO UN ARREGLO DE ARCHIVOS CON LOS QUE TRAE EL PERFIL
          let file = new ProfileFiles(fi.id, fi.idFall, fi.fileUrl, fi.extention);
          files.push(file);
        });
      }
      let tributes: Array<Tribute> = [];
      if (prof.Tributes) {

        prof.Tributes.forEach((tr: any) => { //CREO UN ARREGLO DE TRIBUTOS CON LOS QUE TRAE EL PERFIL
          let tribute = new Tribute(tr.id, tr.idFall, tr.text);
          tributes.push(tribute);
        });
      }
      let editors: Array<User> = []
      if (prof.Users) {

        prof.Users.forEach((us: any) => {
          editors.push(new User(us.id, us.mail, us.name, us.password, us.phone, us.admin, []));
          this.editorIds.push(us.id);
        })
      }


      let profi = new Profile(prof.id, prof.idOwner, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.profilePicUrl, editors);

      this.profile = profi
    })

  }


  editProfile() {
    this.router.navigate([`/adminPerfil/${this.profileId}`])
  }

  addFiles() {

    const filesInput = <HTMLInputElement>document.getElementById('floatingInput')
    const fd = new FormData();
    fd.append('idFall', this.profileId!);
    if (filesInput.files != null) {
      Array.from(filesInput.files).forEach((file: any) => {
        fd.append('files', file)
      })
    }
    this.profileFilesService.create(fd).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
      this.onEditFiles = false;
    })
  }



  addEditor() {
    this.service.addEditor(this.mailEditor.value!, this.profile.id).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
    })
  }

  removeEditor(idUsu: number) {
    this.service.removeEditor(idUsu, this.profile.id).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
    })
  }




  deleteFile(event: ProfileFiles) {
    this.profileFilesService.delete(event).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
    })
  }


  sendTribute() {
    const trib = new Tribute(null, parseInt(this.profileId!), this.tribute.value!);
    this.tributesService.create(trib).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
      this.tribute.reset();
    })

  }


  deleteTribute(trib: Tribute) {
    this.tributesService.delete(trib).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getProfile();
    })
  }
}
