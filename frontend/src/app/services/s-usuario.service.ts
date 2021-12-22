import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UsuarioInterface } from '../models/usuario-interface';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class SUsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  //TODO: LOGIN
  loginUsuario(correo:string, contrasenia:string) {
    const url = "http://localhost:3000/loguearUsuario";

    return this.http.post(url,
      {
        "email": correo,
        "pass": contrasenia
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  //TODO: SETEAR USUARIO ACTUAL
  setUsuarioActual(usuario: UsuarioInterface) {
    let cuerpo_usuario = JSON.stringify(usuario);
    localStorage.setItem('UsuarioLogueado', cuerpo_usuario);
  }

  //TODO: OBTENER USUARIO ACTUAL
  getUsuarioActual() {
    let usuarioLogueado = localStorage.getItem('UsuarioLogueado') as string;
    if (usuarioLogueado) {
      let user_json = JSON.parse(usuarioLogueado);
      return user_json;
    } else {
      return null;
    }
  }

  //TODO: LOGOUT
  logoutUsuario() {
    localStorage.removeItem("UsuarioLogueado");
    this.router.navigate(['/login']);
  }

  crearCuentaNueva(nombres:string, apellidos:string, clave:string, correo:string, telefono:number, genero:string, fecha_nac:string, direccion:string, id_pais:number){
    const url = "http://localhost:3000/addUsuarioCliente";
    return this.http.post(url, 
    {
      "nombres": nombres,
      "apellidos": apellidos,
      "clave": clave,
      "correo": correo,
      "telefono": telefono,
      "genero": genero,
      "fecha_nac": fecha_nac,
      "direccion": direccion,
      "id_pais": id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

}
