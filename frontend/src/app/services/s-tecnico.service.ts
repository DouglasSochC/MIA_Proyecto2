import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class STecnicoService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  GetTecnicosMinimos(){
    const url = "http://localhost:3000/getTecnicoMinimo";
    return this.http.get(url);
  }

  GetTrayectoriaTecnico(id_tecnico:number){
    const url = "http://localhost:3000/getTrayectoriaTecnico/"+id_tecnico;
    return this.http.get(url);
  }

  InsertTrayectoria(id_tecnico:number, id_equipo_nuevo:number, fecha_transferencia:string){    
    const url = "http://localhost:3000/addTrayectoriaTecnico";
    return this.http.post(url, 
    {
      "id_tecnico": id_tecnico,
      "id_equipo_nuevo": id_equipo_nuevo,
      "fecha_transferencia": fecha_transferencia
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
    
  }

  GetTecnicosCompleto(){
    const url = "http://localhost:3000/getTecnicos";
    return this.http.get(url);
  }

  UpdateEstadoTecnico(id_tecnico:number, id_estado_tecnico:number){
    const url = "http://localhost:3000/updateEstadoTecnico";
    return this.http.put(url,
    {
      "id_tecnico": id_tecnico,
      "id_estado_tecnico": id_estado_tecnico
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  GetEstadoTecnico(){
    const url = "http://localhost:3000/getEstadoTecnicoClave";
    return this.http.get(url);
  }

}
