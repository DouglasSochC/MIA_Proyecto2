import { Component, OnInit } from '@angular/core';
import { SEquipoService } from 'src/app/services/s-equipo.service';
import { PaisInterface } from 'src/app/models/equipo-interface';
import { UsuariosTodosInterface, EstadoUsuarioInterface, TipoUsuarioInterface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
import { SUsuarioService } from 'src/app/services/s-usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService, public susuarioservice: SUsuarioService) { }

  ngOnInit(): void {
    this.asignar_idAdm();
    this.cargarPaises();
    this.cargarEstadoUsuario();
    this.cargarTipoUsuario();
    this.cargarTabla();
    this.limpiarDatos();
  }
  id_administrador:number = -1;
  id_usuario:number = -1;
  nombres: string = "";
  apellidos: string = "";
  clave: string = "";
  correo_electronico: string = "";
  telefono: number = -1;
  link_fotografia: string = "";
  genero: string = "";
  fecha_nacimiento: string = "";
  direccion: string = ""  ;
  id_pais: number = -1;
  id_estado_usuario:number = -1;
  id_tipo_usuario:number = -1;

  Paises:PaisInterface[] = [];
  Usuarios:UsuariosTodosInterface[] = [];
  Estado_Usuario:EstadoUsuarioInterface[] = [];
  Tipo_Usuario:TipoUsuarioInterface[] = [];

  crearCuentaNueva(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.susuarioservice.crearCuentaNueva(this.nombres, this.apellidos, this.clave, this.correo_electronico, this.telefono, this.genero, this.fecha_nacimiento, this.direccion, this.id_pais)
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

  cargarPaises(){
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  cargarEstadoUsuario(){
    this.susuarioservice.GetEstadoUsuario().subscribe((res:any) => {
      this.Estado_Usuario = res;
    });
  }

  cargarTipoUsuario(){
    this.susuarioservice.GetTipoUsuario().subscribe((res:any) => {
      this.Tipo_Usuario = res;
    });
  }
  
  limpiarDatos(){
    this.id_usuario = -1;
    this.nombres = "";
    this.apellidos = "";
    this.clave = "";
    this.correo_electronico = "";
    this.telefono = -1;
    this.link_fotografia = "";
    this.genero = "";
    this.fecha_nacimiento = "";
    this.direccion = ""  ;
    this.id_pais = -1;
    this.id_estado_usuario = -1;
    this.id_tipo_usuario = -1;
  }

  cargarTabla(){
    this.susuarioservice.GetUsuarios().subscribe((res:any) => {
      this.Usuarios = res;
    });
  }

  setearInterfaz(id_usuario:number, nombres:string, apellidos:string, clave:string, telefono:number, genero:string, fecha_nacimiento:string, direccion:string, link_fotografia:string, id_pais:number, id_tipo_usuario:number, id_estado_usuario:number){
    this.limpiarDatos();
    this.id_usuario = id_usuario;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.clave = clave;
    this.telefono = telefono;
    this.genero = genero;
    this.fecha_nacimiento = (fecha_nacimiento == null)? "": fecha_nacimiento.split("/").reverse().join("-"),
    this.direccion = direccion;
    this.link_fotografia = link_fotografia;
    this.id_pais = id_pais;    
    this.id_tipo_usuario = id_tipo_usuario;
    this.id_estado_usuario = id_estado_usuario;
  }

  eliminarUsuario(id_usuario_e:number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podras revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          input: 'textarea',
          inputLabel: 'Motivo',
          inputPlaceholder: 'Escriba el motivo de la operacion...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        }).then((result) => {
          if (!result.isDismissed) {
            if (result.value == "") {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No ha ingresado el motivo de porque esta realizando la operacion, por favor ingrese uno'
              })
            }else{
              this.susuarioservice.DeleteUsuario(id_usuario_e)
              .subscribe((res:any) => {
                if (res['response']) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: res['msg']
                  });
                  this.susuarioservice.InsertBitacora(result.value, "Eliminacion", this.id_administrador).subscribe();
                  this.cargarPaises();
                  this.cargarEstadoUsuario();
                  this.cargarTipoUsuario();
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
          }
        });
      }
    });
  }

  insertarUsuarioAdmEmp(){
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Motivo',
      inputPlaceholder: 'Escriba el motivo de la operacion...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((result) => {
      if (!result.isDismissed) {
        if (result.value == "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ha ingresado el motivo de porque esta realizando la operacion, por favor ingrese uno'
          })
        }else{
          /**************************************************************/
          this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
          this.susuarioservice.InsertAdmEmp(this.nombres, this.apellidos, this.clave, this.correo_electronico, this.telefono, this.genero, this.fecha_nacimiento, this.direccion, this.link_fotografia, this.id_pais, this.id_tipo_usuario, this.id_estado_usuario)
          .subscribe((res:any) => {
            if (res['response']) {
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: res['msg']
              });
              this.susuarioservice.InsertBitacora(result.value, "Creacion", this.id_administrador).subscribe();
              this.cargarPaises();
              this.cargarEstadoUsuario();
              this.cargarTipoUsuario();
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
          /**************************************************************/
        }
      }      
    });
    
  }

  actualizarUsuarioAdmEmp(){
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Motivo',
      inputPlaceholder: 'Escriba el motivo de la operacion...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((result) => {
      if (!result.isDismissed) {
        if (result.value == "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ha ingresado el motivo de porque esta realizando la operacion, por favor ingrese uno'
          })
        }else{
          /**************************************************************/
          this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
          this.susuarioservice.UpdateAdmEmp(this.id_usuario, this.nombres, this.apellidos, this.clave, this.correo_electronico, this.telefono, this.genero, this.fecha_nacimiento, this.direccion, this.link_fotografia, this.id_pais, this.id_tipo_usuario, this.id_estado_usuario)
          .subscribe((res:any) => {
            if (res['response']) {
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: res['msg']
              });
              this.susuarioservice.InsertBitacora(result.value, "Actualizar", this.id_administrador).subscribe();
              this.cargarPaises();
              this.cargarEstadoUsuario();
              this.cargarTipoUsuario();
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
          /**************************************************************/
        }
      }      
    });
  }

  asignar_idAdm(){
    if (this.susuarioservice.getUsuarioActual()) {
      this.id_administrador = this.susuarioservice.getUsuarioActual()['id'];
    }
  }

}
