
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

  //datos del estadio
  id_nombre:number=-1;
  nombre: string = ""; 
  fecha_inauguracion: string = "";
  capacidad: number =-1;
  direccion: string = "";
  link_fotografia: string = "";
  id_estado:number=-1;
  id_pais: number = -1;
  
  
  Estadio:EstadioInterface[] = [];
  Paises:PaisInterface[] = [];
  Estado_Estadio:EstadoEstadioInteface[]=[];
  

  guardarEstadio(){
    this.fecha_inauguracion = this.fecha_inauguracion.split("-").reverse().join("/");
    this.sestadioservice.InsertEstadios(  this.nombre, 
                                          this.fecha_inauguracion,
                                          this.capacidad, 
                                          this.direccion,
                                          this.link_fotografia,
                                          this.id_estado, 
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
                                        this.direccion,
                                        this.link_fotografia,
                                        this.id_estado, 
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

  setearInterfaz( nombre:string, 
                  fecha_inauguracion: string,
                  capacidad:number, 
                  id_pais:number, 
                  direccion:string,
                  id_estado:number, 
                  link_fotografia:string){

    this.nombre = nombre;
    this.fecha_inauguracion = (fecha_inauguracion == null)? "": fecha_inauguracion.split("/").reverse().join("-");
    this.capacidad= capacidad;
    this.id_pais =id_pais;
    this.direccion=direccion;
    this.id_estado=id_estado; 
    this.link_fotografia=link_fotografia;
  }


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
    this.nombre = "";
    this.fecha_inauguracion = "";
    this.capacidad=-1;
    this.direccion="";
    this.link_fotografia="";
    this.id_estado=-1;
    this.id_pais=-1; 
  }

}//class EstadioComponent

