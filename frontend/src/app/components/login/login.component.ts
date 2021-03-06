import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from 'src/app/models/usuario-interface';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public autenticacion: SUsuarioService, public router: Router) { }

  ngOnInit(): void {
    if (this.autenticacion.getUsuarioActual()) {
      if (this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Administrador") {
        this.router.navigate(['/menu_administrador']);
      }else if(this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Empleado"){
        this.router.navigate(['/menu_empleado']);
      }else if(this.autenticacion.getUsuarioActual()['tipo_usuario'] == "Cliente"){
        this.router.navigate(['/menu_cliente']);
      }
    }
  }

  correo: string = "";
  contrasenia: string = "";

  loguearse(){
    this.autenticacion.loginUsuario(this.correo, this.contrasenia).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: '¬°Bienvenido!',
          text: res['msg']
        });
        let DatosUsuario:UsuarioInterface = res['datos'][0];
        this.autenticacion.setUsuarioActual(DatosUsuario);
        if (DatosUsuario.tipo_usuario == "Administrador") {
          this.router.navigate(['/menu_administrador']);
        }else if(DatosUsuario.tipo_usuario == "Empleado"){
          this.router.navigate(['/menu_empleado']);
        }else if(DatosUsuario.tipo_usuario == "Cliente"){
          this.router.navigate(['/menu_cliente']);
        }        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
  }

}
