import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { EquipoComponent } from '../components/equipo/equipo.component';

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



/********* */
/*--------*/



GetStatusTecnico(){
  const url = "http://localhost:3000/getEstadoTecnico";
  return this.http.get(url);
}

DeleteTecnico(id_tecnico: number){
  const url = "http://localhost:3000/deleteTecnico/"+id_tecnico;
  return this.http.delete(url).pipe(map(data => data));
}



InsertTecnico(  nombre:string,
                fecha_nacimiento:string,
                link_fotografia:string,
                id_pais_tecnico:number, 
                id_estado_tecnico:number,
                id_equipo:number,
                fecha_inicial:string,
                fecha_final:string){    
  const url = "http://localhost:3000/addTecnico2";
  console.log("dentro del servicio de InsertTecnico s-tecnico-services");
  
  return this.http.post(url, 
  {      
    "nombre":nombre,
    "fecha_nacimiento":fecha_nacimiento,
    "link_fotografia": link_fotografia,
    "id_pais": id_pais_tecnico,
    "id_estado_tecnico": id_estado_tecnico,
    "id_equipo":id_equipo,
    "fecha_inicial":fecha_inicial,
    "fecha_final":fecha_final     
  }, 
  { headers: this.headers }
  //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
  //la libreria rxjs/operators
  ).pipe(map(data => data));  
}



InsertTrayectoriaTecnico( id_tecnico:number, 
                          id_equipo:number, 
                          fecha_ini:string,
                          fecha_fin:string){    
  const url = "http://localhost:3000/addTrayectoriaTecnico";
  return this.http.post(url, 
  {
    "id_tecnico": id_tecnico,
    "id_equipo_nuevo": id_equipo,
    "fecha_ini": fecha_ini,
    "fecha_fin": fecha_fin
  }, 
  { headers: this.headers }
  //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
  //la libreria rxjs/operators
  ).pipe(map(data => data)); 
  
}


/*--------*/
/********* */


}
