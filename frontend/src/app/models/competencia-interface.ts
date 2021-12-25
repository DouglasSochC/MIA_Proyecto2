export interface CompetenciaInterface{
    id_competencia:number,
    nombre:string,
    anio:number,
    campeon:string,
    id_tipo_competencia:number,
    tipo_competencia_nombre:string,
    id_pais:number,
    pais_nombre:string
}

export interface TipoCompetenciaInterface{
    id_tipo_competencia:number,
    nombre:string
}