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
    const url = "http://localhost:3000/addTrayectoriaJugador";
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

  GetJugadoresCompleto(){
    const url = "http://localhost:3000/getJugadores";
    return this.http.get(url);
  }
                                    
  GetEstadoJugador(){
    const url = "http://localhost:3000/getEstadoJugador";
    return this.http.get(url);
  }
  
  GetEstadoJugadorClave(){
    const url = "http://localhost:3000/getEstadoJugadorClave";
    return this.http.get(url);
  }
 
  GetPosicionJugador(){
    const url = "http://localhost:3000/getPosicionJugador";
    return this.http.get(url);
  }

  UpdateEstadoJugador(id_jugador:number, id_estado_jugador:number){
    const url = "http://localhost:3000/updateEstadoJugador";
    return this.http.put(url, 
    {
      "id_jugador": id_jugador,
      "id_estado_jugador": id_estado_jugador
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }
  

  InsertarJugador(
                  nombres:string, 
                  fecha_nacimiento:string,
                  id_pais:number,
                  id_posicion:number,
                  id_estado_jugador:number
                ){      
      const url = "http://localhost:3000/addJugador";
      return this.http.post(url, 
      {
        "nombres": nombres,
        "fecha_nacimiento":fecha_nacimiento,
        "id_pais": id_pais,
        "id_posicion":id_posicion,
        "id_estado_jugador":id_estado_jugador
      },
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));

  }

  ActualizarJugador(  id_jugadr:number,
                      nombres:string, 
                      fecha_nacimiento:string,
                      id_pais:number,
                      posicion:number,
                      estado:number                      
                  ){
      const url = "http://localhost:3000/updateJugador";
      
      return this.http.put(url, 
      { 
        "nombres": nombres,
        "fecha_nacimiento": fecha_nacimiento,
        "id_pais": id_pais,
        "id_posicion": posicion,
        "id_estado_jugador":estado,
        "id_jugador": id_jugadr,
      }, 
      { headers: this.headers }
      //Para retornar el resultado es necesario utilizar la funcion map. 
      //Recordar que se debe de importar la libreria rxjs/operators
      ).pipe(map(data => data));
  }

  

  DeleteJugador(id_jugador:number){
    const url = "http://localhost:3000/deleteJugador/"+id_jugador;
    return this.http.delete(url).pipe(map(data => data));
  }

}


