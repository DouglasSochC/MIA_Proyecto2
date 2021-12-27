const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
id_pais != -1
nombre != ""
fecha_fundacion != ""
**********************************/

//READ
router.get('/getEquipos', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT EQUIPO.id, EQUIPO.nombre, TO_CHAR(EQUIPO.fecha_fundacion, 'DD/MM/YYYY'), EQUIPO.link_fotografia,\
    PAIS.id AS id_pais, PAIS.nombre AS pais_nombre\
    FROM EQUIPO\
    INNER JOIN PAIS ON PAIS.id = EQUIPO.id_pais ORDER BY EQUIPO.id ASC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_equipo": registro[0],
            "nombre": registro[1],
            "fecha_fundacion": registro[2],
            "link_fotografia": registro[3],
            "id_pais": registro[4],
            "nombre_pais": registro[5]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addEquipo', async (req, res) => {
    const { nombre, fecha_fundacion, link_fotografia, id_pais } = req.body;
    if (!(id_pais != -1 && nombre != "" && fecha_fundacion != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM EQUIPO WHERE EQUIPO.nombre = :nombre AND EQUIPO.id_pais = :id_pais";
        let r_existencia = await BD.Open(sql_existencia, [nombre, id_pais], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "El equipo ya ha sido ingresado"
            });
        }else{
            sql = "INSERT INTO EQUIPO(nombre, fecha_fundacion, link_fotografia, id_pais)\
            VALUES (\
                :nombre,\
                TO_DATE(:fecha_fundacion, 'dd/mm/yyyy'),\
                :link_fotografia,\
                :id_pais\
            )";
            await BD.Open(sql, [nombre, fecha_fundacion, link_fotografia, id_pais], true);
            res.status(201).json({
                "response":true,
                "msg": "Equipo ingresado correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updateEquipo", async (req, res) => {
    try {
        const { id_equipo, nombre, fecha_fundacion, link_fotografia, id_pais } = req.body;
        if (!(id_pais != -1 && nombre != "" && fecha_fundacion != "")) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE EQUIPO SET nombre=:nombre, fecha_fundacion = TO_DATE(:fecha_fundacion, 'dd/mm/yyyy'),\
            link_fotografia=:link_fotografia, id_pais=:id_pais\
            WHERE id = :id_equipo";

            await BD.Open(sql, [nombre, fecha_fundacion, link_fotografia, id_pais, id_equipo], true);

            res.status(201).json({
                "response": true,
                "msg": "Actualizado Correctamente"
            });
        }
    } catch (error) {
        res.status(201).json({
            "response": false,
            "msg": "Ha ocurrido un error al actualizar"
        });
    }
});

//DELETE
router.delete("/deleteEquipo/:id_equipo", async (req, res) => {
    try {
        const { id_equipo } = req.params;
        sql = "DELETE FROM EQUIPO WHERE id = :id_equipo";
        await BD.Open(sql, [id_equipo], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El equipo ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El dato que desea eliminar esta siendo utilizado" 
        });
    }
});

//READ
router.get('/getSeguirEquipo/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    sql = "SELECT * FROM (\
        SELECT EQUIPO.ID, EQUIPO.NOMBRE AS NOMBRE_EQUIPO, EQUIPO.LINK_FOTOGRAFIA, PAIS.NOMBRE AS PAIS_NOMBRE, 0 AS SEGUIMIENTO FROM EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
        WHERE NOT EXISTS (SELECT EQUIPO_USUARIO.ID_EQUIPO FROM EQUIPO_USUARIO\
        WHERE EQUIPO.ID = EQUIPO_USUARIO.ID_EQUIPO\
        AND EQUIPO_USUARIO.ID_USUARIO = :id_usuario)\
        UNION\
        SELECT EQUIPO.ID, EQUIPO.NOMBRE AS NOMBRE_EQUIPO, EQUIPO.LINK_FOTOGRAFIA, PAIS.NOMBRE AS PAIS_NOMBRE, 1 AS SEGUIMIENTO FROM EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
        WHERE EXISTS (SELECT EQUIPO_USUARIO.ID_EQUIPO FROM EQUIPO_USUARIO\
        WHERE EQUIPO.ID = EQUIPO_USUARIO.ID_EQUIPO\
        AND EQUIPO_USUARIO.ID_USUARIO = :id_usuario)\
        ) ORDER BY NOMBRE_EQUIPO ASC";
    
    let result = await BD.Open(sql, [id_usuario], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_equipo": registro[0],
            "nombre_equipo": registro[1],
            "link_fotografia": registro[2],
            "nombre_pais": registro[3],
            "seguimiento": registro[4]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addSeguimientoEquipo', async (req, res) => {
    const { id_usuario, id_equipo } = req.body;
    if (!(id_usuario != -1 && id_equipo != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{        
        sql = "INSERT INTO EQUIPO_USUARIO(ID_USUARIO, ID_EQUIPO)\
        VALUES(\
            :id_usuario,\
            :id_equipo)";
        await BD.Open(sql, [id_usuario, id_equipo], true);
        res.status(201).json({
            "response":true,
            "msg": "Ahora sigues a este equipo"
        });        
    }
});

//DELETE
router.delete("/deleteSeguimientoEquipo/:id_usuario/:id_equipo", async (req, res) => {
    try {
        const { id_usuario, id_equipo } = req.params;
        sql = "DELETE FROM EQUIPO_USUARIO WHERE ID_USUARIO = :id_usuario AND ID_EQUIPO = :id_equipo";
        await BD.Open(sql, [id_usuario, id_equipo], true);
        res.status(201).json({ 
            "response": true,
            "msg": "Ha dejado de seguir al equipo" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El dato que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;