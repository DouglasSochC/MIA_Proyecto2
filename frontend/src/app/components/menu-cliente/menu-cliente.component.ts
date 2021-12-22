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

  CerrarSesion(){
    this.autenticacion.logoutUsuario();
  }

}
