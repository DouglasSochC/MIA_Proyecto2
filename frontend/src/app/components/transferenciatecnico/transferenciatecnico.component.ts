import { Component, OnInit } from '@angular/core';
import { EquipoInterface } from 'src/app/models/equipo-interface';
import { ListadoTecnicoInterface, TTecnicoransferenciaInterface } from 'src/app/models/tecnico-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { STecnicoService } from 'src/app/services/s-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferenciatecnico',
  templateUrl: './transferenciatecnico.component.html',
  styleUrls: ['./transferenciatecnico.component.css']
})
export class TransferenciatecnicoComponent implements OnInit {

  constructor(public stecnicoservice: STecnicoService, public sequipoervice: SEquipoService) { }

  ngOnInit(): void {
    this.cargarTecnicos();
    this.cargarEquipos();
  }

  mostrar_tabla:number = -1;
  id_tecnico:number = -1;
  id_equipo_nuevo:number = -1;
  fecha_transferencia:string = "";
  TTecnico:TTecnicoransferenciaInterface[] = [];
  LTecnico:ListadoTecnicoInterface[] = [];
  LEquipo:EquipoInterface [] = [];

  hacerTranseferencia(){
    this.fecha_transferencia = this.fecha_transferencia.split("-").reverse().join("/");
    this.stecnicoservice.InsertTrayectoria(this.id_tecnico, this.id_equipo_nuevo, this.fecha_transferencia)
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
    if (this.id_tecnico != -1) {
      this.stecnicoservice.GetTrayectoriaTecnico(this.id_tecnico).subscribe((res:any) => {
        this.TTecnico = res;
      }); 
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "No ha seleccionado algun tecnico"
      });
    }
  }

  cargarTecnicos(){
    this.stecnicoservice.GetTecnicosMinimos().subscribe((res:any) => {
      this.LTecnico = res;
    }); 
  }

  cargarEquipos(){
    this.sequipoervice.GetEquipos().subscribe((res:any) => {
      this.LEquipo = res;
    });
  }

  limpiarDatos(){
    this.id_tecnico = -1;
    this.id_equipo_nuevo = -1;
    this.TTecnico = [];
  }

}
