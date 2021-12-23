import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {

  constructor(public autenticacion: SUsuarioService) { }

  ngOnInit(): void {
  }

  membresia_activa: number = -1;

  CerrarSesion(){
    this.autenticacion.logoutUsuario();
  }

  VerMembresia(){
    if (this.autenticacion.getUsuarioActual()) {
      return this.autenticacion.getUsuarioActual()['membresia_activa'];
    }else{
      return 0;
    }
  }

}
