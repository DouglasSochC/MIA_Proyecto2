import { Component, OnInit } from '@angular/core';
import { EquipoInterface } from 'src/app/models/equipo-interface';
import { NoticiaInterface } from 'src/app/models/noticia-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { SNoticiaService } from 'src/app/services/s-noticia.service';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicarnoticia',
  templateUrl: './publicarnoticia.component.html',
  styleUrls: ['./publicarnoticia.component.css']
})
export class PublicarnoticiaComponent implements OnInit {

  constructor(public susuarioservice: SUsuarioService, public snoticiasservice: SNoticiaService, public sequipoervice: SEquipoService) { }

  ngOnInit(): void {
    this.setearUsuario();
    this.mostrarEquipos();
    this.cargarTabla();
  }

  descripcion:string = "";
  id_usuario = -1;
  id_equipo = -1;
  Equipo: EquipoInterface[] = [];
  Noticia: NoticiaInterface [] = [];
  
  mostrarEquipos(){
    this.sequipoervice.GetEquipos().subscribe((res:any) => {
      this.Equipo = res;
    });
  }

  setearUsuario(){
    if (this.susuarioservice.getUsuarioActual()) {
      this.id_usuario = this.susuarioservice.getUsuarioActual()['id'];
    }
  }

  publicarNoticia(){
    this.snoticiasservice.InsertarNoticia(this.descripcion, this.id_equipo, this.id_usuario)
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

  cargarTabla(){
    this.snoticiasservice.GetNoticiasUsuario(this.id_usuario).subscribe((res:any) => {
      this.Noticia = res;
    });
  }

  limpiarDatos(){
    this.descripcion = "";
    this.id_equipo = -1;
  }

}
