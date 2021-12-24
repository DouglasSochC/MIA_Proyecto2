ALTER SESSION set NLS_DATE_FORMAT = 'DD/MM/YYYY';
DROP TABLE TEMP_COMPETICION;
DROP TABLE TEMP_EQUIPO;
DROP TABLE TEMP_ESTADIO;
DROP TABLE TEMP_INCIDENCIAS;
DROP TABLE TEMP_JUGADOR;
DROP TABLE TEMP_TECNICO;
DROP TABLE BITACORA;
DROP TABLE NOTICIA_EQUIPO;
DROP TABLE HISTORIAL_MEMBRESIA;
DROP TABLE EQUIPO_USUARIO;
DROP TABLE USUARIO;
DROP TABLE ESTADO_USUARIO;
DROP TABLE MEMBRESIA;
DROP TABLE TIPO_USUARIO;
DROP TABLE INCIDENCIAS_PARTIDO;
DROP TABLE PARTIDO;
DROP TABLE ESTADO_PARTIDO;
DROP TABLE HISTORIAL_COMPETENCIA;
DROP TABLE COMPETENCIA;
DROP TABLE TIPO_COMPETENCIA;
DROP TABLE TRAYECTORIA_JUGADOR;
DROP TABLE JUGADOR;
DROP TABLE ESTADO_JUGADOR;
DROP TABLE POSICION_JUGADOR;
DROP TABLE TRAYECTORIA_TECNICO;
DROP TABLE TECNICO;
DROP TABLE ESTADO_TECNICO;
DROP TABLE EQUIPO;
DROP TABLE ESTADIO;
DROP TABLE ESTADO_ESTADIO;
DROP TABLE ARBITRO;
DROP TABLE ESTADO_ARBITRO;
DROP TABLE PAIS;

CREATE TABLE PAIS(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ESTADO_ARBITRO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ARBITRO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    fecha_nac DATE NOT NULL,
    id_estado INTEGER NOT NULL,
    id_nacionalidad INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_nacionalidad) REFERENCES PAIS(id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_ARBITRO(id)
);

CREATE TABLE ESTADO_ESTADIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ESTADIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100),
    fecha_inaguracion DATE,
    capacidad INTEGER,
    direccion VARCHAR(300),
    link_fotografia VARCHAR(4000),
    id_estado INTEGER,
    id_pais INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_ESTADIO(id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id)    
);

CREATE TABLE EQUIPO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(150) NOT NULL,
    fecha_fundacion DATE,
    link_fotografia VARCHAR(4000),
    id_pais INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id)
);

CREATE TABLE ESTADO_TECNICO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE TECNICO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombres VARCHAR(500),
    fecha_nac DATE,
    link_fotografia VARCHAR(4000),
    id_nacionalidad INTEGER,
    id_estado INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (id_nacionalidad) REFERENCES PAIS(id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_TECNICO(id)
);

CREATE TABLE TRAYECTORIA_TECNICO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id_tecnico INTEGER NOT NULL,
    id_equipo INTEGER NOT NULL,
    fecha_inicial DATE NOT NULL,
    fecha_final DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (id_tecnico) REFERENCES TECNICO(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id)
);

CREATE TABLE POSICION_JUGADOR(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ESTADO_JUGADOR(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE JUGADOR(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombres VARCHAR(500),
    fecha_nac DATE,
    id_nacionalidad INTEGER,
    id_posicion INTEGER,
    id_estado_jugador INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (id_nacionalidad) REFERENCES PAIS(id),
    FOREIGN KEY (id_estado_jugador) REFERENCES ESTADO_JUGADOR(id)
);

CREATE TABLE TRAYECTORIA_JUGADOR(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id_jugador INTEGER NOT NULL,
    id_equipo INTEGER NOT NULL,
    fecha_inicial DATE NOT NULL,
    fecha_final DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (id_jugador) REFERENCES JUGADOR(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id)
);

CREATE TABLE TIPO_COMPETENCIA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE COMPETENCIA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(200) NOT NULL,
    anio INT NOT NULL,
    campeon VARCHAR(200),
    id_tipo_competencia INTEGER NOT NULL,    
    id_pais INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tipo_competencia) REFERENCES TIPO_COMPETENCIA(id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id)
);

CREATE TABLE HISTORIAL_COMPETENCIA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id_competencia INTEGER NOT NULL,
    id_equipo INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_competencia) REFERENCES COMPETENCIA(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id)
);

CREATE TABLE ESTADO_PARTIDO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PARTIDO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    fecha DATE,
    id_estadio INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,
    asistencia INTEGER NOT NULL,
    id_equipo_visita INTEGER NOT NULL,
    id_equipo_local INTEGER NOT NULL,
    resultado VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_estadio) REFERENCES ESTADIO(id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_PARTIDO(id),
    FOREIGN KEY (id_equipo_visita) REFERENCES EQUIPO(id),
    FOREIGN KEY (id_equipo_local) REFERENCES EQUIPO(id)
);

CREATE TABLE INCIDENCIAS_PARTIDO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    descripcion VARCHAR(2000),
    minuto VARCHAR(100),
    equipo_incidencia VARCHAR(1000),
    jugador VARCHAR(1000),
    id_partido INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_partido) REFERENCES PARTIDO(id)
);

CREATE TABLE TIPO_USUARIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MEMBRESIA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(200),
    PRIMARY KEY (id)
);

CREATE TABLE ESTADO_USUARIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(200),
    PRIMARY KEY (id)
);

CREATE TABLE USUARIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombres VARCHAR(200),
    apellidos VARCHAR(200),
    clave VARCHAR(100),
    correo VARCHAR(150),
    telefono INTEGER,
    genero VARCHAR(50),
    fecha_nac DATE NOT NULL,
    fecha_registro DATE NOT NULL,
    direccion VARCHAR(150),
    membresia_activa NUMBER(1,0),
    link_fotografia VARCHAR(4000),
    id_pais INTEGER,
    id_tipo INTEGER NOT NULL,
    id_estado_usuario INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id),
    FOREIGN KEY (id_tipo) REFERENCES TIPO_USUARIO(id),
    FOREIGN KEY (id_estado_usuario) REFERENCES ESTADO_USUARIO(id)
);

CREATE TABLE EQUIPO_USUARIO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id_usuario INTEGER NOT NULL,
    id_equipo INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id)
);

CREATE TABLE HISTORIAL_MEMBRESIA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    id_usuario INTEGER NOT NULL,
    id_membresia INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    num_tarjeta INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_membresia) REFERENCES MEMBRESIA(id)
);

CREATE TABLE NOTICIA_EQUIPO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    descripcion VARCHAR2(4000) NOT NULL,
    id_equipo INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE BITACORA(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    descripcion VARCHAR2(4000) NOT NULL,
    operacion VARCHAR(100) NOT NULL,
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE TEMP_ESTADIO(
    PAIS VARCHAR(4000),
    NOMBRE VARCHAR(4000),
    FECHA_ING VARCHAR(4000),
    CAPACIDAD VARCHAR(4000),
    DIRECCION VARCHAR(4000),
    ESTADO VARCHAR(4000)
);

CREATE TABLE TEMP_TECNICO(
    NOMBRES VARCHAR(4000),
    FECHA_NAC VARCHAR(4000),
    PAIS VARCHAR(4000),
    ESTADO VARCHAR(4000),
    PAIS_EQUIPO VARCHAR(4000),
    EQUIPO VARCHAR(4000),
    FECHA_INI VARCHAR(4000),
    FECHA_FIN VARCHAR(4000)
);

CREATE TABLE TEMP_EQUIPO(
    NOMBRE VARCHAR(4000),
    FECHA_FUN VARCHAR(4000),
    PAIS VARCHAR(4000)
);

CREATE TABLE TEMP_JUGADOR(
    NOMBRE VARCHAR(4000),
    FECHA_NAC VARCHAR(4000),
    NACIONALIDAD VARCHAR(4000),
    POSICION VARCHAR(4000),
    PAIS_EQUIPO VARCHAR(4000),
    EQUIPO VARCHAR(4000),
    FECHA_INI VARCHAR(4000),
    FECHA_FIN VARCHAR(4000)
);

CREATE TABLE TEMP_COMPETICION(
    NOMBRE VARCHAR(4000),
    AÑO VARCHAR(4000),
    TIPO VARCHAR(4000),
    CAMPEON VARCHAR(4000),
    PAIS VARCHAR(4000),
    PAIS_EQUIPO VARCHAR(4000),
    EQUIPO VARCHAR(4000)
);

CREATE TABLE TEMP_INCIDENCIAS(
    FECHA VARCHAR(4000),
    ESTADIO VARCHAR(4000),
    ESTADO VARCHAR(4000),
    ASISTENCIA VARCHAR(4000),
    PAIS_LOCAL VARCHAR(4000),
    EQUIPO_LOCAL VARCHAR(4000),
    PAIS_VISITA VARCHAR(4000),
    EQUIPO_VISITA VARCHAR(4000),
    RESULTADO VARCHAR(4000),
    INCIDENCIA VARCHAR(4000),
    MINUTO VARCHAR(4000),
    EQUIPO_INCIDENCIA VARCHAR(4000),
    JUGADOR VARCHAR(4000)
);

/*DATOS PREDEFINIDOS*/
INSERT INTO TIPO_USUARIO(nombre) VALUES('Administrador');
INSERT INTO TIPO_USUARIO(nombre) VALUES('Empleado');
INSERT INTO TIPO_USUARIO(nombre) VALUES('Cliente');
INSERT INTO ESTADO_USUARIO (nombre) VALUES('Activo');
INSERT INTO ESTADO_USUARIO (nombre) VALUES('No Activo');
INSERT INTO MEMBRESIA(nombre) VALUES('Normal');
INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, 
direccion, membresia_activa, id_tipo, id_estado_usuario)  
VALUES ('Douglas','Soch','123','prueba1@gmail.com',12345678,'M','01/01/1990','02/01/2021','Dir 1',0,
(SELECT(ID) FROM TIPO_USUARIO WHERE NOMBRE = 'Administrador'),
(SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo'));
COMMIT;

/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/
/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/
/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/
INSERT INTO PAIS(nombre) VALUES('Inglaterra');
INSERT INTO PAIS(nombre) VALUES('España');
INSERT INTO PAIS(nombre) VALUES('Alemania');
INSERT INTO PAIS(nombre) VALUES('Italia');
INSERT INTO PAIS(nombre) VALUES('Francia');
COMMIT;

INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, 
direccion, membresia_activa, id_pais, id_tipo, id_estado_usuario) 
VALUES (
    'Alexander',
    'Catalan',
    '321',
    'prueba2@gmail.com',
    87654321,
    'M',
    '03/01/1998',
    '04/01/2021',
    'Dir 2',
    0,
    (SELECT(ID) FROM PAIS WHERE NOMBRE = 'España'),
    (SELECT(ID) FROM TIPO_USUARIO WHERE NOMBRE = 'Empleado'),
    (SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo'));

INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, 
direccion, membresia_activa, id_pais, id_tipo, id_estado_usuario) 
VALUES (
    'Juan',
    'Perez',
    '456',
    'prueba3@gmail.com',
    45612378,'M',
    '05/01/2001',
    '06/01/2021',
    'Dir 3',
    0,
    (SELECT(ID) FROM PAIS WHERE NOMBRE = 'Alemania'),
    (SELECT(ID) FROM TIPO_USUARIO WHERE NOMBRE = 'Cliente'),
    (SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo'));

INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, 
direccion, membresia_activa, id_pais, id_tipo, id_estado_usuario) 
VALUES (
    'Rosa',
    'Fulana',
    '654',
    'prueba4@gmail.com',
    87123456,
    'F',
    '06/01/2000',
    '07/01/2021',
    'Dir 4',
    0,
    (SELECT(ID) FROM PAIS WHERE NOMBRE = 'Italia'),
    (SELECT(ID) FROM TIPO_USUARIO WHERE NOMBRE = 'Cliente'),
    (SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo'));
COMMIT;
/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/
/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/
/*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*//*DATOS DE PRUEBA*/

/*PROCEDIMIENTO ALMACENADO*/
CREATE OR REPLACE PROCEDURE AGREGAR_BITACORA (descripcion_usu VARCHAR2, operacion_usu VARCHAR2, id_usu INTEGER) is
BEGIN
INSERT INTO BITACORA (DESCRIPCION, OPERACION, ID_USUARIO) VALUES(descripcion_usu, operacion_usu, id_usu);
END;