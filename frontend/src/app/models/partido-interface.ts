export interface PartidoInterface{
    id_partido: number;
    fecha_partido: string;
    id_estadio: number;
    nombre_estadio: string;
    id_estado: number;
    nombre_estado: string;
    asistencia: number;
    resultado: string;
    id_equipo_visita: number;
    nombre_equipo_visita: string;
    id_equipo_local: number;
    nombre_equipo_local: string;
}

export interface EstadoPartidoInterface{
    id_estado:number,
    nombre:string
}

export interface IncidenciasPartidoInterface{
    descripcion:string,
    minuto:string,
    equipo_incidencia:string,
    jugador: string
}