import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CrearcuentaComponent } from './components/crearcuenta/crearcuenta.component';
import { MenuClienteComponent } from './components/menu-cliente/menu-cliente.component';
import { MenuEmpleadoComponent } from './components/menu-empleado/menu-empleado.component';
import { MenuAdministradorComponent } from './components/menu-administrador/menu-administrador.component';
import { EquipoComponent } from './components/equipo/equipo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearcuentaComponent,
    MenuClienteComponent,
    MenuEmpleadoComponent,
    MenuAdministradorComponent,
    EquipoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
