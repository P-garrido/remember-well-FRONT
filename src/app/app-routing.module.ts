import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'preguntasfrecuentes', component: PreguntasFrecuentesComponent },
  { path: 'pedidos', component: PedidosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
