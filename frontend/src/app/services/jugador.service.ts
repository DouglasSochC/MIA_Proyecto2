import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  GetJugadores(){
    const url = "http://localhost:3000/getJugadoresMinimo";
    return this.http.get(url);
  }

  GetTrayectoriaJugador(id_jugador:number){
    const url = "http://localhost:3000/getTrayectoriaJugador/"+id_jugador;
    return this.http.get(url);
  }

  InsertTrayectoria(id_jugador:number, id_equipo_nuevo:number, fecha_transferencia:string){    
    const url = "http://localhost:3000/addTrayectoria";
    return this.http.post(url, 
    {
      "id_jugador": id_jugador,
      "id_equipo_nuevo": id_equipo_nuevo,
      "fecha_transferencia": fecha_transferencia
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
    
  }
  
}
