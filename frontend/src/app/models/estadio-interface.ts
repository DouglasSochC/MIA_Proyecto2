

export interface EstadioInterface{
    nombre:string, 
    fecha_inauguracion: string,
    capacidad:number, 
    id_pais:number, 
    direccion:string,
    id_estado:number, 
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
"id_estado": 1,
		"nombre": "Activo"

export interface EstadoUsuarioInterface{
    id_estado: number,
    nombre: string
}*/