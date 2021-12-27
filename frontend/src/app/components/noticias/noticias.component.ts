import { Component, OnInit } from '@angular/core';
import { NoticiaClienteInterface } from 'src/app/models/noticia-interface';
import { SNoticiaService } from 'src/app/services/s-noticia.service';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(public snoticiasservice: SNoticiaService, public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
    this.cargarTabla();
  }

  informacion:string = "";
  Noticia: NoticiaClienteInterface[] = [];
  id_usuario:number = -1;

  setearUsuario(){
    if (this.susuarioservice.getUsuarioActual()) {
      this.id_usuario = this.susuarioservice.getUsuarioActual()['id'];
    }
  }

  cargarTabla(){
    this.id_usuario = -1;
    this.informacion = (this.informacion == "")?"TODAS":this.informacion;
    this.snoticiasservice.GetNoticiasCliente(this.informacion, this.id_usuario).subscribe((res:any) => {
      this.Noticia = res;
    });
  }

  cargarTablaSeguidos(){
    this.setearUsuario();
    this.informacion = (this.informacion == "")?"TODAS":this.informacion;
    this.snoticiasservice.GetNoticiasCliente(this.informacion, this.id_usuario).subscribe((res:any) => {
      this.Noticia = res;
    });
  }

}
