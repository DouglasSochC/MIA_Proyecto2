

export interface EstadioInterface{
    id_estadio:number,
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
