import { Component, OnInit } from '@angular/core';
import { EquipoInterface } from 'src/app/models/equipo-interface';
import { EstadioInterface } from 'src/app/models/estadio-interface';
import { EstadoPartidoInterface, PartidoInterface } from 'src/app/models/partido-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { SEstadioService } from 'src/app/services/s-estadio.service';
import { SPartidoService } from 'src/app/services/s-partido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  constructor(public spartidoservice: SPartidoService, public sestadioservice: SEstadioService, public sequiposervice: SEquipoService) { }

  ngOnInit(): void {
    this.cargarTabla();
    this.mostrarEstadosPartido();
    this.mostrarEstadios();
    this.mostrarEquipos();
  }

  id_partido:number = -1;
  id_estado:number = -1;
  id_estadio:number = -1;
  id_equipo_visitante: number = -1;
  id_equipo_local: number = -1;
  resultado:string = "";
  fecha_partido:string = "";
  asistencia:number = -1;
  Partido: PartidoInterface[]=[];
  EstadoPartido: EstadoPartidoInterface[] = [];
  Estadio: EstadioInterface[] = [];
  Equipo:EquipoInterface[] = [];

  cargarTabla(){
    this.spartidoservice.GetPartidos().subscribe((res:any) => {
      this.Partido = res;
    });
  }

  mostrarEstadios(){
    this.sestadioservice.GetEstadios().subscribe((res:any) => {
      this.Estadio = res;
    });
  }

  mostrarEstadosPartido(){
    this.spartidoservice.GetEstadoPartido().subscribe((res:any) => {
      this.EstadoPartido = res;      
    });
  }

  mostrarEquipos(){
    this.sequiposervice.GetEquipos().subscribe((res:any) => {
      this.Equipo = res;
    });
  }

  insertarPartido(){
    this.fecha_partido = this.fecha_partido.split("-").reverse().join("/");
    this.spartidoservice.InsertPartido(this.fecha_partido, this.id_estadio, this.id_estado, this.asistencia, this.id_equipo_visitante, this.id_equipo_local, this.resultado)
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

  actualizarPartido(){
    this.fecha_partido = this.fecha_partido.split("-").reverse().join("/");
    this.spartidoservice.UpdatePartido(this.id_partido, this.fecha_partido, this.id_estadio, this.id_estado, this.asistencia, this.id_equipo_visitante, this.id_equipo_local, this.resultado)
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
        this.fecha_partido = this.fecha_partido.split("/").reverse().join("-");
      }
    });
  }

  setearInterfaz(id_partido:number, fecha_partido:string, resultado:string, asistencia:number, estado:number, estadio:number, equipo_local:number, equipo_visitante:number){
    this.id_partido = id_partido;
    this.fecha_partido = (fecha_partido == null)? "": fecha_partido.split("/").reverse().join("-")
    this.resultado = resultado;
    this.asistencia = asistencia;
    this.id_estado = estado;
    this.id_estadio = estadio;
    this.id_equipo_local = equipo_local;
    this.id_equipo_visitante = equipo_visitante;
  }

  eliminarPartido(id_partido:number){
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
        this.spartidoservice.DeletePartido(id_partido)
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

  limpiarDatos(){
    this.id_partido = -1;
    this.id_estado = -1;
    this.id_estadio = -1;
    this.id_equipo_visitante = -1;
    this.id_equipo_local = -1;
    this.resultado = "";
    this.fecha_partido = "";
    this.asistencia = -1;
  }

}
