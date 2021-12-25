export interface NoticiaInterface{
    id_noticia:number,
    descripcion_noticia:string,
    id_equipo:number,
    nombre_equipo:string,
    nombre_pais_equipo:string
}

export interface NoticiaClienteInterface{
    id_noticia:number,
    descripcion_noticia:string,
    id_equipo:number,
    nombre_equipo:string,
    link_fotografia:string,
    nombre_pais_equipo:string
}