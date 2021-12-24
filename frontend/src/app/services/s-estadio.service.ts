

  import { Injectable } from '@angular/core';

  import { HttpClient, HttpHeaders } from "@angular/common/http";

  import { map } from "rxjs/operators";

  import { Router } from "@angular/router";

  @Injectable({
    providedIn: 'root'
  })


export class SEstadioService {

  
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  
  //------------------------------------------------------------
  //TODO: GET Estadios
  GetEstadios() {
    const url = "http://localhost:3000/getEstadios";
    return this.http.get(url);
  } 
  //------------------------------------------------------------
  //TODO: GET PAISES
  GetPaises(){
    const url = "http://localhost:3000/getPaises";
    return this.http.get(url);
  }
  //------------------------------------------------------------
  //
  GetEstadosEstadio() {
    const url = "http://localhost:3000/getEstadosEstadio";
    return this.http.get(url);
  }  


  //------------------------------------------------------------
  //TODO: INSERT estadio

  InsertEstadios( nombre:string, 
                  fechaInauguracion:string,
                  capacidad:number,
                  direccion:string, 
                  link_fotografia: string,
                  id_estado_estadio:number,
                  id_pais:number
                ){
      
      const url = "http://localhost:3000/addEstadio";
      return this.http.post(url, 
      {
        "nombre": nombre,
        "fecha_inaguracion": fechaInauguracion,
        "capacidad": capacidad,
        "direccion":direccion,
        "link_fotografia": link_fotografia,
        "id_estado_estadio": id_estado_estadio,
        "id_pais": id_pais
      }, 

     

      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
  }
  //------------------------------------------------------------
  //TODO: UPDATE EQUIPOS
  UpdateEstadio(  nombreEstadio:string, 
                  fechaInauguracion:string,
                  capacidad:number,
                  direccion:string, 
                  link_fotografia: string,
                  id_estado_estadio:number,
                  id_pais:number){
      const url = "http://localhost:3000/updateEstadio";
      return this.http.put(url, 
      {
        "nombre": nombreEstadio,
        "fecha_inauguracion": fechaInauguracion,
        "capacidad": capacidad,
        "direccion":direccion,
        "foto": link_fotografia,
        "estadio": id_estado_estadio,
        "pais": id_pais
      }, 
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
  }
  //------------------------------------------------------------
  //TODO: DELETE EQUIPOS
  DeleteEstadio(id_estadio:number){
    alert("estoy en s-estadio.service.ts  eliminare: "+id_estadio);
    const url = "http://localhost:3000/deleteEstadio/"+id_estadio;
    return this.http.delete(url).pipe(map(data => data));
  }
}// cierre 




