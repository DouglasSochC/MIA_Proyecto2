const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getNoticiaUsuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    sql = "SELECT NOTICIA_EQUIPO.ID, NOTICIA_EQUIPO.DESCRIPCION, EQUIPO.ID AS EQUIPO_ID,\
    EQUIPO.NOMBRE AS EQUIPO_NOMBRE, PAIS.NOMBRE AS PAIS_NOMBRE\
    FROM NOTICIA_EQUIPO\
    INNER JOIN EQUIPO ON EQUIPO.ID = NOTICIA_EQUIPO.ID_EQUIPO\
    INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
    WHERE NOTICIA_EQUIPO.ID_USUARIO = :id_usuario";
    
    let result = await BD.Open(sql, [id_usuario], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_noticia": registro[0],
            "descripcion_noticia": registro[1],
            "id_equipo": registro[2],
            "nombre_equipo": registro[3],
            "nombre_pais_equipo": registro[4]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addNoticia', async (req, res) => {
    const { descripcion, id_equipo, id_usuario } = req.body;
    if (!(descripcion != "" && id_equipo != -1 && id_usuario != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql = "INSERT INTO NOTICIA_EQUIPO(descripcion, id_equipo, id_usuario)\
        VALUES (\
            :descripcion,\
            :id_equipo,\
            :id_usuario\
        )";
        await BD.Open(sql, [descripcion, id_equipo, id_usuario], true);
        res.status(201).json({
            "response":true,
            "msg": "Noticia publicada correctamente"
        });        
    }
});

//READ
router.get('/getNoticiaCliente/:informacion/:id_usuario', async (req, res) => {
    const { informacion, id_usuario } = req.params;

    if (id_usuario != -1) {
        sql = "SELECT NOTICIA_EQUIPO.ID, NOTICIA_EQUIPO.DESCRIPCION, EQUIPO.ID, EQUIPO.NOMBRE,\
        EQUIPO.LINK_FOTOGRAFIA, PAIS.NOMBRE\
        FROM NOTICIA_EQUIPO\
        INNER JOIN EQUIPO ON EQUIPO.ID = NOTICIA_EQUIPO.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
        WHERE NOTICIA_EQUIPO.ID_EQUIPO IN (SELECT ID_EQUIPO FROM EQUIPO_USUARIO WHERE ID_USUARIO = "+id_usuario+")";
    }else if (informacion == "TODAS") {
        sql = "SELECT NOTICIA_EQUIPO.ID, NOTICIA_EQUIPO.DESCRIPCION, EQUIPO.ID, EQUIPO.NOMBRE,\
        EQUIPO.LINK_FOTOGRAFIA, PAIS.NOMBRE\
        FROM NOTICIA_EQUIPO\
        INNER JOIN EQUIPO ON EQUIPO.ID = NOTICIA_EQUIPO.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS";
    }else{
        sql = "SELECT NOTICIA_EQUIPO.ID, NOTICIA_EQUIPO.DESCRIPCION, EQUIPO.ID, EQUIPO.NOMBRE,\
        EQUIPO.LINK_FOTOGRAFIA, PAIS.NOMBRE\
        FROM NOTICIA_EQUIPO\
        INNER JOIN EQUIPO ON EQUIPO.ID = NOTICIA_EQUIPO.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
        WHERE UPPER(EQUIPO.NOMBRE) = UPPER('"+informacion+"') OR\
        UPPER(NOTICIA_EQUIPO.DESCRIPCION) LIKE UPPER('%"+informacion+"%')";        
    }
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_noticia": registro[0],
            "descripcion_noticia": registro[1],
            "id_equipo": registro[2],
            "nombre_equipo": registro[3],
            "link_fotografia": registro[4],
            "nombre_pais_equipo": registro[5]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;