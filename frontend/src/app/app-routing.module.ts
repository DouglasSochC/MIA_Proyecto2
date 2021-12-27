import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { CrearcuentaComponent } from "./components/crearcuenta/crearcuenta.component";
import { MenuAdministradorComponent } from './components/menu-administrador/menu-administrador.component';
import { MenuClienteComponent } from './components/menu-cliente/menu-cliente.component';
import { MenuEmpleadoComponent } from './components/menu-empleado/menu-empleado.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { AutenticacionGuard } from './guard/autenticacion.guard';
import { EstadioComponent } from './components/estadio/estadio.component';
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
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { SeguirequipoComponent } from './components/seguirequipo/seguirequipo.component';
import { CargamasivaComponent } from './components/cargamasiva/cargamasiva.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'crearcuenta',
    component: CrearcuentaComponent
  },
  {
    path: 'menu_administrador',
    component: MenuAdministradorComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: 'menu_cliente',
    component: MenuClienteComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: 'menu_empleado',
    component: MenuEmpleadoComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: 'equipo',
    component: EquipoComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: 'estadio',
    component: EstadioComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: 'membresia',
    component: MembresiaComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'ajustecliente',
    component: AjusteclienteComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'jugador',
    component: JugadorComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'partido',
    component: PartidoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'competencia',
    component: CompetenciaComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'transferenciajugador',
    component: TransferenciajugadorComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'transferenciatecnico',
    component: TransferenciatecnicoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'estadopartido',
    component: EstadopartidoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'incidenciaspartido',
    component: IncidenciaspartidoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'estadojugador',
    component: EstadojugadorComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'estadotecnico',
    component: EstadotecnicoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'publicarnoticia',
    component: PublicarnoticiaComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'informacionpartido',
    component: InformacionpartidoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'consultaestadistica',
    component: ConsultaestadisticaComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'reportesadministrador',
    component: ReportesadministradorComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'tecnico',
    component: TecnicoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'accesodenegado',
    component: AccesodenegadoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'seguirequipo',
    component: SeguirequipoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'cargamasiva',
    component: CargamasivaComponent,
    canActivate: [AutenticacionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

