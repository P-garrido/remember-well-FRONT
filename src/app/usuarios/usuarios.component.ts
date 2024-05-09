import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {


  constructor(private service: UserService, private router: Router, public loginService: LoginService) {
    this.getAllUsers()
  }

  usuarios: Array<User> = [];


  getAllUsers() {
    this.usuarios.splice(0, this.usuarios.length);
    this.service.getAll().pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      res.forEach((usu: any) => {
        this.usuarios.push(new User(usu.id, usu.mail, usu.name, usu.password, usu.phone, usu.admin, []));
      })
    })
  }


  changeStatus(us: User) {
    this.service.changeStatus(us).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getAllUsers();
    })
  }

  delete(us: User) {
    this.service.delete(us).pipe(catchError((error: any) => {
      alert(`ERROR: ${error}`);
      if (error = "Terminó el tiempo de tu sesión o no iniciaste sesión, inicia sesión nuevamente") {
        this.loginService.setUserData(null, null);
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })).subscribe((res: any) => {
      this.getAllUsers();
    })
  }

}
