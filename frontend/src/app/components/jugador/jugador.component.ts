
import { Component, OnInit } from '@angular/core';

import { SEquipoService }  from 'src/app/services/s-equipo.service';
import { JugadorService }  from 'src/app/services/jugador.service';

import {  PaisInterface,
          EquipoInterface } from 'src/app/models/equipo-interface';

import {  TJugador,
          PosicionJugador,
          EstadoJugador
        } from 'src/app/models/jugador-interface';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})


export class JugadorComponent implements OnInit {

  constructor(public sequiposervice: SEquipoService,
              public sjugadorservice:JugadorService) { }

  ngOnInit(): void {
    this.limpiarDatos();    
    this.cargarPaises();    
    this.cargarPosicionJugador();
    this.cargarEstadoJugador();
    this.cargarEquipos();    
    this.cargarTabla();
  }
  
  id_jugador:number = -1;
  nombres: string = ""; 
  apellidos: string = "";  
  fecha_nacimiento: string = "";
  
  id_pais: number = -1;
  nombre_pais:string = "";    
  
  id_posicion:number=-1; 
  nombre_posicion:string = "";

  id_estado:number = -1;
  nombre_estado:string="";

  id_equipo:number =-1;
  nombre_equipo:string="";

  fecha_ini_equipo: string = "";



  
  Paises:PaisInterface[] = [];
  Equipos: EquipoInterface [] = [];
  Jugadores:TJugador[] = [];
  Posicion:PosicionJugador [] = [];
  Estadojugador:EstadoJugador[] = [];
  

  insertarJugador(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.fecha_ini_equipo = this.fecha_ini_equipo.split("-").reverse().join("/");
    this.sjugadorservice.InsertarJugador( this.nombres, 
                                          this.fecha_nacimiento,
                                          this.id_pais,
                                          this.id_posicion, 
                                          this.id_estado,
                                          this.id_equipo,
                                          this.fecha_ini_equipo                                                                                                                    
    ).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });        
        //this.limpiarDatos();
        this.cargarPaises();
        this.cargarPosicionJugador();
        this.cargarEstadoJugador();   
        this.cargarEquipos();     
        this.cargarTabla();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
    this.insertarTrayectoriaJugador();
  }


  insertarTrayectoriaJugador(){
    this.fecha_ini_equipo = this.fecha_ini_equipo.split("-").reverse().join("/");
    this.sjugadorservice.InsertTrayectoria( 
                                          this.id_jugador,
                                          this.id_equipo,
                                          this.fecha_ini_equipo                                                                            
    ).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });        
        this.limpiarDatos();
        this.cargarPaises();
        this.cargarPosicionJugador();
        this.cargarEstadoJugador();   
        this.cargarEquipos();     
        this.cargarTabla();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });
  }
  
  

  //modificar
  actualizarJugador(){
    console.log('actualizare jugador');
    
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.sjugadorservice.ActualizarJugador( this.id_jugador,
                                            this.nombres, 
                                            this.fecha_nacimiento,
                                            this.id_pais,
                                            this.id_posicion, 
                                            this.id_estado 
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

  

  eliminarJugador(id_jugador:number){
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
        
        this.sjugadorservice.DeleteJugador(id_jugador).subscribe((res:any) => {
        
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

  setearInterfaz( id_jugador:number, 
                  nombres:string, 
                  fecha_nacimiento:string, 
                  pais:number, 
                  posicion:number, 
                  estado:number               
                ){
      this.limpiarDatos();
      this.id_jugador = id_jugador;
      this.nombres = nombres;
      this.fecha_nacimiento = (fecha_nacimiento == null)? "": fecha_nacimiento.split("/").reverse().join("-"),
      this.id_pais = pais;
      this.id_posicion = posicion;
      this.id_estado = estado;
  }
 

  cargarEstadoJugador(){
    this.sjugadorservice.GetEstadoJugador().subscribe((res:any) => {
      this.Estadojugador = res;
    });    
  }


  cargarPosicionJugador(){
    this.sjugadorservice.GetPosicionJugador().subscribe((res:any) => {
      this.Posicion = res;
    });
  }

  cargarTabla(){
    this.sjugadorservice.GetJugadoresCompleto().subscribe((res:any) => {
      this.Jugadores = res;
    });
  }


  cargarPaises(){
    this.sequiposervice.GetPaises().subscribe((res:any) => {
      this.Paises = res;
    });
  }


  cargarEquipos(){
    this.sequiposervice.GetEquipos().subscribe((res:any) => {
      this.Equipos = res;
    });    
  }
  

  limpiarDatos(){
    this.id_jugador = -1;
    this.nombres = ""; 
    this.apellidos = "";  
    this.fecha_nacimiento = "";
    this.id_pais = -1;
    this.nombre_pais = "";    
  
    this.id_posicion =-1; 
    this.nombre_posicion = "";

    this.id_estado = -1;
    this.nombre_estado = "";      
  }

}

