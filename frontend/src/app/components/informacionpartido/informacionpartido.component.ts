import { Component, OnInit } from '@angular/core';
import { EstadoPartidoInterface, IncidenciasPartidoInterface, PartidoInterface } from 'src/app/models/partido-interface';
import { SPartidoService } from 'src/app/services/s-partido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacionpartido',
  templateUrl: './informacionpartido.component.html',
  styleUrls: ['./informacionpartido.component.css']
})
export class InformacionpartidoComponent implements OnInit {

  constructor(public spartidoservice: SPartidoService) { }

  ngOnInit(): void {
    this.mostrarPartidos();
    this.mostrarEstadosPartido();
  }
  Partido:PartidoInterface [] = [];
  EstadoPartido: EstadoPartidoInterface[] = [];
  IncidenciaPartido: IncidenciasPartidoInterface[] = [];
  id_estado = 0;

  mostrarPartidos(){
    this.spartidoservice.GetPartidos().subscribe((res:any) => {
      this.Partido = res;
    });
  }

  mostrarEstadosPartido(){
    this.spartidoservice.GetEstadoPartido().subscribe((res:any) => {
      this.EstadoPartido = res;      
    });
  }

  filtarPartidos(){
    if (this.id_estado == 0) {
      this.mostrarPartidos();
    }else{
      this.spartidoservice.GetPartidoporsuEstado(this.id_estado).subscribe((res:any) => {
        this.Partido = res;
      });
    }
  }

  mostrarPartidoDetalle(id_partido:number){
    this.spartidoservice.GetDetallePartido(id_partido).subscribe((res:any) => {
      this.IncidenciaPartido = res;
      let tbody:string = "";
      for (let registro of this.IncidenciaPartido){
        tbody = tbody + "<tr>" +
          "<td>"+registro['equipo_incidencia']+"</td>"+
          "<td>"+registro['jugador']+"</td>"+
          "<td>"+registro['descripcion']+"</td>"+
          "<td>"+registro['minuto']+"</td>"+
          "</tr>";
      }

      Swal.fire({
        width: 800,
        html: `
        <style>
          table, th, td {
            border:1px solid black;
          }
        </style>
        <table id="table" border=2>
          <thead>
              <tr>
                  <th width="20%" >Equipo Incidencia</th>
                  <th width="25%" >Jugador</th>
                  <th width="40%">Descripcion</th>
                  <th width="15%">Minuto</th>
              </tr>
          </thead>
          <tbody>`
          +tbody+
          `</tbody>
        </table>`
      });
    });    
  }

}
