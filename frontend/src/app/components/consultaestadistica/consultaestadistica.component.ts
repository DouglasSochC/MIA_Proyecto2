import { Component, OnInit } from '@angular/core';
import { EquipoInterface, PaisInterface } from 'src/app/models/equipo-interface';
import { CompetenciaInterface } from 'src/app/models/competencia-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { SCompetenciaService } from 'src/app/services/s-competencia.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { TJugador } from 'src/app/models/jugador-interface';
import { EquipoReporteInterface, EstadioReporteInterface, HistoricoEquipoInterface, JugadorReporteInterface, TecnicoReporteInterface } from 'src/app/models/reportesclientes-interface';
import { STecnicoService } from 'src/app/services/s-tecnico.service';
import { TTecnicoInterface } from 'src/app/models/tecnico-interface';
import { SReporteclienteService } from 'src/app/services/s-reportecliente.service';

@Component({
  selector: 'app-consultaestadistica',
  templateUrl: './consultaestadistica.component.html',
  styleUrls: ['./consultaestadistica.component.css']
})
export class ConsultaestadisticaComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService, 
    public scompetenciaservice: SCompetenciaService, 
    public sjugadorservice: JugadorService,
    public stecnicoservice: STecnicoService,
    public sreporteclienteservice: SReporteclienteService) { }

  ngOnInit(): void {
    this.cargarEquipos();
    this.cargarCompetencias();
    this.cargarPaises();
    this.cargarJugadores();
    this.cargarTecnicos();
  }
  
  id_opcion_inicial:number = -1;
  id_opcion_x:number = -1;
  id_opcion_y:number = -1;
  id_opcion_z:number = -1;
  id_equipo:number = -1;
  id_competencia:number = -1;
  id_pais:number = -1;
  id_jugador:number = -1;
  id_tecnico:number = -1;
  isjugador:number = -1;
  edad:number = -1;
  incidencia:number = -1;
  anio:number = -1;
  cantidad:number = -1;
  id_equipo_1:number = -1;
  id_equipo_2:number = -1;
  goles:number = -1;
  Equipo:EquipoInterface [] = [];
  Competencia: CompetenciaInterface [] = [];
  Pais: PaisInterface[] = [];
  Jugador:TJugador [] = [];
  Tecnico:TTecnicoInterface [] = [];
  JugadorTabla:JugadorReporteInterface[]=[];
  TecnicoTabla:TecnicoReporteInterface[]=[];
  EquipoTabla:EquipoReporteInterface[]=[];
  EstadioTabla:EstadioReporteInterface[]=[];
  HistoricoEquipoTabla:HistoricoEquipoInterface[]=[];

  mostrarReporte(){
    if (this.id_opcion_inicial == 1 && this.id_opcion_x == 1) {
      this.sreporteclienteservice.GetReporteUno(this.id_equipo).subscribe((res:any) => {
        this.JugadorTabla = res;
      });
    }else if(this.id_opcion_inicial == 2 && this.id_opcion_x == 1){
      this.sreporteclienteservice.GetReporteDos(this.id_equipo).subscribe((res:any) => {
        this.TecnicoTabla = res;
      });
    }else if(this.id_opcion_inicial == 1 && this.id_opcion_x == 2){
      this.sreporteclienteservice.GetReporteTres(this.edad).subscribe((res:any) => {
        this.JugadorTabla = res;
      });
    }else if(this.id_opcion_inicial == 2 && this.id_opcion_x == 2){
      this.sreporteclienteservice.GetReporteCuatro(this.edad).subscribe((res:any) => {
        this.TecnicoTabla = res;
      });
    }else if(this.id_opcion_inicial == 1 && this.id_opcion_x == 3){
      this.sreporteclienteservice.GetReporteCinco(this.edad).subscribe((res:any) => {
        this.JugadorTabla = res;
      });
    }else if(this.id_opcion_inicial == 2 && this.id_opcion_x == 3){
      this.sreporteclienteservice.GetReporteSeis(this.edad).subscribe((res:any) => {
        this.TecnicoTabla = res;
      });
    }else if(this.id_opcion_inicial == 3 && this.id_opcion_x == 5){
      this.sreporteclienteservice.GetReporteSiete(this.id_competencia).subscribe((res:any) => {
        this.EquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 3 && this.id_opcion_x == 6){
      this.sreporteclienteservice.GetReporteOcho(this.id_pais).subscribe((res:any) => {
        this.EquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 3 && this.id_opcion_x == 7){
      this.sreporteclienteservice.GetReporteNueve(this.anio).subscribe((res:any) => {
        this.EquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 4 && this.id_opcion_x == 9){
      this.sreporteclienteservice.GetReporteDiez(this.id_pais).subscribe((res:any) => {
        this.EstadioTabla = res;
      });
    }else if(this.id_opcion_inicial == 4 && this.id_opcion_x == 10){
      this.sreporteclienteservice.GetReporteOnce(this.cantidad).subscribe((res:any) => {
        this.EstadioTabla = res;
      });
    }else if(this.id_opcion_inicial == 8 && this.id_opcion_x == 15){
      this.sreporteclienteservice.GetReporteDoce(this.id_equipo).subscribe((res:any) => {
        this.HistoricoEquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 5 && this.id_opcion_x == 1){
      this.sreporteclienteservice.GetReporteDoce(this.id_equipo).subscribe((res:any) => {
        this.HistoricoEquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 5 && this.id_opcion_x == 12){
      this.sreporteclienteservice.GetReporteTrece(this.id_equipo_1, this.id_equipo_2).subscribe((res:any) => {
        this.HistoricoEquipoTabla = res;
      });
    }else if(this.id_opcion_inicial == 5 && this.id_opcion_x == 11){
      this.sreporteclienteservice.GetReporteCatorce(this.anio).subscribe((res:any) => {
        this.HistoricoEquipoTabla = res;
      });
    }
  }

  setearDatos(){
    this.id_opcion_x = -1;
    this.id_opcion_y = -1;
    this.id_opcion_z = -1;
    this.id_equipo = -1;
    this.id_competencia = -1;
    this.id_pais = -1;
    this.id_jugador = -1;
    this.id_tecnico = -1;
    this.isjugador = -1;
    this.edad = -1;
    this.incidencia = -1;
    this.anio = -1;
    this.cantidad = -1;
    this.id_equipo_1 = -1;
    this.id_equipo_2 = -1;
    this.goles = -1;
  }

  cargarEquipos(){
    this.sequiposervice.GetEquipos().subscribe((res:any) => {
      this.Equipo = res;
    });
  }

  cargarCompetencias(){
    this.scompetenciaservice.GetCompetencia().subscribe((res:any) => {
      this.Competencia = res;
    });
  }

  cargarPaises(){
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.Pais = res;
    });
  }

  cargarJugadores(){
    this.sjugadorservice.GetJugadoresCompleto().subscribe((res:any) => {
      this.Jugador = res;
    });
  }

  cargarTecnicos(){  
    this.stecnicoservice.GetTecnicosCompleto().subscribe((res:any) => {
      console.log(res);
      this.Tecnico = res;
    });
  }

}
