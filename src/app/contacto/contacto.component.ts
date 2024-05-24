import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {


  mailForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  })








  sendMail() {
    //ACA VA A MANDAR UN MAIL A LOS DUEÑOS
  }

}
