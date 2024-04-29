import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tributo',
  templateUrl: './tributo.component.html',
  styleUrls: ['./tributo.component.scss']
})
export class TributoComponent {


  @Input() message = '';


  ngOnInit() {
  }

}
