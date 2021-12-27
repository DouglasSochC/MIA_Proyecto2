import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SUsuarioService } from '../services/s-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private autenticacionServicio: SUsuarioService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    
    //RECORDAR: HAY QUE VALIDAR SI EL CLIENTE TIENE MEMBRESIA O NO PARA DAR PERMISOS A LAS PAGINAS
    if (this.autenticacionServicio.getUsuarioActual()) {
      if (this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Empleado") {
        if (route.url[0]['path'] == "menu_empleado") {
          return true;
        }else if (route.url[0]['path'] == "jugador") {
          return true;
        }else if (route.url[0]['path'] == "tecnico") {
          return true;
        }else if (route.url[0]['path'] == "estadio") {
          return true;
        }else if (route.url[0]['path'] == "equipo") {
          return true;
        }else if (route.url[0]['path'] == "partido") {
          return true;
        }else if (route.url[0]['path'] == "competencia") {
          return true;
        }else if (route.url[0]['path'] == "transferenciajugador") {
          return true;
        }else if (route.url[0]['path'] == "transferenciatecnico") {
          return true;
        }else if (route.url[0]['path'] == "estadopartido") {
          return true;
        }else if (route.url[0]['path'] == "incidenciaspartido") {
          return true;
        }else if (route.url[0]['path'] == "estadojugador") {
          return true;
        }else if (route.url[0]['path'] == "estadotecnico") {
          return true;
        }else if (route.url[0]['path'] == "publicarnoticia") {
          return true;
        }else if (route.url[0]['path'] == "accesodenegado") {
          return true;
        }else{
          this.router.navigate(['/accesodenegado']);
          return false;
        }
      }else if(this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Cliente"){
        if (route.url[0]['path'] == "menu_cliente") {
          return true;
        }else if(route.url[0]['path'] == "membresia"){
          return true;
        }else if(route.url[0]['path'] == "ajustecliente"){
          return true;
        }else if(route.url[0]['path'] == "informacionpartido"){
          return true;
        }else if(route.url[0]['path'] == "noticias" && this.autenticacionServicio.getUsuarioActual()['membresia_activa'] == "1"){
          return true;
        }else if(route.url[0]['path'] == "consultaestadistica" && this.autenticacionServicio.getUsuarioActual()['membresia_activa'] == "1"){
          return true;
        }else if (route.url[0]['path'] == "accesodenegado") {
          return true;
        }else if (route.url[0]['path'] == "seguirequipo") {
          return true;
        }else{
          this.router.navigate(['/accesodenegado']);
          return false;
        }
      }else if(this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Administrador"){
        if (route.url[0]['path'] == "menu_administrador") {
          return true;
        }else if (route.url[0]['path'] == "cargamasiva") {
          return true;
        }else if(route.url[0]['path'] == "reportesadministrador"){
          return true;
        }else if(route.url[0]['path'] == "usuarios"){
          return true;
        }else if (route.url[0]['path'] == "jugador") {
          return true;
        }else if (route.url[0]['path'] == "tecnico") {
          return true;
        }else if (route.url[0]['path'] == "estadio") {
          return true;
        }else if (route.url[0]['path'] == "equipo") {
          return true;
        }else if (route.url[0]['path'] == "partido") {
          return true;
        }else if (route.url[0]['path'] == "competencia") {
          return true;
        }else if (route.url[0]['path'] == "transferenciajugador") {
          return true;
        }else if (route.url[0]['path'] == "transferenciatecnico") {
          return true;
        }else if (route.url[0]['path'] == "estadopartido") {
          return true;
        }else if (route.url[0]['path'] == "incidenciaspartido") {
          return true;
        }else if (route.url[0]['path'] == "estadojugador") {
          return true;
        }else if (route.url[0]['path'] == "estadotecnico") {
          return true;
        }else if (route.url[0]['path'] == "publicarnoticia") {
          return true;
        }else if (route.url[0]['path'] == "accesodenegado") {
          return true;
        }else{
          this.router.navigate(['/accesodenegado']);
          return false;
        }
      }
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
