import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SNoticiaService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  InsertarNoticia(descripcion:string, id_equipo:number, id_usuario:number){
    const url = "http://localhost:3000/addNoticia";
    return this.http.post(url, 
    {
      "descripcion": descripcion,
      "id_equipo": id_equipo,
      "id_usuario": id_usuario
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  GetNoticiasUsuario(id_usuario:number){
    const url = "http://localhost:3000/getNoticiaUsuario/"+id_usuario;
    return this.http.get(url);
  }

}
