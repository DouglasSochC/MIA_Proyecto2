import { Component, OnInit } from '@angular/core';
import { CompetenciaInterface, TipoCompetenciaInterface } from 'src/app/models/competencia-interface';
import { PaisInterface } from 'src/app/models/equipo-interface';
import { SCompetenciaService } from 'src/app/services/s-competencia.service';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css']
})
export class CompetenciaComponent implements OnInit {

  constructor(public scompetenciaservice: SCompetenciaService, public sequipoervice: SEquipoService) { }
  
  ngOnInit(): void {
    this.cargarTabla();
    this.cargarPaises();
    this.cargarTipoCompetencia();
  }

  id_competencia: number = -1;
  nombre: string = "";
  anio: number = -1;
  campeon: string = "";
  id_tipo_competencia: number = -1;
  id_pais: number = -1;
  Competencia:CompetenciaInterface[] = [];
  Paises:PaisInterface[] = [];
  TipoCompetencia: TipoCompetenciaInterface[] = [];

  guardarCompetencia(){
    this.scompetenciaservice.InsertCompetencia(this.nombre,this.anio,this.campeon, this.id_tipo_competencia, this.id_pais)
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

  eliminarCompetencia(id_competencia:number){
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
        this.scompetenciaservice.DeleteCompetencia(id_competencia)
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

  actualizarCompetencia(){
    this.scompetenciaservice.UpdateCompetencia(this.id_competencia, this.nombre,this.anio,this.campeon, this.id_tipo_competencia, this.id_pais)
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

  setearInterfaz(id_competencia:number, nombre:string, anio:number, campeon:string, id_tc:number, id_pais:number){
    this.id_competencia = id_competencia;
    this.nombre = nombre;
    this.anio = anio;
    this.campeon = campeon;
    this.id_tipo_competencia = id_tc;
    this.id_pais = id_pais;
  }

  cargarTabla(){
    this.scompetenciaservice.GetCompetencia().subscribe((res:any) => {
      this.Competencia = res;
    });    
  }

  cargarTipoCompetencia(){
    this.scompetenciaservice.GetTipoCompetencia().subscribe((res:any) => {
      this.TipoCompetencia = res;
    });
  }

  cargarPaises(){
    this.sequipoervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  limpiarDatos(){
    this.id_competencia = -1;
    this.nombre = "";
    this.anio = -1;
    this.campeon = "";
    this.id_tipo_competencia = -1;
    this.id_pais = -1;
  }
}
