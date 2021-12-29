import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SReporteclienteService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //1. Jugadores de X equipo
  GetReporteUno(id_equipo:number){
    const url = "http://localhost:3000/getReporteUnoClt/"+id_equipo;
    return this.http.get(url);
  }

  //2. Técnico de X equipo
  GetReporteDos(id_equipo:number){
    const url = "http://localhost:3000/getReporteDosClt/"+id_equipo;
    return this.http.get(url);
  }

  //3. Jugadores mayores a X años
  GetReporteTres(edad:number){
    const url = "http://localhost:3000/getReporteTresClt/"+edad;
    return this.http.get(url);
  }

  //4. Técnico mayores a X años
  GetReporteCuatro(edad:number){
    const url = "http://localhost:3000/getReporteCuatro/"+edad;
    return this.http.get(url);
  }

  //5. Jugadores menores a X años
  GetReporteCinco(edad:number){
    const url = "http://localhost:3000/getReporteCincoClt/"+edad;
    return this.http.get(url);
  }

  //6. Tecnico menores a X años
  GetReporteSeis(edad:number){
    const url = "http://localhost:3000/getReporteSeisClt/"+edad;
    return this.http.get(url);
  }

}
