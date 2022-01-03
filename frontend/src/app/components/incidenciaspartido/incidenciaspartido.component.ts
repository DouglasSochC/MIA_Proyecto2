import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import Swal from 'sweetalert2';
import { PartidoInterface } from 'src/app/models/partido-interface';
import { SPartidoService } from 'src/app/services/s-partido.service';

@Component({
  selector: 'app-incidenciaspartido',
  templateUrl: './incidenciaspartido.component.html',
  styleUrls: ['./incidenciaspartido.component.css']
})
export class IncidenciaspartidoComponent implements OnInit {

  constructor(public spartidoservice: SPartidoService) { }

  ngOnInit(): void {
    this.cargarTablaPartidosEnCurso();
  }

  Partido:PartidoInterface[]=[];

  crearIncidencia(id_partido:number){
    
    let equipo_local:string = "";
    let equipo_visita:string = "";
    for (const i in this.Partido) {
      if (this.Partido[i].id_partido == id_partido) {
        equipo_local = this.Partido[i].nombre_equipo_local;
        equipo_visita = this.Partido[i].nombre_equipo_visita;
      }
    }

    Swal.fire({
      title: 'Incidencia',
      html:
        'Descripcion'+
        '<input id="txtDescripcion" class="swal2-input">' +
        'Minuto de Juego'+
        '<input id="txtMinuto" class="swal2-input">'+
        'Equipo que hizo la incidencia'+
        '<select id="txtEquipoIncidencia" class="swal2-select">'+
          '<option value="">Seleccione una Opcion</option>'+
          '<option value="'+equipo_local+'">'+equipo_local+'</option>'+
          '<option value="'+equipo_visita+'">'+equipo_visita+'</option>'+
        '</select><br/>'+
        'Jugador'+
        '<input id="txtJugador" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById("txtDescripcion")).value,
          (<HTMLInputElement>document.getElementById("txtMinuto")).value,
          (<HTMLInputElement>document.getElementById("txtEquipoIncidencia")).value,
          (<HTMLInputElement>document.getElementById("txtJugador")).value
        ]
      }
    }).then((result) => {
      /////////////////////////////////////////////////////////////////////////////
      this.spartidoservice.InsertIncidencia(result.value![0], result.value![1], result.value![2],result.value![3],id_partido)
      .subscribe((res:any) => {
        if (res['response']) {
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
      /////////////////////////////////////////////////////////////////////////////
    });
  }

  cargarTablaPartidosEnCurso(){
    this.spartidoservice.GetPartidosEnCurso().subscribe((res:any) => {
      this.Partido = res;
    });
  }

}
