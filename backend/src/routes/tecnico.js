const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
nombre != ""
fecha_nacimiento != ""
id_pais != -1
id_estado_tecnico != -1
**********************************/

//READ
router.get('/getTecnicos', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT TECNICO.id, TECNICO.nombres, TO_CHAR(TECNICO.fecha_nac, 'DD/MM/YYYY'), TECNICO.link_fotografia,\
    TECNICO.id_nacionalidad, PAIS.nombre, TECNICO.id_estado, ESTADO_TECNICO.nombre\
    FROM TECNICO\
    INNER JOIN PAIS ON TECNICO.id_nacionalidad = PAIS.id\
    INNER JOIN ESTADO_TECNICO ON TECNICO.id_estado = ESTADO_TECNICO.id\
    ORDER BY TECNICO.id ASC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_tecnico": registro[0],
            "nombre_tecnico": registro[1],
            "fecha_nacimiento": registro[2],
            "link_fotografia": registro[3],
            "id_nacionalidad": registro[4],
            "nombre_pais": registro[5],
            "id_estado_tecnico": registro[6],
            "nombre_estado_tecnico": registro[7]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addTecnico', async (req, res) => {
    const { nombre, fecha_nacimiento, link_fotografia, id_pais, id_estado_tecnico } = req.body;
    if (!(nombre != "" && fecha_nacimiento != "" && id_pais != -1 && id_estado_tecnico != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM TECNICO WHERE TECNICO.nombres = :nombre AND TECNICO.id_nacionalidad = :id_pais";
        let r_existencia = await BD.Open(sql_existencia, [nombre, id_pais], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "El tecnico ya ha sido ingresado"
            });
        }else{
            sql = "INSERT INTO TECNICO(nombres, fecha_nac, link_fotografia, id_nacionalidad, id_estado)\
            VALUES (\
                :nombres,\
                TO_DATE(:fecha_nacimiento, 'dd/mm/yyyy'),\
                :link_fotografia,\
                :id_nacionalidad,\
                :id_estado_tecnico\
            )";
            await BD.Open(sql, [nombre, fecha_nacimiento, link_fotografia, id_pais, id_estado_tecnico], true);
            res.status(201).json({
                "response":true,
                "msg": "Tecnico ingresado correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updateTecnico", async (req, res) => {
    try {
        const { id_tecnico, nombre, fecha_nacimiento, link_fotografia, id_pais, id_estado_tecnico } = req.body;
        if (!(nombre != "" && fecha_nacimiento != "" && id_pais != -1 && id_estado_tecnico != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE TECNICO SET\
            nombres = :nombres,\
            fecha_nac = TO_DATE(:fecha_nacimiento, 'dd/mm/yyyy'),\
            link_fotografia = :link_fotografia,\
            id_nacionalidad = :id_nacionalidad,\
            id_estado = :id_estado_tecnico\
            WHERE id = :id_tecnico";
            await BD.Open(sql, [nombre, fecha_nacimiento, link_fotografia, id_pais, id_estado_tecnico, id_tecnico], true);
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
router.delete("/deleteTecnico/:id_tecnico", async (req, res) => {
    try {
        const { id_tecnico } = req.params;
        sql = "DELETE FROM TECNICO WHERE id = :id_tecnico";
        await BD.Open(sql, [id_tecnico], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El tecnico ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;