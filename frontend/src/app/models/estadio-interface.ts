

export interface EstadioInterface{
    estadio_nombre:string, 
    fecha_inaguracion: string,
    capacidad:number, 
    id_pais:number, 
    direccion:string,
    id_estado_estadio:number,
    link_fotografia:string
}

export interface PaisInterface{
    id_pais: number,
     nombre: string
}

export interface EstadoEstadioInteface{
    id_estado: number,
       nombre: string
}

/*
let LSchema = {
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
        }
}*/