import { Component, OnInit } from '@angular/core';
import { SeguirEquipoInterface } from 'src/app/models/equipo-interface';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguirequipo',
  templateUrl: './seguirequipo.component.html',
  styleUrls: ['./seguirequipo.component.css']
})
export class SeguirequipoComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService, public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
    this.setearUsuario();
    this.mostrarEquipos();
  }

  LSeguirEquipo: SeguirEquipoInterface[] = [];
  id_usuario:number = -1;
  
  seguirEquipo(id_equipo:number){
    this.sequiposervice.InsertSeguirEquipo(this.id_usuario, id_equipo)
    .subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.mostrarEquipos();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
  }

  desistirEquipo(id_equipo:number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podras revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sequiposervice.DeleteSeguimiento(this.id_usuario, id_equipo)
        .subscribe((res:any) => {
          if (res['response']) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: res['msg']
            });
            this.mostrarEquipos();
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

  mostrarEquipos(){
    this.sequiposervice.GetMostrarEquiposSeguidos(this.id_usuario).subscribe((res:any) => {
      this.LSeguirEquipo = res;
    });
  }

  setearUsuario(){
    if (this.susuarioservice.getUsuarioActual()) {
      this.id_usuario = this.susuarioservice.getUsuarioActual()['id'];
    }
  }

}
