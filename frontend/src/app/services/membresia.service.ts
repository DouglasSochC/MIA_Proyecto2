import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  GetMembresia(id_usuario:number){
    const url = "http://localhost:3000/getMembresiaUsuario/"+id_usuario;
    return this.http.get(url);
  }

  InsertMembresia(num_tarjeta:number, id_usuario:number){
    const url = "http://localhost:3000/addMembresia";
    return this.http.post(url, 
    {
      "id_usuario": id_usuario,
      "num_tarjeta": num_tarjeta
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

}
