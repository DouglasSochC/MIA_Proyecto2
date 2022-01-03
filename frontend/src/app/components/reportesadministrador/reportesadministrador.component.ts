import { Component, OnInit } from '@angular/core';
import { EquipoInterface, PaisInterface } from 'src/app/models/equipo-interface';
import { RP1Interface,RP2Interface,RP3Interface,RP4Interface,RP5Interface,RP6Interface,RP7Interface,RP8Interface,RP9Interface,RP10Interface } from 'src/app/models/reporte-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { SReporteadministradorService } from 'src/app/services/s-reporteadministrador.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-reportesadministrador',
  templateUrl: './reportesadministrador.component.html',
  styleUrls: ['./reportesadministrador.component.css']
})
export class ReportesadministradorComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService, public sreporteadm: SReporteadministradorService) { }

  ngOnInit(): void {
    this.cargarElementoEquipo();
    this.cargarElementoPaises();
  }

  id_reporte = -1;
  R1Equipo: EquipoInterface[] = [];
  R5Paises: PaisInterface[] = [];
  Reporte1: RP1Interface[] = [];
  Reporte2: RP2Interface[] = [];
  Reporte3: RP3Interface[] = [];
  Reporte4: RP4Interface[] = [];
  Reporte5: RP5Interface[] = [];
  Reporte6: RP6Interface[] = [];
  Reporte7: RP7Interface[] = [];
  Reporte8: RP8Interface[] = [];
  Reporte9: RP9Interface[] = [];
  Reporte10: RP10Interface[] = [];
  id_equipo:number = -1;
  membresia_activa:number = -1;
  id_pais:number = -1;
  genero:string = "";
  edad:number = -1;
  es_mas:number = -1;

  mostrarReporte(){    
    if (this.id_reporte == 1) {
      this.mostrarReporte1();
    }else if(this.id_reporte == 2){
      this.mostrarReporte2();
    }else if(this.id_reporte == 3){
      this.mostrarReporte3();
    }else if(this.id_reporte == 4){
      this.mostrarReporte4();
    }else if(this.id_reporte == 5){
      this.mostrarReporte5();
    }else if(this.id_reporte == 6){
      this.mostrarReporte6();
    }else if(this.id_reporte == 7){
      this.mostrarReporte7();
    }else if(this.id_reporte == 8){
      this.mostrarReporte8();
    }else if(this.id_reporte == 9){
      this.mostrarReporte9();
    }else if(this.id_reporte == 10){
      this.mostrarReporte10();
    }
  }

  cargarElementoEquipo(){
    this.sequiposervice.GetEquipos().subscribe((res:any) => {
      this.R1Equipo = res;
    });
  }

  cargarElementoPaises(){
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.R5Paises = res;
    });
  }

  mostrarReporte1(){
    this.sreporteadm.GetUsuarioEquipo(this.id_equipo).subscribe((res:any) => {
      this.Reporte1 = res;
    });
  }

  mostrarReporte2(){
    this.sreporteadm.GetUsuarioMembresia(this.membresia_activa).subscribe((res:any) => {
      this.Reporte2 = res;
    });
  }

  mostrarReporte3(){
    this.sreporteadm.GetMasMembresia().subscribe((res:any) => {
      this.Reporte3 = res;
    });
  }

  mostrarReporte4(){
    this.sreporteadm.GetUsuarioDinero().subscribe((res:any) => {
      this.Reporte4 = res;
    });
  }

  mostrarReporte5(){    
    this.sreporteadm.GetUsuarioPais(this.id_pais).subscribe((res:any) => {
      this.Reporte5 = res;
    });
  }

  mostrarReporte6(){
    this.sreporteadm.GetUsuarioGenero(this.genero).subscribe((res:any) => {
      this.Reporte6 = res;
    });
  }

  mostrarReporte7(){
    this.sreporteadm.GetUsuarioEdad(this.edad).subscribe((res:any) => {
      this.Reporte7 = res;
    });
  }

  mostrarReporte8(){
    this.sreporteadm.GetMENoticias(this.es_mas).subscribe((res:any) => {
      this.Reporte8 = res;
    });
  }

  mostrarReporte9(){
    this.sreporteadm.GetMENoticiasEquipo(this.es_mas, this.id_equipo).subscribe((res:any) => {
      this.Reporte9 = res;
    });
  }

  mostrarReporte10(){
    this.sreporteadm.GetBicatoras().subscribe((res:any) => {
      this.Reporte10 = res;
    });
  }

  reportePDF(numero_reporte:number){
    const doc = new jsPDF()
    autoTable(doc, { 
      html: '#tablaR'+numero_reporte
    })
    doc.save('reporte'+numero_reporte+'.pdf')
  }

}
