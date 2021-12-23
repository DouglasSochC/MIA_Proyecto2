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
    
    return true;
    //RECORDAR: HAY QUE VALIDAR SI EL CLIENTE TIENE MEMBRESIA O NO PARA DAR PERMISOS A LAS PAGINAS
    // if (this.autenticacionServicio.getUsuarioActual()) {
    //   if (this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Empleado") {
    //     if (route.url[0]['path'] == "menu_empleado") {
    //       return true;
    //     }else if (route.url[0]['path'] == "equipo") {
    //       return true;
    //     }
    //   }else if(this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Cliente"){
        
    //   }else if(this.autenticacionServicio.getUsuarioActual()['tipo_usuario'] == "Administrador"){

    //   }
    //   return false;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
  
}
