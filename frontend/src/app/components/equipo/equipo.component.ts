import { Component, OnInit } from '@angular/core';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { EquipoInterface, PaisInterface } from 'src/app/models/equipo-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  constructor(public sequipoervice: SEquipoService) { }
  
  //Este nos carga los componentes al ingresar a la pagina
  ngOnInit(): void {
    this.cargarTabla();
    this.cargarPaises();
  }

  id_equipo: number = -1;
  nombre: string = "";
  fecha_fundacion: string = "";
  link_fotografia: string = "";
  id_pais: number = -1;
  Equipo:EquipoInterface[] = [];
  Paises:PaisInterface[] = [];

  guardarEquipo(){
    this.fecha_fundacion = this.fecha_fundacion.split("-").reverse().join("/");
    this.sequipoervice.InsertEquipos(this.nombre, this.fecha_fundacion, this.link_fotografia, this.id_pais)
    .subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.cargarTabla();
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

  eliminarEquipo(id_equipo:number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podras revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sequipoervice.DeleteEquipo(id_equipo)
        .subscribe((res:any) => {
          if (res['response']) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: res['msg']
            });
            this.cargarTabla();
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
    });      
  }

  actualizarEquipo(){
    this.fecha_fundacion = this.fecha_fundacion.split("-").reverse().join("/");
    this.sequipoervice.UpdateEquipos(this.id_equipo, this.nombre, this.fecha_fundacion, this.link_fotografia, this.id_pais)
    .subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.cargarTabla();
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

  setearInterfaz(id_equipo:number, nombre:string, fecha_fundacion:string, link_fotografia:string, id_pais:number){
    this.id_equipo = id_equipo,
    this.nombre = nombre;
    this.fecha_fundacion = (fecha_fundacion == null)? "": fecha_fundacion.split("/").reverse().join("-"),
    this.link_fotografia = link_fotografia;
    this.id_pais = id_pais;
  }

  cargarTabla(){
    this.sequipoervice.GetEquipos().subscribe((res:any) => {
      this.Equipo = res;
    });
  }

  cargarPaises(){
    this.sequipoervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  limpiarDatos(){
    this.id_equipo = -1;
    this.nombre = "";
    this.fecha_fundacion = "";
    this.link_fotografia = "";
    this.id_pais = -1;
  }

}
