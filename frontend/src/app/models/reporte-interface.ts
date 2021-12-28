export interface RP1Interface{
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: number,
    genero: string,
    fecha_nac: string,
    fecha_registro: string,
    direccion: string
}

export interface RP2Interface{
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: number,
    genero: string,
    fecha_nac: string,
    fecha_registro: string,
    direccion: string
}

export interface RP3Interface{
    cantidad_membresia: number,
    nombres: string,
    apellidos: string
}

export interface RP4Interface{
    cantidad_membresia: number,
    nombres: string,
    apellidos: string
}

export interface RP5Interface{
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: number,
    genero: string,
    fecha_nac: string,
    fecha_registro: string,
    direccion: string
}

export interface RP6Interface{
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: number,
    genero: string,
    fecha_nac: string,
    fecha_registro: string,
    direccion: string
}

export interface RP7Interface{
    id: number,
    nombres: string,
    apellidos: string,
    edad: number,
    genero: string
}

export interface RP8Interface{
    cantidad_noticias: number,
    id_usuario: number,
    nombres: string,
    apellidos: string,
    correo: string
}

export interface RP9Interface{
    cantidad_noticias: number,
    id_usuario: number,
    nombres: string,
    apellidos: string,
    correo: string
}

export interface RP10Interface{
    id_bitacora:number,
    descripcion: string,
    operacion: string,
    id_usuario: number,
    nombres: string,
    correo: string
}