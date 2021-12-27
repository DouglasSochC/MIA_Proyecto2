export interface EquipoInterface{
    id_equipo: number,
    nombre: string,
    fecha_fundacion: string,
    link_fotografia: string,
    id_pais: number,
    nombre_pais: string
}

export interface PaisInterface{
    id_pais: number,
    nombre: string
}

export interface SeguirEquipoInterface{
    id_equipo:number,
    nombre_equipo:string,
    link_fotografia:string,
    nombre_pais: string,
    seguimiento: number
}