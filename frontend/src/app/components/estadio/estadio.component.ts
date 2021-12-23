import { Component, OnInit } from '@angular/core';
import { SEstadioService } from 'src/app/services/s-estadio.service'; 
import { EstadioInterface, PaisInterface } from 'src/app/models/estadio-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})


export class EstadioComponent implements OnInit {
  constructor(public sestadioservice: SEstadioService) { }
  //Este nos carga los componentes al ingresar a la pagina
  ngOnInit(): void {
    this.cargarTabla();
    this.cargarPaises();
  }

  nombre: string = "";
  fecha_inauguracion: string = "";
  capacidad: number =-1;
  pais: string = "";
  direccion: string = "";
  estado: string = "";
  link_fotografia: string = "";

  Estadio:EstadioInterface[] = [];
  Paises:PaisInterface[] = [];

  guardarEstadio(){
    alert("guardando estadio");    
    this.fecha_inauguracion = this.fecha_inauguracion.split("-").reverse().join("/");
    this.sestadioservice.InsertEstadios(  this.nombre, 
                                          this.fecha_inauguracion,
                                          this.capacidad, 
                                          this.pais, 
                                          this.direccion,
                                          this.estado, 
                                          this.link_fotografia
    ).subscribe((res:any) => {
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

  eliminarEstadio(id_estadio:string ){
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
        alert("eliminare");
        /*
        this.sestadioservice.DeleteEstadio(nombre).subscribe((res:any) => {
        /*
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
      }); */ 
      }
    });      
  }


  actualizarEstadio(){
    alert("actualizando estadio");    
    this.fecha_inauguracion = this.fecha_inauguracion.split("-").reverse().join("/");
    this.sestadioservice.UpdateEstadio( this.nombre,
                                        this.fecha_inauguracion,
                                        this.capacidad,
                                        this.pais,
                                        this.direccion,
                                        this.estado,
                                        this.link_fotografia
      ).subscribe((res:any) => {
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


  setearInterfaz( nombre:string, 
                  fecha_inauguracion: string,
                  capacidad:number, 
                  pais:string, 
                  direccion:string,
                  estado:string, 
                  link_fotografia:string){
    this.nombre = nombre;
    this.fecha_inauguracion = (fecha_inauguracion == null)? "": fecha_inauguracion.split("/").reverse().join("-");
    this.capacidad = capacidad;
    this.pais = pais;
    this.direccion=direccion;
    this.estado =estado;
    this.link_fotografia=link_fotografia;    
  }


  cargarPaises(){
    this.sestadioservice.GetEstadios().subscribe((res:any) => {
      this.Paises = res;
    });
  }
  

  cargarTabla(){
    this.sestadioservice.GetEstadios().subscribe((res:any) => {
      this.Estadio = res;
    });
  }


  limpiarDatos(){
    this.nombre = "";
    this.fecha_inauguracion = "";
    this.capacidad =-1;
    this.pais = "";
    this.direccion = "";
    this.estado = "";
    this.link_fotografia = "";
  }

}//class EstadioComponent
