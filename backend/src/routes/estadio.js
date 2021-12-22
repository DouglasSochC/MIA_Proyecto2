const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
nombre != ""
fecha_inaguracion != ""
capacidad != -1
direccion != ""
id_estado_estadio != -1
id_pais != -1
**********************************/

//READ
router.get('/getEstadios', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT ESTADIO.id, ESTADIO.nombre, ESTADIO.fecha_inaguracion, ESTADIO.capacidad,\
    ESTADIO.direccion, ESTADIO.link_fotografia,ESTADO_ESTADIO.id,ESTADO_ESTADIO.nombre,\
    PAIS.id, PAIS.nombre\
    FROM ESTADIO\
    LEFT JOIN ESTADO_ESTADIO ON ESTADIO.id_estado = ESTADO_ESTADIO.id\
    LEFT JOIN PAIS ON ESTADIO.id_pais = PAIS.id";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_estadio": registro[0],
            "estadio_nombre": registro[1],
            "fecha_inaguracion": registro[2],
            "capacidad": registro[3],
            "direccion": registro[4],
            "link_fotografia": registro[5],
            "id_estado_estadio": registro[6],
            "estado_nombre": registro[7],
            "id_pais": registro[8],
            "pais_nombre": registro[9]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addEstadio', async (req, res) => {
    const { nombre, fecha_inaguracion, capacidad, direccion, link_fotografia, id_estado_estadio, id_pais } = req.body;
    if (!(nombre != "" && fecha_inaguracion != "" && capacidad != -1 && direccion != "" && id_estado_estadio != -1 && id_pais != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM ESTADIO WHERE ESTADIO.nombre = :nombre AND ESTADIO.id_pais = :id_pais";
        let r_existencia = await BD.Open(sql_existencia, [nombre, id_pais], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "El estadio ya ha sido ingresado"
            });
        }else{
            sql = "INSERT INTO ESTADIO(nombre, fecha_inaguracion, capacidad, direccion, link_fotografia,\
                id_estado, id_pais)\
            VALUES (\
                :nombre,\
                TO_DATE(:fecha_inaguracion, 'dd/mm/yyyy'),\
                :capacidad,\
                :direccion,\
                :link_fotografia,\
                :id_estado_estadio,\
                :id_pais\
            )";
            await BD.Open(sql, [nombre, fecha_inaguracion, capacidad, direccion, link_fotografia, id_estado_estadio, id_pais], true);
            res.status(201).json({
                "response":true,
                "msg": "Equipo ingresado correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updateEstadio", async (req, res) => {
    try {
        const { id_estadio, nombre, fecha_inaguracion, capacidad, direccion, link_fotografia, id_estado_estadio, id_pais } = req.body;
        if (!(nombre != "" && fecha_inaguracion != "" && capacidad != -1 && direccion != "" && id_estado_estadio != -1 && id_pais != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE ESTADIO SET\
            nombre = :nombre,\
            fecha_inaguracion = TO_DATE(:fecha_inaguracion, 'dd/mm/yyyy'),\
            capacidad = :capacidad,\
            direccion = :direccion,\
            link_fotografia=:link_fotografia,\
            id_estado = :id_estado_estadio,\
            id_pais = :id_pais\
            WHERE id = :id_estadio";
            await BD.Open(sql, [nombre, fecha_inaguracion, capacidad, direccion, link_fotografia, id_estado_estadio, id_pais, id_estadio], true);
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
router.delete("/deleteEstadio/:id_estadio", async (req, res) => {
    try {
        const { id_estadio } = req.params;
        sql = "DELETE FROM ESTADIO WHERE id = :id_estadio";
        await BD.Open(sql, [id_estadio], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El estadio ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;