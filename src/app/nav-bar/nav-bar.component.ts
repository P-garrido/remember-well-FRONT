import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  profiles: any[] = [{ id: 1, name: 'jose' }, { id: 2, name: 'carla' }];

}
