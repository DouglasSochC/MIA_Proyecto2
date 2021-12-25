export interface TJugadorTransferencia{
    id_jugador:number,
    nombre_jugador:string, 
    id_equipo:number,
    nombre_equipo:string,
    fecha_inicial:string,
    fecha_final:string
}

export interface ListadoJugadores{
    id_jugador:number,
    nombres:string,
    nombre_pais:string
}

export interface TJugador{
    id_jugador: number,
    nombres: string,
    fecha_nacimiento: string,
    id_pais: number,
    nombre_pais: string,
    id_posicion: number,
    nombre_posicion: string,
    id_estado_jugador: number,
    nombre_estado_jugador: string
}