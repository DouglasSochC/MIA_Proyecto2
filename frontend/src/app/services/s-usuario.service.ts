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

  actualizarCuentaCliente(id_usuario:number,nombres:string,apellidos:string,clave:string,telefono:number,genero:string,fecha_nac:string,direccion:string,link_fotografia:string,id_pais:number){
    const url = "http://localhost:3000/updateUsuario";
    return this.http.put(url, 
    {
      "id_usuario": id_usuario,
      "nombres": nombres,
      "apellidos": apellidos,
      "clave": clave,
      "telefono": telefono,
      "genero": genero,
      "fecha_nac":fecha_nac,
      "direccion":direccion,
      "link_fotografia":link_fotografia,
      "id_pais":id_pais
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  GetDatoscuentaCliente(id_usuario:number){
    const url = "http://localhost:3000/getInformacionUsuario/"+id_usuario;
    return this.http.get(url);
  }

  DeleteUsuario(id_usuario:number){
    const url = "http://localhost:3000/deleteUsuario/"+id_usuario;
    return this.http.delete(url).pipe(map(data => data));
  }

  GetUsuarios(){
    const url = "http://localhost:3000/getUsuarios";
    return this.http.get(url);
  }

  GetEstadoUsuario(){
    const url = "http://localhost:3000/getEstadoUsuario";
    return this.http.get(url);
  }

  GetTipoUsuario(){
    const url = "http://localhost:3000/getTiposUsuarios";
    return this.http.get(url);
  }

  InsertAdmEmp(nombres:string, apellidos:string, clave:string, correo:string, telefono:number, genero:string, fecha_nac:string, direccion:string, link_fotografia:string, id_pais:number, id_tipo_usuario:number, id_estado_usuario:number){
    const url = "http://localhost:3000/addUsuarioAdmEmp";
    return this.http.post(url, 
    {
      "nombres":nombres,
      "apellidos":apellidos,
      "clave":clave,
      "correo": correo,
      "telefono":telefono,
      "genero":genero,
      "fecha_nac":fecha_nac,
      "direccion":direccion,
      "link_fotografia":link_fotografia,
      "id_pais":id_pais,
      "id_tipo_usuario":id_tipo_usuario,
      "id_estado_usuario":id_estado_usuario
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  InsertBitacora(descripcion:string,operacion:string,id_usuario:number){
    const url = "http://localhost:3000/addBitacora";
    return this.http.post(url, 
    {
      "descripcion": descripcion,
      "operacion": operacion,
      "id_usuario": id_usuario
    });
  }

  UpdateAdmEmp(id_usuario:number,nombres:string, apellidos:string, clave:string, correo:string, telefono:number, genero:string, fecha_nac:string, direccion:string, link_fotografia:string, id_pais:number, id_tipo_usuario:number, id_estado_usuario:number){
    const url = "http://localhost:3000/updateUsuarioAdmEmp";
    return this.http.put(url, 
    {
      "id_usuario":id_usuario,
      "nombres":nombres,
      "apellidos":apellidos,
      "clave":clave,
      "correo": correo,
      "telefono":telefono,
      "genero":genero,
      "fecha_nac":fecha_nac,
      "direccion":direccion,
      "link_fotografia":link_fotografia,
      "id_pais":id_pais,
      "id_tipo_usuario":id_tipo_usuario,
      "id_estado_usuario":id_estado_usuario
    }, 
    { headers: this.headers }
    //Para retornar el resultado es necesario utilizar la funcion map. Recordar que se debe de importar
    //la libreria rxjs/operators
    ).pipe(map(data => data));
  }

  recuperarCuenta(correo:string){
    const url = "http://localhost:3000/recuperarCuenta";

    return this.http.post(url,
      {
        "correo": correo
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

}
