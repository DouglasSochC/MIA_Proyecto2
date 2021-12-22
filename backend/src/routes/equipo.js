const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

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
});

//UPDATE
router.put("/updateEquipo", async (req, res) => {
    try {
        const { id_equipo, nombre, fecha_fundacion, link_fotografia, id_pais } = req.body;
        sql = "UPDATE EQUIPO SET nombre=:nombre, fecha_fundacion = TO_DATE(:fecha_fundacion, 'dd/mm/yyyy'),\
        link_fotografia=:link_fotografia, id_pais=:id_pais\
        WHERE id = :id_equipo";

        await BD.Open(sql, [nombre, fecha_fundacion, link_fotografia, id_pais, id_equipo], true);

        res.status(201).json({
            "response": true,
            "msg": "Actualizado Correctamente"
        });
    } catch (error) {
        res.status(201).json({
            "response": true,
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

module.exports = router;