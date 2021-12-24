export interface UsuarioInterface{
    id: number,
    nombres: string,
    apellidos: string,
    membresia_activa: number,
    tipo_usuario: string
}

export interface UsuarioClienteInterface{
    nombres: string,
    apellidos: string,
    clave: string,
    telefono: number,
    genero: string,
    fecha_nac: string,
    direccion: string,
    link_fotografia: string,
    id_pais: number
}

export interface EstadoUsuarioInterface{
    id_estado: number,
    nombre: string
}

export interface UsuariosTodosInterface{
    id_usuario:number,
    nombres:string,
    apellidos:string,
    clave:string,
    telefono:number,
    genero:string,
    fecha_nac:string,
    direccion:string,
    link_fotografia:string,
    id_pais:number,
    nombre_pais:string,
    id_tipo_usuario:number,
    nombre_tipo_usuario:string,
    id_estado_usuario:number,
    nombre_estado_usuario:string
}

export interface TipoUsuarioInterface{
    id:number,
    nombre:string
}