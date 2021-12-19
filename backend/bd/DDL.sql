DROP TABLE NOTICIA_EQUIPO;
DROP TABLE HISTORIAL_MEMBRESIA;
DROP TABLE EQUIPO_USUARIO;
DROP TABLE USUARIO;
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
    id_estado INTEGER,
    id_pais INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_ESTADIO(id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id)    
);

CREATE TABLE EQUIPO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(150) NOT NULL,
    fecha_fundacion DATE NOT NULL,
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

CREATE TABLE JUGADOR(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    nombres VARCHAR(500) NOT NULL,
    fecha_nac DATE NOT NULL,
    id_nacionalidad INTEGER NOT NULL,
    id_posicion INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_nacionalidad) REFERENCES PAIS(id)
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
    id_tipo_competencia INTEGER NOT NULL,
    id_campeon INTEGER,
    id_pais INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tipo_competencia) REFERENCES TIPO_COMPETENCIA(id),
    FOREIGN KEY (id_campeon) REFERENCES EQUIPO(id),
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
    fecha DATE NOT NULL,
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
    minuto INTEGER NOT NULL,
    id_equipo_incidencia INTEGER NOT NULL,
    id_jugador INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_equipo_incidencia) REFERENCES EQUIPO(id),
    FOREIGN KEY (id_jugador) REFERENCES JUGADOR(id)
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
    id_pais INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pais) REFERENCES PAIS(id),
    FOREIGN KEY (id_tipo) REFERENCES TIPO_USUARIO(id)
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
    fecha_final DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_membresia) REFERENCES MEMBRESIA(id)
);

CREATE TABLE NOTICIA_EQUIPO(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    descripcion VARCHAR2(4000) NOT NULL,
    id_equipo INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id)
);

INSERT INTO TIPO_USUARIO(nombre) VALUES('Administrador');
INSERT INTO TIPO_USUARIO(nombre) VALUES('Empleado');
INSERT INTO TIPO_USUARIO(nombre) VALUES('Cliente');

