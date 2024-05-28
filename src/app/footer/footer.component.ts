import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor() {

  }

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
}
