export interface TTecnicoransferencia{
    id_tecnico:number,
    nombre_tecnico:string, 
    id_equipo:number,
    nombre_equipo:string,
    fecha_inicial:string,
    fecha_final:string
}

export interface ListadoTecnico{
    id_tecnico:number,
    nombres:string,
    nombre_pais:string
}