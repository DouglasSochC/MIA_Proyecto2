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