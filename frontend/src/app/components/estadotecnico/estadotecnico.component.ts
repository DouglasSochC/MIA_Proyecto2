import { Component, OnInit } from '@angular/core';
import { TTecnicoInterface } from 'src/app/models/tecnico-interface';
import { STecnicoService } from 'src/app/services/s-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadotecnico',
  templateUrl: './estadotecnico.component.html',
  styleUrls: ['./estadotecnico.component.css']
})
export class EstadotecnicoComponent implements OnInit {

  constructor(public stecnicoservice: STecnicoService) { }

  ngOnInit(): void {
    this.mostrarTecnicos();
    this.listadoEstados();
  }

  Tecnico:TTecnicoInterface [] = [];
  LEstadoPartido:[{}] = [{}];

  mostrarTecnicos(){
    this.stecnicoservice.GetTecnicosCompleto().subscribe((res:any) => {
      this.Tecnico = res;
    });
  }

  modificarEstado(id_tecnico:number){
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
          this.stecnicoservice.UpdateEstadoTecnico(id_tecnico,result.value)
          .subscribe((res:any) => {
            if (res['response']) {
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: res['msg']
              });
              this.mostrarTecnicos();
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
    this.stecnicoservice.GetEstadoTecnico().subscribe((res:any) => {
      this.LEstadoPartido = res;
    });
  }

}
