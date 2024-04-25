import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.scss']
})
export class AdminPerfilComponent {

  profileInfo = new FormGroup({
    porfilePicture: new FormControl(),
    name: new FormControl(),
    death: new FormControl(),
    playlist: new FormControl(),
    aboutMe: new FormControl()
  })

}
