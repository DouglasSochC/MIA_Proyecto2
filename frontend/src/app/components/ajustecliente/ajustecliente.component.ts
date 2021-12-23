import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { PaisInterface } from 'src/app/models/equipo-interface';
import { UsuarioClienteInterface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajustecliente',
  templateUrl: './ajustecliente.component.html',
  styleUrls: ['./ajustecliente.component.css']
})
export class AjusteclienteComponent implements OnInit {

  constructor(public sequipoervice: SEquipoService, public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.setearDatos();
  }

  id_usuario:number = -1;
  nombres:string = "";
  apellidos:string = "";
  clave:string = "";
  telefono:number = -1;
  genero:string = "";
  fecha_nacimiento:string = "";
  direccion:string = "";
  link_fotografia:string = "";
  id_pais:number = -1;
  Paises:PaisInterface[] = [];
  UsuarioCliente:UsuarioClienteInterface[] = [];

  actualizarCuenta(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.susuarioservice.actualizarCuentaCliente(this.id_usuario,this.nombres,this.apellidos, this.clave, this.telefono, this.genero, this.fecha_nacimiento, this.direccion, this.link_fotografia, this.id_pais)
    .subscribe((res:any) => {
      if (res['response']) {
        this.fecha_nacimiento = this.fecha_nacimiento.split("/").reverse().join("-"),
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
  }

  cargarPaises(){
    this.sequipoervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  setearDatos(){
    if (this.susuarioservice.getUsuarioActual()) {
      this.id_usuario = this.susuarioservice.getUsuarioActual()['id'];
      this.susuarioservice.GetDatoscuentaCliente(this.id_usuario).subscribe((res:any) => {
        this.UsuarioCliente = res;
        this.nombres = this.UsuarioCliente[0].nombres;
        this.apellidos  = this.UsuarioCliente[0].apellidos;;
        this.clave = this.UsuarioCliente[0].clave;
        this.telefono = this.UsuarioCliente[0].telefono;
        this.genero = this.UsuarioCliente[0].genero;
        this.fecha_nacimiento = this.UsuarioCliente[0].fecha_nac;
        this.fecha_nacimiento = (this.fecha_nacimiento == null)? "": this.fecha_nacimiento.split("/").reverse().join("-"),
        this.direccion = this.UsuarioCliente[0].direccion;
        this.link_fotografia = this.UsuarioCliente[0].link_fotografia;
        this.id_pais = this.UsuarioCliente[0].id_pais;
      });      
    }
  }

}
