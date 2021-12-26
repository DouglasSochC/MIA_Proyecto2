
/*  {
            "id_jugador": registro[0],
            "nombres": registro[1],
            "fecha_nacimiento": registro[2],
            "id_pais": registro[3],
            "nombre_pais": registro[4],
            "id_posicion": registro[5],
            "nombre_posicion": registro[6],
            "id_estado_jugador": registro[7],
            "nombre_estado_jugador": registro[8]
    }   */


export interface TJugadorTransferencia{
    id_jugador:number,
    nombre_jugador:string, 
    id_equipo:number,
    nombre_equipo:string,
    nombre_pais_equipo:string,
    fecha_inicial:string,
    fecha_final:string
}

export interface ListadoJugadores{
    id_jugador:number,
    nombres:string,
    nombre_pais:string
}

//informacion del jugador
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

export interface PosicionJugador{
    id_posicion_jugador: number,
    nombre: string 
}

export interface EstadoJugador{
    id_estado_jugador: number,
    nombre: string 
}
