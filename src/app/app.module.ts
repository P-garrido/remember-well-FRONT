import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GaleriaComponent } from './galeria/galeria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TributoComponent } from './tributo/tributo.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InicioComponent,
    FooterComponent,
    ProductosComponent,
    PreguntasFrecuentesComponent,
    PedidosComponent,
    UsuariosComponent,
    AdminProductosComponent,
    AgregarProductoComponent,
    ContactoComponent,
    LoginComponent,
    RegistrarseComponent,
    PerfilComponent,
    GaleriaComponent,
    TributoComponent,
    AdminPerfilComponent,
    CarritoComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
