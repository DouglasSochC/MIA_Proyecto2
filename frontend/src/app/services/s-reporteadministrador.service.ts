import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SReporteadministradorService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //1. Usuarios Suscritos a X equipo
  GetUsuarioEquipo(id_equipo:number){
    const url = "http://localhost:3000/getUsuarioEquipo/"+id_equipo;
    return this.http.get(url);
  }

  //2. Usuario Con o Sin Membresía
  GetUsuarioMembresia(membresia_activa:number){
    const url = "http://localhost:3000/getUsuarioMembresia/"+membresia_activa;
    return this.http.get(url);
  }

  //3. Usuarios que Mas membresías han adquirido
  GetMasMembresia(){
    const url = "http://localhost:3000/getMasMembresia";
    return this.http.get(url);
  }

  //4. Usuarios que más dinero han gastado
  GetUsuarioDinero(){
    const url = "http://localhost:3000/getUsuarioDinero";
    return this.http.get(url);
  }

  //5. Usuarios de X País
  GetUsuarioPais(id_pais:number){
    const url = "http://localhost:3000/getUsuarioPais/"+id_pais;
    return this.http.get(url);
  }

  //6. Usuarios de X genero
  GetUsuarioGenero(genero:string){
    const url = "http://localhost:3000/getUsuarioGenero/"+genero;
    return this.http.get(url);
  }

  //7. Usuarios con al menos X años de edad
  GetUsuarioEdad(edad:number){
    const url = "http://localhost:3000/getUsuarioEdad/"+edad;
    return this.http.get(url);
  }

  //8. Empleados que MAS/MENOS noticias han publicado
  GetMENoticias(es_mas:number){
    const url = "http://localhost:3000/getMENoticias/"+es_mas;
    return this.http.get(url);
  }

  //9. Empleados que MAS/MENOS noticias han publicado de X Equipo
  GetMENoticiasEquipo(es_mas:number, id_equipo:number){
    const url = "http://localhost:3000/getMENoticiasEquipo/"+es_mas+"/"+id_equipo;
    return this.http.get(url);
  }

  //10. Bitácoras de los administradores.
  GetBicatoras(){
    const url = "http://localhost:3000/getBicatoras";
    return this.http.get(url);
  }
  
}
