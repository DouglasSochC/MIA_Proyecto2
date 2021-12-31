import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restablecercontrasenia',
  templateUrl: './restablecercontrasenia.component.html',
  styleUrls: ['./restablecercontrasenia.component.css']
})
export class RestablecercontraseniaComponent implements OnInit {

  constructor(public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
  }

  correo_electronico:string = "";

  recuperarCuenta(){
    this.susuarioservice.recuperarCuenta(this.correo_electronico)
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
      }
    });
  }

  limpiarDatos(){
    this.correo_electronico = "";
  }

}
