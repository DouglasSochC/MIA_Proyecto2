/*NOTA: Antes de ejecutar este archivo, hay que percatarse de que ya esten 
llenas las tablas temporales*/

/*ARCHIVO ESTADIO*/
INSERT INTO PAIS(nombre)
SELECT DISTINCT pais FROM TEMP_ESTADIO
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_ESTADIO.pais) <= 0;

INSERT INTO ESTADO_ESTADIO(nombre)
SELECT DISTINCT estado FROM TEMP_ESTADIO;

INSERT INTO ESTADIO(nombre, fecha_inaguracion, capacidad, direccion, id_estado, id_pais)
SELECT DISTINCT 
nombre,
TO_DATE(fecha_ing,'DD/MM/YY'), 
capacidad, 
direccion, 
(SELECT id FROM ESTADO_ESTADIO WHERE ESTADO_ESTADIO.nombre = TEMP_ESTADIO.estado), 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_ESTADIO.pais)
FROM TEMP_ESTADIO;

COMMIT;

/*ARCHIVO EQUIPO*/
INSERT INTO PAIS(nombre)
SELECT DISTINCT pais FROM TEMP_EQUIPO
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_EQUIPO.pais) <= 0;

INSERT INTO EQUIPO(nombre, fecha_fundacion, id_pais)
SELECT DISTINCT 
nombre, 
TO_DATE(fecha_fun,'DD/MM/YY'), 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_EQUIPO.pais)
FROM TEMP_EQUIPO;

COMMIT;

/*ARCHIVO DIRECTORES TECNICOS*/
INSERT INTO PAIS(nombre)
SELECT DISTINCT pais FROM TEMP_TECNICO
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_TECNICO.pais) <= 0;

INSERT INTO PAIS(nombre)
SELECT DISTINCT pais_equipo FROM TEMP_TECNICO
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_TECNICO.pais_equipo) <= 0;

INSERT INTO ESTADO_TECNICO(nombre)
SELECT DISTINCT estado FROM TEMP_TECNICO;

INSERT INTO EQUIPO(nombre, id_pais)
SELECT DISTINCT
equipo, 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_TECNICO.pais_equipo)
FROM TEMP_TECNICO
WHERE 
(
    SELECT COUNT(id) 
    FROM EQUIPO 
    WHERE EQUIPO.nombre = TEMP_TECNICO.equipo 
    AND EQUIPO.id_pais = (SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_TECNICO.pais_equipo)
) <= 0;

INSERT INTO TECNICO(nombres, fecha_nac, id_nacionalidad, id_estado)
SELECT DISTINCT
nombres,
TO_DATE(fecha_nac,'DD/MM/YY'), 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_TECNICO.pais),
(SELECT id FROM ESTADO_TECNICO WHERE ESTADO_TECNICO.nombre = TEMP_TECNICO.estado)
FROM TEMP_TECNICO;

INSERT INTO TRAYECTORIA_TECNICO(id_tecnico, id_equipo, fecha_inicial, fecha_final)
SELECT
(SELECT id FROM TECNICO WHERE TECNICO.nombres = TEMP_TECNICO.nombres),
(SELECT id FROM EQUIPO WHERE EQUIPO.nombre = TEMP_TECNICO.equipo),
TO_DATE(fecha_ini,'DD/MM/YY'), 
TO_DATE(fecha_fin,'DD/MM/YY')
FROM TEMP_TECNICO;

COMMIT;

/*ARCHIVO COMPETICION*/
INSERT INTO PAIS(nombre)
SELECT DISTINCT pais FROM TEMP_COMPETICION
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais) <= 0;

INSERT INTO PAIS(nombre)
SELECT DISTINCT pais_equipo FROM TEMP_COMPETICION
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais_equipo) <= 0;

INSERT INTO EQUIPO(nombre, id_pais)
SELECT DISTINCT
equipo, 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais_equipo)
FROM TEMP_COMPETICION
WHERE 
(
    SELECT COUNT(id) 
    FROM EQUIPO 
    WHERE EQUIPO.nombre = TEMP_COMPETICION.equipo 
    AND EQUIPO.id_pais = (SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais_equipo)
) <= 0;

INSERT INTO TIPO_COMPETENCIA(nombre)
SELECT DISTINCT tipo FROM TEMP_COMPETICION;

INSERT INTO COMPETENCIA(nombre, anio, id_tipo_competencia, campeon, id_pais)
SELECT DISTINCT
nombre,
anio,
(SELECT id FROM TIPO_COMPETENCIA WHERE TIPO_COMPETENCIA.nombre = TEMP_COMPETICION.tipo),
campeon,
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais)
FROM TEMP_COMPETICION;

INSERT INTO HISTORIAL_COMPETENCIA(id_competencia, id_equipo)
SELECT
(SELECT id FROM COMPETENCIA WHERE 
COMPETENCIA.nombre = TEMP_COMPETICION.nombre AND
COMPETENCIA.anio = TEMP_COMPETICION.anio AND
COMPETENCIA.id_tipo_competencia = (SELECT id FROM TIPO_COMPETENCIA WHERE TIPO_COMPETENCIA.nombre = TEMP_COMPETICION.tipo) AND
COMPETENCIA.campeon = TEMP_COMPETICION.campeon AND
COMPETENCIA.id_pais = (SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais)),
(SELECT id FROM EQUIPO WHERE EQUIPO.nombre = TEMP_COMPETICION.equipo AND EQUIPO.id_pais = (SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_COMPETICION.pais_equipo))
FROM TEMP_COMPETICION;

COMMIT;

/*ARCHIVO JUGADOR*/
INSERT INTO PAIS(nombre)
SELECT DISTINCT nacionalidad FROM TEMP_JUGADOR
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_JUGADOR.nacionalidad) <= 0;

INSERT INTO PAIS(nombre)
SELECT DISTINCT pais_equipo FROM TEMP_JUGADOR
WHERE (SELECT COUNT(id) FROM PAIS WHERE PAIS.nombre = TEMP_JUGADOR.pais_equipo) <= 0;

INSERT INTO EQUIPO(nombre, id_pais)
SELECT DISTINCT
equipo, 
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_JUGADOR.pais_equipo)
FROM TEMP_JUGADOR
WHERE 
(
    SELECT COUNT(id) 
    FROM EQUIPO 
    WHERE EQUIPO.nombre = TEMP_JUGADOR.equipo 
    AND EQUIPO.id_pais = (SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_JUGADOR.pais_equipo)
) <= 0;

INSERT INTO POSICION_JUGADOR(nombre)
SELECT DISTINCT posicion
FROM TEMP_JUGADOR;

INSERT INTO JUGADOR(nombres, fecha_nac, id_nacionalidad, id_posicion)
SELECT DISTINCT
nombre,
TO_DATE(fecha_nac,'DD/MM/YY'),
(SELECT id FROM PAIS WHERE PAIS.nombre = TEMP_JUGADOR.nacionalidad),
(SELECT id FROM POSICION_JUGADOR WHERE POSICION_JUGADOR.nombre = TEMP_JUGADOR.posicion)
FROM TEMP_JUGADOR;

INSERT INTO TRAYECTORIA_JUGADOR(id_jugador, id_equipo, fecha_inicial, fecha_final)
SELECT
(SELECT id FROM JUGADOR WHERE JUGADOR.nombres = TEMP_JUGADOR.nombre),
(SELECT id FROM EQUIPO WHERE EQUIPO.nombre = TEMP_JUGADOR.equipo),
TO_DATE(fecha_ini,'DD/MM/YY'), 
TO_DATE(fecha_fin,'DD/MM/YY')
FROM TEMP_JUGADOR;

COMMIT;

/*ARCHIVO PARTIDO INCIDENCIAS*/