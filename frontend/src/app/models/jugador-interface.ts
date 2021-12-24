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