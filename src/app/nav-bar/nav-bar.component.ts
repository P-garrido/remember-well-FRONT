import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public loginService: LoginService) { }


  profiles: any[] = [{ id: 1, name: 'jose' }, { id: 2, name: 'carla' }];

}
