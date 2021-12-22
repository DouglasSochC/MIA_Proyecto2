

  import { Injectable } from '@angular/core';

  import { HttpClient, HttpHeaders } from "@angular/common/http";

  import { map } from "rxjs/operators";

import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})


export class SEstadioService {

//constructor(private http: HttpClient, private router: Router) { }
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  
    //TODO: GET Estadios
    GetEstadios() {
      const url = "http://localhost:3000/getEstadios";
      return this.http.get(url);
    } 
  
    
  
    //TODO: INSERT EQUIPOS
    InsertEstadios( nombreEstadio:string, 
                    fechaInauguracion:string,
                    capacidad:number,
                    pais:string,
                    direccion:string, 
                    estado:string ){
      
      const url = "http://localhost:3000/addEstadio";
      return this.http.post(url, 
      {
        "nombre": nombreEstadio,
        "fecha_inauguracion": fechaInauguracion,
        "capacidad": capacidad,
        "pais": pais,
        "direccion":direccion,
        "estadio": estado
      }, 
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
    }
  
    //TODO: UPDATE EQUIPOS
    UpdateEquipos(nombreEstadio:string, 
                  fechaInauguracion:string,
                  capacidad:number,
                  pais:string,
                  direccion:string, 
                  estado:string){
      const url = "http://localhost:3000/updateEstadio";
      return this.http.put(url, 
      {
        "nombre": nombreEstadio,
        "fecha_inauguracion": fechaInauguracion,
        "capacidad": capacidad,
        "pais": pais,
        "direccion":direccion,
        "estadio": estado
      }, 
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
    }
  
    //TODO: DELETE EQUIPOS
    DeleteEstadio(id_equipo:number){
      const url = "http://localhost:3000/deleteEstadio/"+id_equipo;
      return this.http.delete(url).pipe(map(data => data));
    }

}// cierre 
