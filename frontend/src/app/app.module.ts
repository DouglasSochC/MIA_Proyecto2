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
import { AccesodenegadoComponent } from './components/accesodenegado/accesodenegado.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { PartidoComponent } from './components/partido/partido.component';
import { CompetenciaComponent } from './components/competencia/competencia.component';
import { TransferenciajugadorComponent } from './components/transferenciajugador/transferenciajugador.component';
import { TransferenciatecnicoComponent } from './components/transferenciatecnico/transferenciatecnico.component';
import { EstadopartidoComponent } from './components/estadopartido/estadopartido.component';
import { IncidenciaspartidoComponent } from './components/incidenciaspartido/incidenciaspartido.component';
import { EstadojugadorComponent } from './components/estadojugador/estadojugador.component';
import { EstadotecnicoComponent } from './components/estadotecnico/estadotecnico.component';
import { PublicarnoticiaComponent } from './components/publicarnoticia/publicarnoticia.component';
import { InformacionpartidoComponent } from './components/informacionpartido/informacionpartido.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ConsultaestadisticaComponent } from './components/consultaestadistica/consultaestadistica.component';
import { ReportesadministradorComponent } from './components/reportesadministrador/reportesadministrador.component';
import { SeguirequipoComponent } from './components/seguirequipo/seguirequipo.component';

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
    UsuariosComponent,
    AccesodenegadoComponent,
    JugadorComponent,
    PartidoComponent,
    CompetenciaComponent,
    TransferenciajugadorComponent,
    TransferenciatecnicoComponent,
    EstadopartidoComponent,
    IncidenciaspartidoComponent,
    EstadojugadorComponent,
    EstadotecnicoComponent,
    PublicarnoticiaComponent,
    InformacionpartidoComponent,
    NoticiasComponent,
    ConsultaestadisticaComponent,
    ReportesadministradorComponent,
    SeguirequipoComponent
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
