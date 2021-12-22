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

}
