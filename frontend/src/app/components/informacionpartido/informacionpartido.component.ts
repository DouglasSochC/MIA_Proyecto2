import { Component, OnInit } from '@angular/core';
import { EstadoPartidoInterface, PartidoInterface } from 'src/app/models/partido-interface';
import { SPartidoService } from 'src/app/services/s-partido.service';

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

}
