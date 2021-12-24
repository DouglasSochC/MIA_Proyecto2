import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-menu-empleado',
  templateUrl: './menu-empleado.component.html',
  styleUrls: ['./menu-empleado.component.css']
})
export class MenuEmpleadoComponent implements OnInit {

  constructor(public autenticacion: SUsuarioService) { }

  ngOnInit(): void {
  }

  mostrarNombre(){
    if (this.autenticacion.getUsuarioActual()) {
      return "¡Bienvenido! " + this.autenticacion.getUsuarioActual()['nombres'];
    }else{
      return "";
    }
  }

  CerrarSesion(){
    this.autenticacion.logoutUsuario();
  }

}
