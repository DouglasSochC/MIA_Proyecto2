export interface JugadorReporteInterface{
    id:number,
    nombres:string,
    fecha_nac:string,
    id_pais:number,
    nombre_pais:string,
    id_posicion:number,
    nombre_posicion:string,
    id_equipo:number,
    nombre_equipo:string
}

export interface TecnicoReporteInterface{
    id:number,
    nombres:string,
    fecha_nac:string,
    link_fotografia:string,
    id_pais:number,
    nombre_pais:string,
    id_equipo:number,
    nombre_equipo:string
}

export interface EquipoReporteInterface{
    link_fotografia:string,
    id_equipo: number,
    nombre_equipo: string,
    fecha_fundacion: string,
    id_pais_equipo: number,
    nombre_pais: string
}

export interface EstadioReporteInterface{
    id:number,
    nombre_estadio:string,
    fecha_inaguracion:string,
    capacidad:number,
    direccion:string,
    link_fotografia:string,
    id_pais:number,
    nombre_pais:string,
    id_estado_estadio:number,
    nombre_estado_estadio:string
}

export interface HistoricoEquipoInterface{
    fecha:string,
    asistencia:number,
    resultado:string,
    id_estadio:number,
    nombre_estadio:string,
    id_estado_partido:number,
    nombre_estado_partido:string,
    id_equipo_local: number,
    nombre_equipo_local: string,
    id_equipo_visita: number,
    nombre_equipo_visita: string
}