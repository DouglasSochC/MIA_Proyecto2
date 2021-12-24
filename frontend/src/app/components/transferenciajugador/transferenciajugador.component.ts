import { Component, OnInit } from '@angular/core';
import { EquipoInterface } from 'src/app/models/equipo-interface';
import { ListadoJugadores, TJugadorTransferencia } from 'src/app/models/jugador-interface';
import { JugadorService } from 'src/app/services/jugador.service';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferenciajugador',
  templateUrl: './transferenciajugador.component.html',
  styleUrls: ['./transferenciajugador.component.css']
})
export class TransferenciajugadorComponent implements OnInit {

  constructor(public sjugadorservice: JugadorService, public sequipoervice: SEquipoService) { }

  ngOnInit(): void {
    this.cargarJugadores();
    this.cargarEquipos();
  }

  mostrar_tabla:number = -1;
  id_jugador:number = -1;
  id_equipo_nuevo:number = -1;
  fecha_transferencia:string = "";
  TJugador:TJugadorTransferencia[] = [];
  LJugador:ListadoJugadores[] = [];
  LEquipo:EquipoInterface [] = [];

  hacerTranseferencia(){
    this.fecha_transferencia = this.fecha_transferencia.split("-").reverse().join("/");
    this.sjugadorservice.InsertTrayectoria(this.id_jugador, this.id_equipo_nuevo, this.fecha_transferencia)
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
        this.fecha_transferencia = "";
      }
    });
  }

  cargarTabla(){    
    if (this.id_jugador != -1) {
      this.sjugadorservice.GetTrayectoriaJugador(this.id_jugador).subscribe((res:any) => {
        this.TJugador = res;
      }); 
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "No ha seleccionado algun jugador"
      });
    }
  }

  cargarJugadores(){
    this.sjugadorservice.GetJugadores().subscribe((res:any) => {
      this.LJugador = res;
    }); 
  }

  cargarEquipos(){
    this.sequipoervice.GetEquipos().subscribe((res:any) => {
      this.LEquipo = res;
    });
  }

  limpiarDatos(){
    this.id_jugador = -1;
    this.id_equipo_nuevo = -1;
    this.TJugador = [];
  }

}
