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

  //7. Equipos que participaron en X competición
  GetReporteSiete(id_competicion:number){
    const url = "http://localhost:3000/getReporteSieteClt/"+id_competicion;
    return this.http.get(url);
  }

  //8. Equipos de X país
  GetReporteOcho(id_pais:number){
    const url = "http://localhost:3000/getReporteOchoClt/"+id_pais;
    return this.http.get(url);
  }

  //9. Equipos con X años de antigüedad
  GetReporteNueve(anios:number){
    const url = "http://localhost:3000/getReporteNueveClt/"+anios;
    return this.http.get(url);
  }

  //10. Estadios en X país
  GetReporteDiez(id_pais:number){
    const url = "http://localhost:3000/getReporteDiezClt/"+id_pais;
    return this.http.get(url);
  }

  //11. Estadios con capacidad menor o igual a X
  GetReporteOnce(cantidad:number){
    const url = "http://localhost:3000/getReporteOnceClt/"+cantidad;
    return this.http.get(url);
  }

  //12. Histórico de partidos de X equipo
  GetReporteDoce(id_equipo:number){
    const url = "http://localhost:3000/getReporteDoceClt/"+id_equipo;
    return this.http.get(url);
  }

  //13. Listado de partidos entre X equipo contra Y equipo
  GetReporteTrece(id_equipo_1:number, id_equipo_2:number){
    const url = "http://localhost:3000/getReporteTreceClt/"+id_equipo_1+"/"+id_equipo_2;
    return this.http.get(url);
  }

  //14. Listado de partidos en X año
  GetReporteCatorce(anio:number){
    const url = "http://localhost:3000/getReporteCatorceClt/"+anio;
    return this.http.get(url);
  }

}
