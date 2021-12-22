import { Component, OnInit } from '@angular/core';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { PaisInterface } from 'src/app/models/equipo-interface';
import Swal from 'sweetalert2';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})
export class CrearcuentaComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService, public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
    this.cargarPaises();
  }

  nombres: string = "";
  apellidos: string = "";
  contrasenia: string = "";
  correo_electronico: string = "";
  telefono: number = -1;
  link_fotografia: string = "";
  genero: string = "";
  fecha_nacimiento: string = "";
  direccion: string = ""  ;
  id_pais: number = -1;
  Paises:PaisInterface[] = [];

  crearCuentaNueva(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.susuarioservice.crearCuentaNueva(this.nombres, this.apellidos, this.contrasenia, this.correo_electronico, this.telefono, this.genero, this.fecha_nacimiento, this.direccion, this.id_pais)
    .subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.limpiarDatos();
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
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  limpiarDatos(){
    this.nombres = "";
    this.apellidos = "";
    this.contrasenia = "";
    this.correo_electronico = "";
    this.telefono = -1;
    this.link_fotografia = "";
    this.genero = "";
    this.fecha_nacimiento = "";
    this.direccion = ""  ;
    this.id_pais = -1;
  }

}
