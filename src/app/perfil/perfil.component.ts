import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../models/profile';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {



  constructor(private route: ActivatedRoute, private router: Router, private service: ProfileService) {
    this.getProfile;
  }
  profileId: string | null = null;

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
    });
  }

  profile: Profile = new Profile(-1, -1, "", new Date(), "", "", [], [], "");



  tribute = new FormControl();

  onEditFiles: boolean = false;

  getProfile() {
    this.service.getById(parseInt(this.profileId!)).subscribe((prof: any) => {
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
      let profile = new Profile(prof.id, prof.idOwner, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.profilePicUrl);
      this.profile = profile;
    })
  }


  editProfile() {
    this.router.navigate(['/adminPerfil'])
  }

  editFiles() { //FALTA HACER QUE FILESINPUT VAYA AL BACK MEDIANTE UN FORMDATA

    const filesInput = <HTMLInputElement>document.getElementById('floatingInput')

    console.log(filesInput.files)

    this.onEditFiles = false;

  }


  addEditors() {
    //ACA VOY A PEDIR EL MAIL A DEL USUARIO A INVITAR
  }

  deleteFile(event: number) { //VER SI HAY Q CAMBIAR PARÁMETRO
    //HACER PARA BORRAR IMÁGENES DE LA BBDD
  }


  sendTribute() {
    //HACER PARA ENVIAR TRIBUTOS A LA BBDD
  }
}
