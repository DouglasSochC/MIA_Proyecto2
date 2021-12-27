const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
nombre != ""
anio != -1
tipo_competencia != -1
id_pais != -1
**********************************/

//READ
router.get('/getCompetencias', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT COMPETENCIA.id, COMPETENCIA.nombre, COMPETENCIA.anio, COMPETENCIA.campeon,\
    TIPO_COMPETENCIA.id, TIPO_COMPETENCIA.nombre, PAIS.id, PAIS.nombre\
    FROM COMPETENCIA\
    INNER JOIN TIPO_COMPETENCIA ON COMPETENCIA.id_tipo_competencia = TIPO_COMPETENCIA.id\
    INNER JOIN PAIS ON COMPETENCIA.id_pais = PAIS.id\
    ORDER BY COMPETENCIA.id ASC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_competencia": registro[0],
            "nombre": registro[1],
            "anio": registro[2],
            "campeon": registro[3],
            "id_tipo_competencia": registro[4],
            "tipo_competencia_nombre": registro[5],
            "id_pais": registro[6],
            "pais_nombre": registro[7]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addCompetencia', async (req, res) => {
    const { nombre, anio, campeon, id_tipo_competencia, id_pais } = req.body;
    if (!(nombre != "" && anio != -1 && id_tipo_competencia != -1 && id_pais != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM COMPETENCIA WHERE COMPETENCIA.nombre = :nombre AND COMPETENCIA.anio = :anio";
        let r_existencia = await BD.Open(sql_existencia, [nombre, anio], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "La competencia ya ha sido ingresada"
            });
        }else{
            sql = "INSERT INTO COMPETENCIA(nombre, anio, campeon, id_tipo_competencia, id_pais)\
            VALUES (\
                :nombre,\
                :anio,\
                :campeon,\
                :id_tipo_competencia,\
                :id_pais\
            )";
            await BD.Open(sql, [nombre, anio, campeon, id_tipo_competencia, id_pais], true);
            res.status(201).json({
                "response":true,
                "msg": "Competencia ingresada correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updateCompetencia", async (req, res) => {
    try {
        const { id_competencia, nombre, anio, campeon, id_tipo_competencia, id_pais } = req.body;
        if (!(nombre != "" && anio != -1 && id_tipo_competencia != -1 && id_pais != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE COMPETENCIA SET\
            nombre = :nombre,\
            anio = :anio,\
            campeon = :campeon,\
            id_tipo_competencia = :id_tipo_competencia,\
            id_pais = :id_pais\
            WHERE id = :id_competencia";
            await BD.Open(sql, [nombre, anio, campeon, id_tipo_competencia, id_pais, id_competencia], true);
            res.status(201).json({
                "response": true,
                "msg": "Actualizado Correctamente"
            });
        }
    } catch (error) {
        res.status(201).json({
            "response": false,
            "msg": "Ha ocurrido un error al actualizar: "+error
        });
    }
});

//DELETE
router.delete("/deleteCompetencia/:id_competencia", async (req, res) => {
    try {
        const { id_competencia } = req.params;
        sql = "DELETE FROM COMPETENCIA WHERE id = :id_competencia";
        await BD.Open(sql, [id_competencia], true);
        res.status(201).json({ 
            "response": true,
            "msg": "La competencia ha sido eliminada correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;