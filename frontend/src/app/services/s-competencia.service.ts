import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SCompetenciaService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  GetTipoCompetencia() {
    const url = "http://localhost:3000/getTiposCompetencias";
    return this.http.get(url);
  } 

  GetCompetencia(){
    const url = "http://localhost:3000/getCompetencias";
    return this.http.get(url);
  }

  InsertCompetencia(nombre:string, anio:number, campeon:string, id_tipo_competencia:number, id_pais:number){
    
    const url = "http://localhost:3000/addCompetencia";
    return this.http.post(url, 
    {
      "nombre":nombre,
      "anio":anio,
      "campeon":campeon,
      "id_tipo_competencia":id_tipo_competencia,
      "id_pais":id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  UpdateCompetencia(id_competencia:number, nombre:string, anio:number, campeon:string, id_tipo_competencia:number, id_pais:number){
    const url = "http://localhost:3000/updateCompetencia";
    return this.http.put(url, 
    {
      "id_competencia":id_competencia,
      "nombre":nombre,
      "anio":anio,
      "campeon":campeon,
      "id_tipo_competencia":id_tipo_competencia,
      "id_pais":id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  DeleteCompetencia(id_competencia:number){
    const url = "http://localhost:3000/deleteCompetencia/"+id_competencia;
    return this.http.delete(url).pipe(map(data => data));
  }
}
