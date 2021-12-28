const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/***************************************************
CAMPOS OBLIGATORIOS
nombre != ""
fecha_nacimiento != ""
id_pais != -1
id_posicion != -1
----------------------------------------------------
OJO: EL ESTADO DEL JUGADOR PODRIA VENIR COMO NULL
***************************************************/

//READ
router.get('/getJugadores', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT JUGADOR.id, JUGADOR.nombres, TO_CHAR(JUGADOR.fecha_nac, 'DD/MM/YYYY'), JUGADOR.id_nacionalidad,\
    PAIS.nombre, JUGADOR.id_posicion, POSICION_JUGADOR.nombre, JUGADOR.id_estado_jugador, ESTADO_JUGADOR.nombre\
    FROM JUGADOR\
    INNER JOIN PAIS ON PAIS.id = JUGADOR.id_nacionalidad\
    INNER JOIN POSICION_JUGADOR ON POSICION_JUGADOR.id = JUGADOR.id_posicion\
    LEFT JOIN ESTADO_JUGADOR ON ESTADO_JUGADOR.id = JUGADOR.id_estado_jugador\
    ORDER BY JUGADOR.id ASC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_jugador": registro[0],
            "nombres": registro[1],
            "fecha_nacimiento": registro[2],
            "id_pais": registro[3],
            "nombre_pais": registro[4],
            "id_posicion": registro[5],
            "nombre_posicion": registro[6],
            "id_estado_jugador": registro[7],
            "nombre_estado_jugador": registro[8]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addJugador', async (req, res) => {
    const { nombres, fecha_nacimiento, id_pais, id_posicion, id_estado_jugador, id_equipo, fecha_inicial } = req.body;
    if (!(nombres != "" && fecha_nacimiento != "" && id_pais != -1 && id_posicion != -1 && id_estado_jugador != -1 && id_equipo != -1 && fecha_inicial != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM JUGADOR WHERE JUGADOR.nombres = :nombres AND JUGADOR.id_nacionalidad = :id_nacionalidad";
        let r_existencia = await BD.Open(sql_existencia, [nombres, id_pais], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "El jugador ya ha sido ingresado"
            });
        }else{
            sql = "INSERT INTO JUGADOR(nombres, fecha_nac, id_nacionalidad, id_posicion, id_estado_jugador)\
            VALUES (\
                :nombres,\
                TO_DATE(:fecha_nacimiento, 'dd/mm/yyyy'),\
                :id_nacionalidad,\
                :id_posicion,\
                :id_estado_jugador\
            )";
            let result = await BD.Open(sql, [nombres, fecha_nacimiento, id_pais, id_posicion, id_estado_jugador], true);
            if (result.rowsAffected) {
                sql_trayectoria = "INSERT INTO TRAYECTORIA_JUGADOR(id_jugador, id_equipo, fecha_inicial) VALUES(\
                    (SELECT id FROM JUGADOR WHERE nombres = :nombres AND id_nacionalidad = :id_pais AND id_posicion =:id_posicion AND id_estado_jugador = :id_estado_jugador),\
                    :id_equipo,\
                    TO_DATE(:fecha_inicial, 'dd/mm/yyyy')\
                    )"   
                    await BD.Open(sql_trayectoria, [nombres, id_pais, id_posicion, id_estado_jugador, id_equipo, fecha_inicial], true);
            }
            res.status(201).json({
                "response":true,
                "msg": "Jugador ingresado correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updateJugador", async (req, res) => {
    try {
        const { id_jugador, nombres, fecha_nacimiento, id_pais, id_posicion, id_estado_jugador } = req.body;
        if (!(nombres != "" && fecha_nacimiento != "" && id_pais != -1 && id_posicion != -1 && id_estado_jugador != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE JUGADOR SET\
            nombres = :nombres,\
            fecha_nac = TO_DATE(:fecha_nacimiento, 'dd/mm/yyyy'),\
            id_nacionalidad = :id_nacionalidad,\
            id_posicion = :id_posicion,\
            id_estado_jugador = :id_estado_jugador\
            WHERE id = :id_jugador";
            await BD.Open(sql, [nombres, fecha_nacimiento, id_pais, id_posicion, id_estado_jugador, id_jugador], true);
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
router.delete("/deleteJugador/:id_jugador", async (req, res) => {
    try {
        const { id_jugador } = req.params;
        sql = "DELETE FROM JUGADOR WHERE id = :id_jugador";
        await BD.Open(sql, [id_jugador], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El jugador ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;