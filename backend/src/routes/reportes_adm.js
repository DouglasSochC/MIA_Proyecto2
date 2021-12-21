const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const formatoFecha = 'DD/MM/YY';

//Usuarios Suscritos a X equipo
router.get('/getUsuarioEquipo', async (req, res) => {
    const { id_equipo } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo, USUARIO.telefono, \
    USUARIO.genero, TO_DATE(USUARIO.fecha_nac,'"+formatoFecha+"'), TO_DATE(USUARIO.fecha_registro,'"+formatoFecha+"'), \
    USUARIO.direccion \
    FROM EQUIPO_USUARIO\
    INNER JOIN USUARIO ON USUARIO.id = EQUIPO_USUARIO.id_usuario\
    INNER JOIN EQUIPO ON EQUIPO.id = EQUIPO_USUARIO.id_equipo\
    WHERE EQUIPO.id = :id_equipo AND USUARIO.membresia_activa = 1";
    
    let result = await BD.Open(sql, [id_equipo], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2],
            "correo": registro[3],
            "telefono": registro[4],
            "genero": registro[5],
            "fecha_nac": registro[6],
            "fecha_registro": registro[7],
            "direccion": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuario Con o Sin Membresía
router.get('/getUsuarioMembresia', async (req, res) => {
    const { membresia_activa } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo, USUARIO.telefono, \
    USUARIO.genero, TO_DATE(USUARIO.fecha_nac,'"+formatoFecha+"'), TO_DATE(USUARIO.fecha_registro,'"+formatoFecha+"'), \
    USUARIO.direccion \
    FROM USUARIO \
    WHERE USUARIO.membresia_activa = :membresia_activa AND USUARIO.id_tipo = 3";
    
    let result = await BD.Open(sql, [membresia_activa], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2],
            "correo": registro[3],
            "telefono": registro[4],
            "genero": registro[5],
            "fecha_nac": registro[6],
            "fecha_registro": registro[7],
            "direccion": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuarios que Mas membresías han adquirido
router.get('/getMasMembresia', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT COUNT(USUARIO.id) AS cantidad_membresia, USUARIO.nombres, USUARIO.apellidos\
    FROM HISTORIAL_MEMBRESIA\
    INNER JOIN USUARIO ON USUARIO.id = HISTORIAL_MEMBRESIA.id_usuario\
    INNER JOIN MEMBRESIA ON MEMBRESIA.id = HISTORIAL_MEMBRESIA.id_membresia\
    GROUP BY USUARIO.nombres, USUARIO.apellidos ORDER BY cantidad_membresia DESC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "cantidad_membresia": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuarios que más dinero han gastado
router.get('/getUsuarioDinero', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT (COUNT(USUARIO.id)*15) AS cantidad_membresia, USUARIO.nombres, USUARIO.apellidos\
    FROM HISTORIAL_MEMBRESIA\
    INNER JOIN USUARIO ON USUARIO.id = HISTORIAL_MEMBRESIA.id_usuario\
    INNER JOIN MEMBRESIA ON MEMBRESIA.id = HISTORIAL_MEMBRESIA.id_membresia\
    GROUP BY USUARIO.nombres, USUARIO.apellidos ORDER BY cantidad_membresia DESC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "cantidad_membresia": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuarios de X País
router.get('/getUsuarioPais', async (req, res) => {
    const { id_pais } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo, USUARIO.telefono, \
    USUARIO.genero, TO_DATE(USUARIO.fecha_nac,'"+formatoFecha+"'), TO_DATE(USUARIO.fecha_registro,'"+formatoFecha+"'), \
    USUARIO.direccion \
    FROM USUARIO\
    WHERE USUARIO.id_pais = :id_pais";
    
    let result = await BD.Open(sql, [id_pais], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2],
            "correo": registro[3],
            "telefono": registro[4],
            "genero": registro[5],
            "fecha_nac": registro[6],
            "fecha_registro": registro[7],
            "direccion": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuarios de X genero
router.get('/getUsuarioGenero', async (req, res) => {
    const { genero } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo, USUARIO.telefono, \
    USUARIO.genero, TO_DATE(USUARIO.fecha_nac,'"+formatoFecha+"'), TO_DATE(USUARIO.fecha_registro,'"+formatoFecha+"'), \
    USUARIO.direccion \
    FROM USUARIO\
    WHERE USUARIO.genero = :genero";
    
    let result = await BD.Open(sql, [genero], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2],
            "correo": registro[3],
            "telefono": registro[4],
            "genero": registro[5],
            "fecha_nac": registro[6],
            "fecha_registro": registro[7],
            "direccion": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Usuarios con al menos X años de edad
router.get('/getUsuarioEdad', async (req, res) => {
    const { edad } = req.body;
    sql = "SELECT * FROM (SELECT id, nombres, apellidos,\
    (EXTRACT(YEAR FROM SYSDATE)-EXTRACT(YEAR FROM fecha_nac)) AS EDAD, genero\
    FROM USUARIO) WHERE EDAD >= :edad";
    
    let result = await BD.Open(sql, [edad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "apellidos": registro[2],
            "edad": registro[3],
            "genero": registro[4]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Empleados que MAS/MENOS noticias han publicado
router.get('/getMENoticias', async (req, res) => {
    const { es_mas } = req.body;
    var tipo_orden = (es_mas == 1) ? "DESC":"ASC";
    sql = "SELECT COUNT(NOTICIA_EQUIPO.id) AS cantidad_noticias, USUARIO.id AS id_usuario, USUARIO.nombres, \
    USUARIO.apellidos, USUARIO.correo FROM NOTICIA_EQUIPO\
    INNER JOIN USUARIO ON USUARIO.Id = NOTICIA_EQUIPO.id_usuario\
    GROUP BY NOTICIA_EQUIPO.id_usuario, USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo \
    ORDER BY cantidad_noticias "+tipo_orden;
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "cantidad_noticias": registro[0],
            "id_usuario": registro[1],
            "nombres": registro[2],
            "apellidos": registro[3],
            "correo": registro[4]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Empleados que MAS/MENOS noticias han publicado de X Equipo
router.get('/getMENoticiasEquipo', async (req, res) => {
    const { es_mas, id_equipo } = req.body;
    var tipo_orden = (es_mas == 1) ? "DESC":"ASC";
    sql = "SELECT COUNT(NOTICIA_EQUIPO.id) AS cantidad_noticias, USUARIO.id AS id_usuario, USUARIO.nombres, \
    USUARIO.apellidos, USUARIO.correo FROM NOTICIA_EQUIPO\
    INNER JOIN USUARIO ON USUARIO.Id = NOTICIA_EQUIPO.id_usuario\
    WHERE NOTICIA_EQUIPO.id_equipo = :id_equipo\
    GROUP BY NOTICIA_EQUIPO.id_usuario, USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo \
    ORDER BY cantidad_noticias "+tipo_orden;
    
    let result = await BD.Open(sql, [id_equipo], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "cantidad_noticias": registro[0],
            "id_usuario": registro[1],
            "nombres": registro[2],
            "apellidos": registro[3],
            "correo": registro[4]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//Bitácoras de los administradores.
router.get('/getBicatoras', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT BITACORA.id AS id_bitacora, BITACORA.descripcion, BITACORA.operacion,\
    USUARIO.id AS id_usuario, USUARIO.nombres, USUARIO.correo FROM BITACORA\
    INNER JOIN USUARIO ON USUARIO.id = BITACORA.id_usuario";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id_bitacora": registro[0],
            "descripcion": registro[1],
            "operacion": registro[2],
            "id_usuario": registro[3],
            "nombres": registro[4],
            "correo": registro[5]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;