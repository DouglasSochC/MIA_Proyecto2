import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SPartidoService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  GetPartidos(){
    const url = "http://localhost:3000/getPartidos";
    return this.http.get(url);
  }

  GetPartidosEnCurso(){
    const url = "http://localhost:3000/getPartidosenCurso";
    return this.http.get(url);
  }

  UpdateEstadoPartido(id_partido:number, id_estado:number){
    const url = "http://localhost:3000/updateEstadoPartido";
    return this.http.put(url, 
    {
      "id_partido": id_partido,
      "id_estado": id_estado
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }
  
  GetEstadoPartidoClave(){
    const url = "http://localhost:3000/getEstadosPartidoClave";
    return this.http.get(url);
  }

  GetEstadoPartido(){
    const url = "http://localhost:3000/getEstadosPartido";
    return this.http.get(url);
  }

  GetPartidoporsuEstado(id_estado:number){
    const url = "http://localhost:3000/getPartidopsEstado/"+id_estado;
    return this.http.get(url);
  }

  InsertIncidencia(descripcion:string, minuto:string, equipo_incidencia:string, jugador:string, id_partido:number, resultado:string){
    const url = "http://localhost:3000/addIncidenciaPartido";
    return this.http.post(url, 
    {
      "descripcion":descripcion,
      "minuto":minuto,
      "equipo_incidencia":equipo_incidencia,
      "jugador":jugador,
      "id_partido":id_partido,
      "resultado":resultado
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  InsertPartido(fecha_partido:string, id_estadio:number, id_estado_partido:number, asistencia:number, id_equipo_visita:number, id_equipo_local:number, resultado:string){
    const url = "http://localhost:3000/addPartido";
    return this.http.post(url, 
    {
      "fecha_partido":fecha_partido,
      "id_estadio":id_estadio,
      "id_estado_partido":id_estado_partido,
      "asistencia":asistencia,
      "id_equipo_visita":id_equipo_visita,
      "id_equipo_local":id_equipo_local,
      "resultado":resultado
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  UpdatePartido(id_partido:number, fecha_partido:string, id_estadio:number, id_estado_partido:number, asistencia:number, id_equipo_visita:number, id_equipo_local:number, resultado:string){
    const url = "http://localhost:3000/updatePartido";
    return this.http.put(url, 
    {
      "id_partido": id_partido,
      "fecha_partido": fecha_partido,
      "id_estadio": id_estadio,
      "id_estado_partido": id_estado_partido,
      "asistencia": asistencia,
      "id_equipo_visita": id_equipo_visita,
      "id_equipo_local": id_equipo_local,
      "resultado":resultado
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  DeletePartido(id_partido:number){
    const url = "http://localhost:3000/deletePartido/"+id_partido;
    return this.http.delete(url).pipe(map(data => data));
  }

  GetDetallePartido(id_partido:number){
    const url = "http://localhost:3000/getDetallePartido/"+id_partido;
    return this.http.get(url);
  }

}
