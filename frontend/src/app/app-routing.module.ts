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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

