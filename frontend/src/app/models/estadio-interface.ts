

/*

            "id_estadio": registro[0],
            "estadio_nombre": registro[1],
            "fecha_inaguracion": registro[2],
            "capacidad": registro[3],
            "direccion": registro[4],
            "link_fotografia": registro[5],
            
            "id_estado_estadio": registro[6],
            "estado_nombre": registro[7],
            "id_pais": registro[8],
            "pais_nombre": registro[9]


*/


export interface EstadioInterface{
    id_estadio:number,
    estadio_nombre:string, 
    fecha_inaguracion: string,
    capacidad:number, 
    direccion:string,
    link_fotografia:string,
    id_estado_estadio:number,
    estado_nombre:string,
    id_pais:number,
    pais_nombre:string    
}


export interface PaisInterface{
    id_pais: number,
     nombre: string
}

export interface EstadoEstadioInteface{
    id_estado: number,
       nombre: string
}
