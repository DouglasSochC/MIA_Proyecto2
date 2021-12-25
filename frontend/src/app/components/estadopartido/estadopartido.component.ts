import { Component, OnInit } from '@angular/core';
import { PartidoInterface } from 'src/app/models/partido-interface';
import { SPartidoService } from 'src/app/services/s-partido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadopartido',
  templateUrl: './estadopartido.component.html',
  styleUrls: ['./estadopartido.component.css']
})
export class EstadopartidoComponent implements OnInit {

  constructor(public spartidoservice: SPartidoService) { }

  ngOnInit(): void {
    this.mostrarPartidos();
    this.listadoEstados();
  }

  Partido:PartidoInterface [] = [];
  LEstadoPartido:[{}] = [{}];

  mostrarPartidos(){
    this.spartidoservice.GetPartidos().subscribe((res:any) => {
      this.Partido = res;
    });
  }

  modificarEstado(id_partido:number){
    Swal.fire({
      title: 'Estado del Partido',
      input: 'select',
      inputOptions: this.LEstadoPartido[0],
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
          /*********************************/
          this.spartidoservice.UpdateEstadoPartido(id_partido,result.value)
          .subscribe((res:any) => {
            if (res['response']) {
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: res['msg']
              });
              this.mostrarPartidos();
              this.listadoEstados();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res['msg']
              });
            }
          });
          /*********************************/
        }        
      }
    });
  }

  listadoEstados(){
    this.spartidoservice.GetEstadoPartidoClave().subscribe((res:any) => {
      this.LEstadoPartido = res;
    });
  }

}
