import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'preguntasfrecuentes', component: PreguntasFrecuentesComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'adminProductos', component: AdminProductosComponent },
  { path: 'agregarProducto', component: AgregarProductoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'perfiles/:id', component: PerfilComponent },
  { path: 'adminPerfil/:id', component: AdminPerfilComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'paymentSuccess', component: PaymentSuccessComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
