import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {


  constructor(private route: ActivatedRoute) { }
  productId: string | null = null;

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log(this.productId)
    });
  }
}
