import { Component, OnInit } from '@angular/core';
import { TJugador } from 'src/app/models/jugador-interface';
import { JugadorService } from 'src/app/services/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadojugador',
  templateUrl: './estadojugador.component.html',
  styleUrls: ['./estadojugador.component.css']
})
export class EstadojugadorComponent implements OnInit {

  constructor(public sjugadorservice: JugadorService) { }

  ngOnInit(): void {
    this.mostrarJugadores();
    this.listadoEstados();
  }

  TJugadores:TJugador [] = [];
  LEstadoJugador:[{}] = [{}];

  mostrarJugadores(){
    this.sjugadorservice.GetJugadoresCompleto().subscribe((res:any) => {
      this.TJugadores = res;
    });
  }

  modificarEstado(id_jugador:number){
    Swal.fire({
      title: 'Estado del Partido',
      input: 'select',
      inputOptions: this.LEstadoJugador[0],
      inputPlaceholder: 'Seleccione un estado',
      showCancelButton: true
    }).then((result) => {
      if (!result.isDismissed) {
        if (result.value == "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "No ha selecionado algun estado"
          });
        } else {
          /***************************************************/
          this.sjugadorservice.UpdateEstadoJugador(id_jugador,result.value)
          .subscribe((res:any) => {
            if (res['response']) {
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: res['msg']
              });
              this.mostrarJugadores();
              this.listadoEstados();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res['msg']
              });
            }
          });
          /***************************************************/
        }        
      }
    });
  }

  listadoEstados(){
    this.sjugadorservice.GetEstadoJugadorClave().subscribe((res:any) => {
      this.LEstadoJugador = res;
    });
  }

}
