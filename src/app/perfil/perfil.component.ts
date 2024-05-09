import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../models/profile';
import { ProfileFiles } from '../models/profileFiles';
import { Tribute } from '../models/tribute';
import { ProfileService } from '../profile.service';
import { ProfileFilesService } from '../profile-files.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {



  constructor(private route: ActivatedRoute, private router: Router, private service: ProfileService, private profileFilesService: ProfileFilesService) {

  }
  profileId: string | null = null;

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
    });
    this.getProfile();


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
      let profi = new Profile(prof.id, prof.idOwner, prof.name, prof.deathDate, prof.aboutMe, prof.playlist, files, tributes, prof.profilePicUrl);

      this.profile = profi
    })

  }


  editProfile() {
    this.router.navigate([`/adminPerfil/${this.profileId}`])
  }

  addFiles() { //FALTA HACER QUE FILESINPUT VAYA AL BACK MEDIANTE UN FORMDATA

    const filesInput = <HTMLInputElement>document.getElementById('floatingInput')
    const fd = new FormData();
    fd.append('idFall', this.profileId!);
    if (filesInput.files != null) {
      Array.from(filesInput.files).forEach((file: any) => {
        fd.append('files', file)
      })
    }
    this.profileFilesService.create(fd).subscribe((res: any) => {
      this.onEditFiles = false;
      this.getProfile()
    })


  }


  addEditors() {
    //ACA VOY A PEDIR EL MAIL A DEL USUARIO A INVITAR
  }

  deleteFile(event: ProfileFiles) { //TESTEAR
    this.profileFilesService.delete(event).subscribe((res: any) => {
      this.getProfile();
    })
  }


  sendTribute() {
    //HACER PARA ENVIAR TRIBUTOS A LA BBDD
  }
}
