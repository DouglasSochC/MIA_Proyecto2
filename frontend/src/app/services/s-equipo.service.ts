import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SEquipoService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  //TODO: GET EQUIPOS
  GetEquipos() {
    const url = "http://localhost:3000/getEquipos";
    return this.http.get(url);
  } 

  //TODO: GET PAISES
  GetPaises(){
    const url = "http://localhost:3000/getPaises";
    return this.http.get(url);
  }

  //TODO: INSERT EQUIPOS
  InsertEquipos(nombre:string, fecha_fundacion:string, link_fotografia:string, id_pais:number){
    
    const url = "http://localhost:3000/addEquipo";
    return this.http.post(url, 
    {
      "nombre": nombre,
      "fecha_fundacion": fecha_fundacion,
      "link_fotografia": link_fotografia,
      "id_pais": id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  //TODO: UPDATE EQUIPOS
  UpdateEquipos(id_equipo:number, nombre:string, fecha_fundacion:string, link_fotografia:string, id_pais:number){
    const url = "http://localhost:3000/updateEquipo";
    return this.http.put(url, 
    {
      "id_equipo": id_equipo,
      "nombre": nombre,
      "fecha_fundacion": fecha_fundacion,
      "link_fotografia": link_fotografia,
      "id_pais": id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  //TODO: DELETE EQUIPOS
  DeleteEquipo(id_equipo:number){
    const url = "http://localhost:3000/deleteEquipo/"+id_equipo;
    return this.http.delete(url).pipe(map(data => data));
  }

  InsertSeguirEquipo(id_usuario:number, id_equipo:number){
    const url = "http://localhost:3000/addSeguimientoEquipo";
    return this.http.post(url, 
    {
      "id_usuario": id_usuario,
      "id_equipo": id_equipo
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  DeleteSeguimiento(id_usuario:number, id_equipo:number){
    const url = "http://localhost:3000/deleteSeguimientoEquipo/"+id_usuario+"/"+id_equipo;
    return this.http.delete(url).pipe(map(data => data));
  }

  //Debe de mostrar loo
  GetMostrarEquiposSeguidos(id_usuario:number){
    const url = "http://localhost:3000/getSeguirEquipo/"+id_usuario;
    return this.http.get(url);
  }

}
