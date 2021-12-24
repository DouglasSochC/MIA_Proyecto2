import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-accesodenegado',
  templateUrl: './accesodenegado.component.html',
  styleUrls: ['./accesodenegado.component.css']
})
export class AccesodenegadoComponent implements OnInit {

  constructor(public autenticacion: SUsuarioService) { }

  ngOnInit(): void {
    this.paginaRetorno();
  }

  link_retorno:string = "./";

  paginaRetorno(){
    if (this.autenticacion.getUsuarioActual()) {
      if (this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Empleado") {
        this.link_retorno = "./menu_empleado";
      }else if(this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Cliente"){
        this.link_retorno = "./menu_cliente"
      }else if(this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Administrador"){
        this.link_retorno = "./menu_administrador"
      }
    }
  }

}
