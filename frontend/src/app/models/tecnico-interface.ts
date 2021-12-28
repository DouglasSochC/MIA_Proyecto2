export interface TTecnicoransferenciaInterface{
    id_tecnico:number,
    nombre_tecnico:string, 
    id_equipo:number,
    nombre_equipo:string,
    nombre_pais_equipo:string,
    fecha_inicial:string,
    fecha_final:string
}

export interface ListadoTecnicoInterface{
    id_tecnico:number,
    nombres:string,
    nombre_pais:string
}

export interface TTecnicoInterface{
    id_tecnico:number,
    nombre_tecnico:string,
    fecha_nacimiento:string,
    link_fotografia:string,
    id_nacionalidad:number,
    nombre_pais:string,
    id_estado_tecnico:number,
    nombre_estado_tecnico:string
}

/******************** */
/*------------------ */

export interface EstadoTecnicoInterface{
    id_estado:number,
    nombre:string
}

/*------------------ */
/******************** */


