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

  GetPartido(){
    const url = "http://localhost:3000/getPartidos";
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
  
  GetEstadoPartido(){
    const url = "http://localhost:3000/getEstadosPartidoClave";
    return this.http.get(url);
  }

}
