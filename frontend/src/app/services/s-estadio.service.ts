
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
  //TODO: INSERT estadio
  InsertEstadios( nombreEstadio:string, 
                  fechaInauguracion:string,
                  capacidad:number,
                  pais:string,
                  direccion:string, 
                  estado:string,
                  link_fotografia: string  ){
      
      const url = "http://localhost:3000/addEstadio";
      return this.http.post(url, 
      {
        "nombre": nombreEstadio,
        "fecha_inauguracion": fechaInauguracion,
        "capacidad": capacidad,
        "pais": pais,
        "direccion":direccion,
        "estadio": estado,
        "foto": link_fotografia
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
                  pais:string,
                  direccion:string, 
                  estado:string,
                  link_fotografia: string){
      const url = "http://localhost:3000/updateEstadio";
      return this.http.put(url, 
      {
        "nombre": nombreEstadio,
        "fecha_inauguracion": fechaInauguracion,
        "capacidad": capacidad,
        "pais": pais,
        "direccion":direccion,
        "estadio": estado,
        "foto":link_fotografia
      }, 
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
  }
  //------------------------------------------------------------
  //TODO: DELETE EQUIPOS
  DeleteEstadio(nombre:string){
    
    alert("estoy en s-estadio.service.ts  eliminare: "+nombre);
    /*  
    const url = "http://localhost:3000/deleteEstadio/"+nombre;
      return this.http.delete(url).pipe(map(data => data));
     */ 
  }
}// cierre 


