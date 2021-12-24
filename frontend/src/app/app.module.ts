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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SUsuarioService } from './services/s-usuario.service';
import { EstadioComponent } from './components/estadio/estadio.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { AjusteclienteComponent } from './components/ajustecliente/ajustecliente.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearcuentaComponent,
    MenuClienteComponent,
    MenuEmpleadoComponent,
    MenuAdministradorComponent,
    EquipoComponent,
    EstadioComponent,
    TecnicoComponent,
    MembresiaComponent,
    AjusteclienteComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
