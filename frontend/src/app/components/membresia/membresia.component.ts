import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from 'src/app/services/s-usuario.service';
import { MembresiaInterface } from 'src/app/models/membresia-interface';
import { MembresiaService } from 'src/app/services/membresia.service';
import { UsuarioInterface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  constructor(public membresia: MembresiaService, public autenticacion: SUsuarioService) { }

  ngOnInit(): void {
    this.seteoVariables();
    this.cargarTabla();
  }

  id_usuario: number = -1;
  membresia_activa: number = -1;
  num_tarjeta: number = -1;
  Membresia:MembresiaInterface[] = []

  comprarMembresia(){
    this.num_tarjeta = this.num_tarjeta <= 0 ? -1: this.num_tarjeta;
    this.membresia.InsertMembresia(this.num_tarjeta, this.id_usuario).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.cargarTabla();
        this.limpiarDatos();
        this.cambiarMembresiaUsuario();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
  }

  seteoVariables(){
    if (this.autenticacion.getUsuarioActual()) {
      this.id_usuario = this.autenticacion.getUsuarioActual()['id'];
      this.membresia_activa = this.autenticacion.getUsuarioActual()['membresia_activa']; 
    }
  }

  cargarTabla(){
    this.membresia.GetMembresia(this.id_usuario).subscribe((res:any) => {
      this.Membresia = res;
    });
  }

  limpiarDatos(){
    this.id_usuario = -1;
    this.membresia_activa = -1;
  }

  cambiarMembresiaUsuario(){
    if (this.autenticacion.getUsuarioActual()) {
      let DatosUsuario:UsuarioInterface = this.autenticacion.getUsuarioActual();
      DatosUsuario.membresia_activa = 1;
      this.autenticacion.setUsuarioActual(DatosUsuario);
    }
  }

}
