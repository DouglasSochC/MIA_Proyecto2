
import { Component, OnInit } from '@angular/core';

import { SEquipoService }  from 'src/app/services/s-equipo.service';
import { STecnicoService } from 'src/app/services/s-tecnico.service'; 

import {  EquipoInterface, 
          PaisInterface } from 'src/app/models/equipo-interface';

import {  EstadoTecnicoInterface,
          TTecnicoInterface
        } from 'src/app/models/tecnico-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})


export class TecnicoComponent implements OnInit {

  constructor(
    public sequiposervice: SEquipoService,
    public stecnicoservice: STecnicoService
  ) { }

  ngOnInit(): void {
    this.limpiarDatos();
    this.cargarPaises();
    this.cargarEquipos();    
    this.cargarEstadoTecnico();
    this.cargarTablaTecnicos();
  }

  id_tecnico:number =-1;  
  nombre:string ="";
  fecha_nacimiento:string="";
  link_fotografia:string="";
  id_pais_tecnico:number=-1;
  id_estado_tecnico:number=-1;
  fecha_ini:string="";
  id_equipo:number =-1;
  Paises:PaisInterface[] = [];
  Equipos:EquipoInterface[] =[];
  EstadoTecnico:EstadoTecnicoInterface[] = [];
  Tecnicos:TTecnicoInterface[] = [];

  insertarTecnico(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.fecha_ini = this.fecha_ini.split("-").reverse().join("/");
    this.stecnicoservice.InsertTecnico(this.nombre,this.fecha_nacimiento,this.link_fotografia,this.id_pais_tecnico,this.id_estado_tecnico,this.id_equipo,this.fecha_ini).subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });                
        this.limpiarDatos();
        this.cargarTablaTecnicos();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['msg']
        });
      }
    });    
  }

  eliminarTecnico(id_tecnico:number){
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
        this.stecnicoservice.DeleteTecnico(id_tecnico).subscribe((res:any) => {
        if (res['response']) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: res['msg']
          });
          this.cargarTablaTecnicos();
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

  actualizarTecnico(){
    this.fecha_nacimiento = this.fecha_nacimiento.split("-").reverse().join("/");
    this.stecnicoservice.UpdateTecnico(this.id_tecnico, this.nombre,this.fecha_nacimiento,this.link_fotografia,this.id_pais_tecnico,this.id_estado_tecnico)
    .subscribe((res:any) => {
      if (res['response']) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: res['msg']
        });
        this.cargarTablaTecnicos();
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

  setearInterfaz( id_tecnico:number,
                  link_fotografia:string,
                  nombre:string, 
                  fecha_nacimiento:string, 
                  id_pais_tecnico:number,  
                  id_estado_tecnico:number
                  ){
    this.limpiarDatos();
    this.id_tecnico = id_tecnico;
    this.nombre = nombre;
    this.fecha_nacimiento = (fecha_nacimiento == null)? "": fecha_nacimiento.split("/").reverse().join("-");
    this.id_pais_tecnico = id_pais_tecnico;
    this.id_estado_tecnico = id_estado_tecnico;
    this.link_fotografia = link_fotografia;
  }


  cargarTablaTecnicos(){  
    this.stecnicoservice.GetTecnicosCompleto().subscribe((res:any) => {
      this.Tecnicos = res;
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

  cargarEstadoTecnico(){
    this.stecnicoservice.GetStatusTecnico().subscribe((res:any) => {
      this.EstadoTecnico = res;
    });
  }
  
  limpiarDatos(){
    this.id_tecnico = -1;
    this.nombre = "";
    this.fecha_nacimiento = "";    
    this.fecha_ini = "";
    this.id_pais_tecnico = -1;
    this.id_estado_tecnico = -1;
    this.id_equipo = -1;
    this.link_fotografia = "";      
  }

}
