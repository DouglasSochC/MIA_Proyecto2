import { Component, OnInit } from '@angular/core';
import { NoticiaClienteInterface } from 'src/app/models/noticia-interface';
import { SNoticiaService } from 'src/app/services/s-noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(public snoticiasservice: SNoticiaService) { }

  ngOnInit(): void {
    this.cargarTabla();
  }

  informacion:string = "";
  Noticia: NoticiaClienteInterface[] = [];

  cargarTabla(){
    this.informacion = (this.informacion == "")?"TODAS":this.informacion;
    this.snoticiasservice.GetNoticiasCliente(this.informacion).subscribe((res:any) => {
      this.Noticia = res;
    });
  }
}
