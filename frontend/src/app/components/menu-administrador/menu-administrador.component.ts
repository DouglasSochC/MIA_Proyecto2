import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {

  constructor(public autenticacion: SUsuarioService) { }

  ngOnInit(): void {
  }

  CerrarSesion(){
    this.autenticacion.logoutUsuario();
  }

}
