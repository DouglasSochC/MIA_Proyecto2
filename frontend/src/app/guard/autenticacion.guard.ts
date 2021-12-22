import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SUsuarioService } from '../services/s-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private autenticacionServicio: SUsuarioService, private router: Router) { }

  canActivate(){
    if (this.autenticacionServicio.getUsuarioActual()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
