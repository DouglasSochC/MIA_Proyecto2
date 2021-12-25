
import { Component, OnInit } from '@angular/core';
import { SEstadioService } from 'src/app/services/s-estadio.service'; 
import { SEquipoService } from 'src/app/services/s-equipo.service';

import {  EstadioInterface, 
          PaisInterface,
          EstadoEstadioInteface
       } from 'src/app/models/estadio-interface';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})


export class EstadioComponent implements OnInit {
  constructor(  public sestadioservice: SEstadioService,
                public sequiposervice: SEquipoService  
  ) { }
  
  //Este nos carga los componentes al ingresar a la pagina
  ngOnInit(): void {
    this.cargarPaises();
    this.cargarEstadosEstadio();
    this.cargarTabla();
  }

  //datos del estadio  estadio_nombre
  id_estadio:number=-1;
  estadio_nombre: string = ""; 
  fecha_inaguracion: string = "";
  capacidad: number =-1;
  direccion: string = "";
  link_fotografia: string = "";
  id_estado_estadio:number=-1;
  id_pais: number = -1;
  

  Estadio:EstadioInterface[] = [];
  Paises:PaisInterface[] = [];
  Estado_Estadio:EstadoEstadioInteface[]=[];
  

/*********************************
CAMPOS OBLIGATORIOS
nombre != ""
fecha_inaguracion != ""
capacidad != -1
direccion != ""
id_estado_estadio != -1
id_pais != -1

**********************************/


  //agregar nuevo estadio
  guardarEstadio(){
    this.fecha_inaguracion = this.fecha_inaguracion.split("-").reverse().join("/");
    this.sestadioservice.InsertEstadios(this.estadio_nombre, 
                                        this.fecha_inaguracion,
                                        this.capacidad, 
                                        this.direccion,
                                        this.link_fotografia,                                          
                                        this.id_estado_estadio, 
                                        this.id_pais                                     
    ).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });        
        this.cargarTabla();
        this.cargarPaises();
        this.cargarEstadosEstadio();
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

  eliminarEstadio(id_estadio:number ){
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
        
        this.sestadioservice.DeleteEstadio(id_estadio).subscribe((res:any) => {
        
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
    });      
  }

  actualizarEstadio(){    
    this.fecha_inaguracion = this.fecha_inaguracion.split("-").reverse().join("/");
    this.sestadioservice.UpdateEstadio( this.id_estadio,
                                        this.estadio_nombre, 
                                        this.fecha_inaguracion,
                                        this.capacidad, 
                                        this.direccion,
                                        this.link_fotografia,                                          
                                        this.id_estado_estadio, 
                                        this.id_pais
      ).subscribe((res:any) => {
        if (res['response']) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: res['msg']
          });
          this.cargarTabla();
          this.cargarPaises();
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

  setearInterfaz( id_estadio:number,
                  nombre_estadio:string, 
                  fecha_inaguracion: string,
                  capacidad:number, 
                  id_pais:number, 
                  direccion:string,
                  id_estado:number, 
                  link_fotografia:string){
    this.id_estadio=id_estadio,                    
    this.estadio_nombre = nombre_estadio;
    this.fecha_inaguracion = (fecha_inaguracion == null)? "": fecha_inaguracion.split("/").reverse().join("-");
    this.capacidad= capacidad;
    this.id_pais =id_pais;
    this.direccion=direccion;
    this.id_estado_estadio=id_estado; 
    this.link_fotografia=link_fotografia;
  }

  //-------------------------------------------------------

  cargarPaises(){
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }

  cargarEstadosEstadio(){
    this.sestadioservice.GetEstadosEstadio().subscribe((res:any) => {
      this.Estado_Estadio = res;      
    });    
  }

  cargarTabla(){
    this.sestadioservice.GetEstadios().subscribe((res:any) => {
      this.Estadio = res;
      console.log( this.Estadio);
    });
  }

  limpiarDatos(){    
    this.id_estadio=-1;
    this.estadio_nombre = "";
    this.fecha_inaguracion = "";
    this.capacidad=-1;
    this.direccion="";
    this.link_fotografia="";
    this.id_estado_estadio=-1;
    this.id_pais=-1; 
  
  
  
  
  
  
  }

}//class EstadioComponent

