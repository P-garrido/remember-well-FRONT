import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: any[] = [{ id: 1, mail: 'pedro@gmail.com', name: 'Pedro Garrido', phone: '5493413951826', admin: true },
  { id: 2, mail: 'juana@gmail.com', name: 'Juana Sin', phone: '5495488545266', admin: false }
  ];


  changeStatus(us: any) {
    us.admin = !us.admin; //CAMBIAR PARA BBDD  
  }

  delete(us: any) {
    let index = this.usuarios.indexOf(us);
    this.usuarios.splice(index, 1);  //CAMBIAR PARA BBDD  
  }

}
