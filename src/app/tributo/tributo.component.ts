import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tribute } from '../models/tribute';

@Component({
  selector: 'app-tributo',
  templateUrl: './tributo.component.html',
  styleUrls: ['./tributo.component.scss']
})
export class TributoComponent {


  @Input() tribute: Tribute = new Tribute(-1, -1, "");

  @Output() deleteTribute = new EventEmitter<Tribute>;


  ngOnInit() {
  }



  delete() {
    this.deleteTribute.emit(this.tribute)
  }

}
